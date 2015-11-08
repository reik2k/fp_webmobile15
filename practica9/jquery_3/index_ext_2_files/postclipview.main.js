TS.Modules.postclipview =
{
    moduleName: 'postclipview',

    config: {},
    autoInit: false,

    callback: null,
    flashVars: null,


    init: function () {
        this.bannerHeight = TS.Modules.initialize.getBannerViewHeight();
        this.videoWidth = TS.Modules.initialize.config.videoWidth;
        this.videoHeight = TS.Modules.initialize.config.videoHeight;
        this.playerType = TS.Modules.ConfigModel.playerType;
        this.isVisible = false;
        this.mainDiv = null;
        this.videoItem = null;
        this.selectedIndex = 0;
        this.playlist = null;
        this.elements = [];
        this.bordersWidth = 1;
        this.thumbMode = true;
        this.fontSize = 9;
        this.resources = {};
        this.isShareEnabled = true;
        this.resources.watchAgain = "Watch Again";
        this.resources.share = "Share";
        this.resources.close = "close";
        this.resources.shareClip = "Share clip on Facebook";
        this.postClipView = $("#postClipView");
        this.facebookLink = "";
        this.counterTimerId = 0;
        this.addListeners();
    },

    setStyles: function () {
        this.postClipView.attr('style', "position:absolute;");
        this.postClipView.css("top", 0);
        this.postClipView.width(this.videoWidth);
        this.postClipView.height(this.videoHeight);

        if (this.isVisible) {
            this.postClipView.css("visibility", "visible");
        }

        $("#thumbImage").width(this.videoWidth);
        $("#thumbImage").height(this.videoHeight);
    },

    addListeners: function () {
        E.bindEvent(E.EVENT_SET_VIDEOSRC, this.moduleName, this.onVideoSelected, this);
        E.bindEvent(E.EVENT_PLAYLIST_CHANGED, this.moduleName, this.onPlaylistChanged, this);
        E.bindEvent(E.EVENT_POSTROLL_END, this.moduleName, this.onPostrollEnd, this);
        E.bindEvent(E.EVENT_START_VIDEO, this.moduleName, this.onVideoStarted, this);
        E.bindEvent(E.EVENT_AD_REQUEST, this.moduleName, this.onVideoStarted, this);
        E.bindEvent(E.EVENT_LOCALE_FILE_LOADED, this.moduleName, this.onLocaleFileLoaded, this);
        E.bindEvent(E.EVENT_SHARE_VIEW_CLOSED, this.moduleName, this.onShareViewClosed, this);
        E.bindEvent(E.EVENT_SET_VIDEOSRC, this.moduleName, this.updateFacebookLink, this);
        E.bindEvent(E.EVENT_WINDOW_RESIZED, this.moduleName, this.onWindowResized, this);
    },

    onWindowResized: function () {
        if (!TS.Modules.FullscreenService.isFullscreenOn()) {
            this.resizeElements(TS.Modules.initialize.config.videoWidth, TS.Modules.initialize.config.videoHeight);
        }
    },

    resizeElements: function (width, height) {
        this.videoWidth = width;
        this.videoHeight = height;
        this.setStyles();
    },

    show: function () {
        if (!this.isVisible) {
            this.isVisible = true;
            this.postClipView.css("visibility", "visible");
            $(".postClipHoverDiv").attr("style", "");
            this.postClipView.fadeIn(1000);

            this.isShareEnabled = TS.Modules.CustomRulesModel.getRule("isFacebookEnabled", false);

            this.showCounter();

            if (this.isShareEnabled) {
                $("#facebookSign").css("opacity", "1");
                $("#facebookShareLabel").css("opacity", "1");
                $("#facebookSign").css("cursor", "pointer");
                $("#facebookShareLabel").css("cursor", "pointer");
                $("#facebookShareLabel").addClass("cursorPointer");
            }
            else {
                $("#facebookSign").css("opacity", "0");
                $("#facebookShareLabel").css("opacity", "0");
                $("#facebookSign").css("cursor", "default");
                $("#facebookShareLabel").css("cursor", "default");
                $("#facebookShareLabel").removeClass("cursorPointer");
            }
        }
    },

    showCounter: function () {
        if (TS.Modules.ConfigModel.isNextVideoPlay) {
            $("#counter").css("display", "block");
            $("#counterRight").css("color", TS.Modules.carouselview.colors.light);
            this.initCounterText(5);
            this.startCounterTimer();
        }
    },

    startCounterTimer: function () {
        var time = 5;

        this.initCounterText(time);

        this.counterTimerId = setInterval(function () {
            time--;
            TS.Modules.postclipview.initCounterText(time);
            if (time <= 0) {
                TS.Modules.postclipview.stopCounterTimer();
                TS.Modules.postclipview.startFirstVideoItem();
            }
        }, 1000);
    },

    stopCounterTimer: function () {
        if (this.counterTimerId) {
            clearInterval(this.counterTimerId);
            this.counterTimerId = 0;
        }
    },

    hideCounter: function () {
        if (TS.Modules.ConfigModel.isNextVideoPlay) {
            $("#counter").css("display", "none");
        }
    },

    getVideoItem: function (playlistIndex) {
        if (!this.playlist || this.playlist.length == 0) {
            return null;
        }

        if (playlistIndex >= TS.Modules.ChannellistModel.count) {
            playlistIndex = playlistIndex - TS.Modules.ChannellistModel.count;
        }

        if (this.playlist.length <= playlistIndex) {
            playlistIndex = 0;
        }

        var videoItem = this.playlist[playlistIndex];

        videoItem.index = playlistIndex;

        return videoItem;
    },

    onImageMouseOver: function () {
        var id = $(this).attr("id");

        id = id.replace("postclipThumb", "");
        id = id.replace("postclipTitle", "");
        id = id.replace("postclipPlay", "");

        $("#" + "postclipThumb" + id).css('border-color', this.borderColor);
        $("#" + "postclipTitle" + id).css('background-color', this.borderColor);
        $("#" + "postclipThumb" + id).css('cursor', 'pointer');
    },

    onImageMouseOut: function () {

        var id = $(this).attr("id");

        id = id.replace("postclipThumb", "");
        id = id.replace("postclipTitle", "");
        id = id.replace("postclipPlay", "");

        $("#" + "postclipThumb" + id).css('border-color', '#000000');
        $("#" + "postclipTitle" + id).css('background-color', '#000000');
        $("#" + "postclipThumb" + id).css('cursor', 'pointer');
    },

    onImageClick: function () {
        TS.Modules.postclipview.startVideoItem(this.videoItem);
    },

    startVideoItem: function (videoItem) {
        TS.Modules.postclipview.updateGlobalStylesFromVideoItem(videoItem);
        TS.Modules.postclipview.hide();

        TS.Modules.PlaylistModel.internalReferrer = (videoItem.itemIndex + 1) + ":" + videoItem.title;
        TS.Modules.OmnitureService.setCustomData(TS.Modules.videoView.getCustomData());
        TS.Modules.PlaylistModel.initFromVideoItem(videoItem);
        TS.Modules.PlaylistModel.lastClickedVideoId = TS.Modules.PlaylistModel.id;
        E.trigger(E.EVENT_SET_VIDEOSRC, this.postClipView.moduleName, videoItem);
        TS.Modules.initialize.postInfOnlineReport();
    },

    updateGlobalStylesFromVideoItem: function (videoItem) {
        var style = videoItem.style;

        if (style) {
            var dark = '#' + style.spot1.value;
            var middle = '#' + style.spot2.value;
            var light = '#' + style.spot3.value;

            var styles = new Object();

            styles.dark = dark;
            styles.middle = middle;
            styles.light = light;
            styles.bannerImage = style.banner.image;
            styles.bannerLink = style.banner.link;

            TS.Modules.ConfigModel.colors = {dark: dark, middle: middle, light: light};
            TS.Modules.ConfigModel.styles = styles;
        }
    },

    hide: function () {
        if (this.isVisible) {
            this.isVisible = false;
            this.postClipView.css('visibility', "hidden");
            $(".postClipHoverDiv").css("visibility", "hidden");
        }

        this.stopCounterTimer();
        this.hideCounter();
    },

    getTitle: function (imageIndex) {
        var title = "";

        if (this.thumbMode) {
            title = this.getVideoItem(this.selectedIndex + imageIndex + 1).title;
        }
        else {
            title = this.getVideoItem(this.selectedIndex + imageIndex).title;
        }

        return title;
    },

    addWatchAgainListeners: function () {
        this.addWatchAgainListener($("#facebookWatchAgainLabel"));
        this.addWatchAgainListener($("#refreshSign"));
    },

    addWatchAgainListener: function (watchAgain) {
        watchAgain[0].videoItem = this.getVideoItem(this.selectedIndex);
        watchAgain[0].postClipView = this;

        watchAgain.off("click", this.onImageClick);
        watchAgain.on("click", this.onImageClick);
    },

    initTexts: function () {
        $("#facebookWatchAgainLabel").text(this.resources.watchAgain);
        $("#facebookShareLabel").text(this.resources.share);
        $("#closeLabel").text(this.resources.close);
        $("#shareClipLabel").text(this.resources.shareClip);
        $("#counterLeft").text(this.resources.upNextIn);

        this.initCounterText(5);
    },

    initCounterText: function (count) {
        $("#counterRight").text(TS.Modules.localizationService.getLocaleText("PostClipSeconds", count));
    },

    onPostrollEnd: function (source, eventData) {
        this.show();
    },

    onVideoSelected: function (source, eventData) {
        this.hide();

        var b1 = ( TS.Modules.PlaylistModel.selectedIndex + 4 ) > TS.Modules.ChannellistModel.list.length;
        var b2 = ( TS.Modules.PlaylistModel.selectedIndex + 4 ) < TS.Modules.ChannellistModel.count;

        if (b1 && b2) {
            TS.Modules.mrssService.init(
                TS.Modules.ChannellistModel,
                3,
                TS.Modules.ChannellistModel.offsets.length,
                TS.Modules.carouselview.appendVideoHolder,
                true,
                true
            );
        }
        else {
            this.updateItems();
        }
    },

    onPlaylistChanged: function (source, eventData) {
        this.updateItems();
    },

    updateItems: function () {
        this.videoItem = TS.Modules.PlaylistModel.videoItem;
        this.selectedIndex = TS.Modules.PlaylistModel.selectedIndex;
        this.playlist = TS.Modules.ChannellistModel.list;

        this.addWatchAgainListeners();

        for (var i = 0; i < 4; i++) {
            var videoItem = this.getVideoItem(this.selectedIndex + i + 1);
            var thumb = videoItem.group.thumbnail ? videoItem.group.thumbnail.url : "";
            var title = videoItem.title;
            var duration = videoItem.group.content["0"].duration;

            $("#postclipThumb" + i).attr("src", thumb);
            $("#postclipTitle" + i).text(title);
            $("#postclipHoverTitle" + i + " label").text(title);
            $("#postClipTime" + i).text(TS.Modules.navigation.formatTime(duration));

            this.addImageClickListener($("#postclipThumb" + i), videoItem);
            this.addImageClickListener($("#postclipTitle" + i), videoItem);
            this.addImageClickListener($("#postclipPlay" + i), videoItem);
            this.addImageClickListener($("#postclipHoverTitle" + i), videoItem);
        }

        $("#thumbImage").attr("src", TS.Modules.PlaylistModel.thumb);
    },

    startFirstVideoItem: function () {
        this.startVideoItem(this.getVideoItem(this.selectedIndex + 1));
    },

    addImageClickListener: function (item, videoItem) {
        if (item[0]) {
            item[0].videoItem = videoItem;
            item[0].postClipView = this;

            item.off("click", this.onImageClick);
            item.on("click", this.onImageClick);
        }
    },

    onVideoStarted: function (source, eventData) {
        this.hide();
    },

    onShareViewClosed: function (source, eventData) {
        this.show();
    },

    onLocaleFileLoaded: function (source, eventData) {
        var service = eventData;

        this.resources.watchAgain = service.getLocaleText("WatchAgain");
        this.resources.share = service.getLocaleText("Share");
        this.resources.close = service.getLocaleText("close");
        this.resources.shareClip = service.getLocaleText("ShareClipOnFacebook");
        this.resources.upNextIn = service.getLocaleText("UpNextIn");
        this.resources.postClipSeconds = service.getLocaleText("PostClipSeconds");

        this.initTexts();
    },

    replaceSlashes: function (originalText) {
        var convertedText = originalText.replace(/\//g, "");

        convertedText = convertedText.replace(/\\/g, "");

        return convertedText;
    },

    updateShareLink: function (videoID, videoTitle) {
        videoTitle = this.replaceSlashes(videoTitle);

        this.facebookLink = TS.Modules.CustomRulesModel.getFacebookAppURL(videoID, videoTitle);
    },

    updateFacebookLink: function (source, data) {
        var video = TS.Modules.PlaylistModel;
        this.updateShareLink(video.id, video.title);
    }
}
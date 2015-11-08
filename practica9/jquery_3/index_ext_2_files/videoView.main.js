TS.Modules.videoView = {
    moduleName: 'videoView',
    config: {},
    autoInit: false,
    video: $("#videoControl"),
    player: $("#videoControl")[0],
    videoView: $("#videoView"),
    fadeTimer: null,
    videoItem: null,
    isSetVideoSrcEventCalled: false,
    isAdvertisement: false,
    _quantcastObject: null,
    lastOpenedVideoTitle: "",
    isFullscreenSupported : false,

    init: function () {
        this.video = $("#videoControl");
        this.player = $("#videoControl")[0];
        this.player.preload = 'none';
        this.setStyles();

        $("#videoView").on('mousemove', function () {
            TS.Modules.videoView.restartFadeTimer();
        });

        E.bindEvent(E.EVENT_SET_VIDEOSRC_PRECLIP, this.moduleName, this.onVideoSetSourcePre , this);
        E.bindEvent(E.EVENT_SET_VIDEOSRC        , this.moduleName, this.onVideoSetSource    , this);
        E.bindEvent(E.EVENT_AD_ENDED            , this.moduleName, this.onAdEnded);
        E.bindEvent(E.EVENT_START_VIDEO         , this.moduleName, this.onStartVideo        , this);
        E.bindEvent(E.EVENT_START_VIDEO         , this.moduleName, this.restartFadeTimer    , this);
        E.bindEvent(E.SHOW_VIDEO_OVERLAY        , this.moduleName, this.showVideoTitle      , this);
        E.bindEvent(E.HIDE_VIDEO_OVERLAY        , this.moduleName, this.hideVideoTitle      , this);
        E.bindEvent(E.EVENT_AD_REQUEST          , this.moduleName, this.onAdRequest);
        E.bindEvent(E.EVENT_FULLSCREEN_CHANGED  , this.moduleName, this.onFulscreenChanged  , this);
        E.bindEvent(E.EVENT_VIDEO_END           , this.moduleName, this.onVideoEnd          , this);
        E.bindEvent(E.EVENT_POSTROLL_END        , this.moduleName, this.onPostrollEnd       , this);
        E.bindEvent(E.EVENT_LOCALE_FILE_LOADED  , this.moduleName, this.onLocaleFileLoaded  , this);
        E.bindEvent(E.EVENT_WINDOW_RESIZED      , this.moduleName, this.onWindowResized     , this);
        E.bindEvent(E.EVENT_FULLSIZE_ON         , this.moduleName, this.onFullSizeOn);
        E.bindEvent(E.EVENT_FULLSIZE_OFF        , this.moduleName, this.onFullSizeOff);
        E.bindEvent(E.EVENT_GLOBALPAUSE			, this.moduleName, this.onGlobalPause);
        this.initArabicMode();
        this.updateVideoControls();
    },

    onGlobalPause:function()
    {
        TS.Modules.videoView.pause();
    },


    setVideoEndDuration: function ()
    {
        $("#videoControls .elapsed").text($("#videoControls .total").text());
    },

    updateVideoControls: function ()
    {
        var video   = document.getElementById("videoControl");
        /*var service = TS.Modules.FullscreenService;

         if (service.isFullscreenOn() && service.isVideoControlUsed() && !this.isAdvertisement)
         {
         video.setAttribute("controls", "true");
         }
         else
         {
         if (video.hasAttribute("controls"))
         {
         video.removeAttribute("controls");
         }
         }*/

        if(video && video.hasAttribute("controls"))
        {
            video.removeAttribute("controls");
        }
    },

    onVideoSetSource: function (source, videoItem) {
        this.isSetVideoSrcEventCalled = true;
        TS.Modules.videoView.show();
        TS.Modules.videoView.updateVideoControls();
        TS.Modules.videoView.endOmnitureSession();
    },

    onVideoSetSourcePre: function (source, videoItem) {
        if (videoItem && videoItem.group && videoItem.group.content) {
            var duration = Number(videoItem.group.content[0].duration);

            $('#videoControls .total').html(TS.Modules.navigation.formatTime(duration));
        }
    },

    onWindowResized: function (source, eventData) {
        this.setStyles();
    },

    onFullSizeOn: function () {
        $("#videoControls").height(TS.Modules.ConfigModel.getFullControlBarHeight());
        $("#videoControls .clip").height(TS.Modules.ConfigModel.getFullControlBarHeight());
    },

    onFullSizeOff: function () {
        $("#videoControls").height(TS.Modules.ConfigModel.getControlBarHeight());
        $("#videoControls .clip").height(TS.Modules.ConfigModel.getControlBarHeight());
    },

    setStyles: function ()
    {
        if(!TS.Modules.FullscreenService.isFullscreenOn())
        {
            this.video.height(TS.Modules.initialize.config.videoHeight);
            this.video.width(TS.Modules.initialize.config.videoWidth);
            this.videoView.height(TS.Modules.initialize.config.videoHeight);
            this.videoView.width(TS.Modules.initialize.config.videoWidth);
        }
    },

    onLocaleFileLoaded: function ()
    {
        var localeText = TS.Modules.localizationService.getLocaleText("adTitle");

        localeText = localeText.replace("{0}", "<span id='remTime'></span>");

        $('#adTitle').text("");
        $('#adTitle').append(localeText);
        this.setAdInfoSizes();
    },

    initArabicMode: function () {
        if (TS.Modules.countryChecker.isArabic()) {
            $('#adTitle').css("text-align", "right");
            $('#videoOverlayTitle').css("text-align", "right");
        }
    },


    adStarted: function () {
        TS.Modules.videoListener.removeListeners();
        $("#videoControl").show();

        TS.Modules.loadingAnim.hideLoader();
        TS.Modules.videoView.setAdInfoSizes();
        TS.Modules.videoView.updateVideoControls();
    },

    restartFadeTimer: function () {
        clearTimeout(TS.Modules.videoView.fadeTimer);
        if ($('#postClipView').css('visibility') == 'hidden' && $('#preClipView').is(':visible') == false) {
            E.trigger(E.SHOW_VIDEO_OVERLAY, TS.Modules.videoView.moduleName, {});
            TS.Modules.videoView.fadeTimer = setTimeout(function () {
                E.trigger(E.HIDE_VIDEO_OVERLAY, TS.Modules.videoView.moduleName, {});
            }, 3000);
        }
    },


    reset: function () {
        this.player.pause();
        this.player.currentTime = 0.1;
        // this.dom.removeClass('playing');
    },

    togglePlay: function () {
        if (!TS.Modules.videoView.isSetVideoSrcEventCalled) {
            E.trigger(E.EVENT_SET_VIDEOSRC, TS.Modules.videoView.moduleName);
            TS.Modules.initialize.postInfOnlineReport();
            return;
        }

        if (this.player.paused) {
            this.play();
        }
        else {
            this.pause();
        }
    },

    onStartVideo: function (source, videoItem) {
        this.setAdInfoSizes();
    },

    play: function () {
        this.setPlayStateForButtons();
        this.player.play();
        this.updateVideoControls();
    },

    pause: function () {
        this.setPauseStateForButtons();
        this.player.pause();
        this.updateVideoControls();
    },

    setPlayStateForButtons: function () {
        $('.play-button').addClass('playing');
        $('.play-button > .play').css('display', 'none');
        $('.play-button > .pause').css('display', 'block');
    },

    setPauseStateForButtons: function () {
        $('.play-button').removeClass('playing');
        $('.play-button > .play').css('display', 'block');
        $('.play-button > .pause').css('display', 'none');
    },

    trackPlay: function () {
        E.trigger(E.EVENT_OMNITURE_TRACK_PLAY, TS.Modules.videoView, TS.Modules.videoView.getOmnitureEventData());
        TS.Modules.OmnitureService.play(TS.Modules.videoView.getVideoTitle(), TS.Modules.videoView.player.currentTime);
        TS.Modules.PlaylistModel.internalReferrer = "";
        TS.Modules.PlaylistModel.internalReferrer = "";
    },

    trackPause: function () {
        E.trigger(E.EVENT_OMNITURE_TRACK_PAUSE, TS.Modules.videoView, TS.Modules.videoView.getOmnitureEventData());

        TS.Modules.OmnitureService.stop(TS.Modules.videoView.getVideoTitle(), TS.Modules.videoView.player.currentTime);
    },

    endOmnitureSession: function () {
        if (TS.Modules.videoView.lastOpenedVideoTitle != "") {
            var eventData = TS.Modules.videoView.getOmnitureEventData();

            E.trigger(E.EVENT_OMNITURE_END_SESSION, TS.Modules.videoView, eventData);

            TS.Modules.OmnitureService.stop(TS.Modules.videoView.getVideoTitle(), TS.Modules.videoView.player.currentTime);
            TS.Modules.OmnitureService.close(TS.Modules.videoView.lastOpenedVideoTitle);
            //s.Media.stop ( TS.Modules.videoView.lastOpenedVideoTitle, TS.Modules.videoView.player.currentTime );
            //s.Media.close( TS.Modules.videoView.lastOpenedVideoTitle );

            TS.Modules.videoView.lastOpenedVideoTitle = "";
        }
    },

    startOmnitureSession: function () {
        TS.Modules.videoView.lastOpenedVideoTitle = TS.Modules.videoView.getVideoTitle();

        var eventData = TS.Modules.videoView.getOmnitureEventData();

        E.trigger(E.EVENT_OMNITURE_START_SESSION, TS.Modules.videoView, eventData);

        TS.Modules.OmnitureService.setVideoType(TS.Modules.PlaylistModel.VIDEOTYPE_CONTENT);
        TS.Modules.OmnitureService.setCustomData(this.getCustomData());

        //s.ePlayer.setVideoType(TS.Modules.PlaylistModel.VIDEOTYPE_CONTENT);
        //s.ePlayer.setCustomData(this.getCustomData());

        TS.Modules.OmnitureService.open(eventData.videoTitle, eventData.duration, eventData.partner);

        //s.Media.open( eventData.videoTitle, eventData.duration, eventData.partner);
    },

    getCustomData: function () {
        var data = {};
        data.nextVideoItem = TS.Modules.PlaylistModel.nextVideoItem;
        data.nextVideoItem2 = TS.Modules.PlaylistModel.nextVideoItem2;
        data.nextVideoItem3 = TS.Modules.PlaylistModel.nextVideoItem3;
        data.internalReferrer = TS.Modules.PlaylistModel.internalReferrer;
        data.channel = TS.Modules.PlaylistModel.videoItem.fullChannelName
        data.genre = TS.Modules.PlaylistModel.videoItem.genre;
        data.contentIndex = TS.Modules.PlaylistModel.videoItem.index;
        data.contentKeywords = TS.Modules.PlaylistModel.videoItem.keywords;
        data.contentType = TS.Modules.PlaylistModel.videoItem.contentType;
        data.contentDuration = TS.Modules.PlaylistModel.duration;
        data.videoDuration = TS.Modules.PlaylistModel.duration;
        data.windowLocation = document.location.href;
        data.videoIsStartedByClick = TS.Modules.PlaylistModel.lastClickedVideoId == TS.Modules.PlaylistModel.id;
        data.channelId = TS.Modules.PlaylistModel.videoItem.channelId;
        data.videoId = TS.Modules.PlaylistModel.id;
        data.playerId = TS.Modules.ConfigModel.playerId;
        data.rights = TS.Modules.PlaylistModel.rights;

        return data;
    },

    onAdEnded: function () {
        TS.Modules.videoView.isAdvertisement = false;
        TS.Modules.videoListener.addListeners();
        TS.Modules.videoView.setVideoSrc();
        TS.Modules.videoView.updateNavigationTime();
        TS.Modules.videoView.setVideoSize();

        E.trigger(E.SET_VIDEO_TITLE, TS.Modules.videoView.moduleName, TS.Modules.PlaylistModel.title);

        TS.Modules.videoView.fadeTimer = setTimeout(function () {
            E.trigger(E.HIDE_VIDEO_OVERLAY, TS.Modules.videoView.moduleName, {});
        }, 3000);

        TS.Modules.videoView.setQuantcastObject();
        TS.Modules.videoView.updateVideoControls();
    },


    onAdRequest : function ()
    {
        TS.Modules.videoView.isAdvertisement = true;
        $('#videoOverlayTitle').hide();
        TS.Modules.loadingAnim.showLoader();
        TS.Modules.videoView.updateVideoControls();
    },

    onFulscreenChanged : function ()
    {
        this.updateVideoControls();
    },

    onVideoEnd : function()
    {
        this.isAdvertisement = false;
    },

    onPostrollEnd : function()
    {
        this.isSetVideoSrcEventCalled = false;
        TS.Modules.loadingAnim.hideLoader();
        this.setVideoEndDuration();
        this.setPauseStateForButtons();
    },

    setQuantcastObject: function () {
        try
        {
            if (!this._quantcastObject) {
                this._quantcastObject = {videoElementId: "videoControl",
                    videoId: TS.Modules.PlaylistModel.title,
                    videoTitle: TS.Modules.PlaylistModel.title,
                    qacct: "p-d9dGETNS2WNv2"

                };

                _qvideos.push(this._quantcastObject);
            }
            else {
                this._quantcastObject.videoId = TS.Modules.PlaylistModel.title;
                this._quantcastObject.videoTitle = TS.Modules.PlaylistModel.title;
            }
        }
        catch(error)
        {
            //nothing to do
        }
    },

    setVideoSrc: function () {
        var model   = TS.Modules.PlaylistModel;
        var url     = model.url;
        var hlsUrl  = model.hlsUrl;
        var src     = TS.Modules.videoView.video.attr("src");

        if (url != "")
        {
            TS.Modules.videoView.videoItem = model;

            if (hlsUrl != "" && TS.Modules.videoListener.isHLSSupported())
            {
                TS.Modules.videoView.video.attr("src", hlsUrl);
            }
            else {
                TS.Modules.videoView.video.attr("src", url);
            }

            TS.Modules.videoView.video.load();
            TS.Modules.videoView.play();
        }
    },

    updateNavigationTime: function () {
        TS.Modules.navigation.updateTime({
            'currentTime': 0,
            'duration': TS.Modules.PlaylistModel.duration
        });
    },

    setVideoSize: function () {
        TS.Modules.videoView.video.height(TS.Modules.initialize.config.videoHeight);
        TS.Modules.videoView.video.width(TS.Modules.initialize.config.videoWidth);
    },

    seeking: function (offsetX, _width, event)
    {
        var x           = offsetX;
        var width       = _width;
        var seekTime    = Math.round(TS.Modules.PlaylistModel.duration * (x / width));

        E.trigger(E.EVENT_VIDEO_SEEK, TS.Modules.videoView.moduleName,
            {
                seekTime   : seekTime,
                duration   : this.player.duration,
                x          : offsetX,
                width      : _width
            });

        this.player.currentTime = seekTime;

        if (this.player.paused) {
            this.play();
        }
    },

    showVideoTitle: function () {
        if (!TS.Modules.videoView.isAdvertisement) {
            $("#videoOverlayTitle").show();
        }
        else {
            $("#videoOverlayTitle").hide();
        }
    },

    hideVideoTitle: function () {
        $("#videoOverlayTitle").hide();
    }
};

TS.Modules.videoView.getVideoTitle = function () {
    return TS.Modules.videoView.videoItem ? TS.Modules.videoView.videoItem.title : "no title";
};

TS.Modules.videoView.getOmnitureEventData = function () {
    var eventData = {};

    eventData.videoTitle = TS.Modules.videoView.getVideoTitle();
    eventData.currentTime = TS.Modules.videoView.player ? TS.Modules.videoView.player.currentTime : 0;
    eventData.duration = TS.Modules.PlaylistModel.duration;
    eventData.partner = "ePlayerHTML5 " + TS.Modules.ConfigModel.partner;
    eventData.lastOpenedVideoTitle = TS.Modules.videoView.lastOpenedVideoTitle;

    if (!eventData.currentTime || eventData.currentTime.toString() == "NaN") {
        eventData.currentTime = "NaN";
    }

    if (!eventData.duration || eventData.duration.toString() == "NaN") {
        eventData.duration = "NaN";
    }

    return eventData;
};

TS.Modules.videoView.setAdInfoSizes = function () {
    var playButtonWidth     = this.getOuterWidth(".play-button");
    var fullscreenWidth     = this.isFullscreenSupported ? this.getOuterWidth("#fullscreen") : 0;
    var fullSizeWidth       = this.getOuterWidth("#fullSize");
    var directPlayWidth     = this.getOuterWidth("#directPlay");
    var copyWidth           = this.getOuterWidth("#copyLink");
    var browserWidth        = TS.Modules.FullscreenService.isFullscreenOn()? 0 : this.getOuterWidth("#browser");
    var adTitleHeight       = this.getOuterHeight("#adTitle");
    var controlBarHeight    = this.getOuterHeight("#videoControls");
    var progressHeight      = this.getOuterHeight(".progress");
    var rightButtonWidth    = fullscreenWidth + copyWidth + browserWidth;
    var top                 = Math.round((controlBarHeight - adTitleHeight - progressHeight) / 2) + progressHeight;

    if(TS.Modules.ConfigModel.isDirectPlayAvailable)
    {
        $("#directPlay").css("display", "block");
    }
    else
    {
        $("#directPlay").css("display", "none");

    }


    if (TS.Modules.ConfigModel.isFullSizeAvailable) {
        rightButtonWidth += fullSizeWidth;
    }

    if (TS.Modules.ConfigModel.isDirectPlayAvailable) {
        rightButtonWidth += directPlayWidth;
    }

    $("#adTitle").css("left", playButtonWidth + "px");
    $("#adTitle").css("right", rightButtonWidth + "px");
    $("#adTitle").css("top", top + "px");
};

TS.Modules.videoView.getOuterWidth = function (selector) {
    var width = parseInt($(selector).outerWidth(true, true));

    if (!width) {
        width = 0;
    }

    return width;
};

TS.Modules.videoView.getOuterHeight = function (selector) {
    var height = parseInt($(selector).outerHeight(true, true));

    if (!height) {
        height = 0;
    }

    return height;
};

TS.Modules.videoView.show = function () {
    $('#videoControls').show();
    this.setAdInfoSizes();
}



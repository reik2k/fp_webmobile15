TS.Modules.preclipview = {
    moduleName: 'preclipview',

    config: {},
    autoInit: false,

    callback: null,
    flashVars: null,

    init: function () {
        this.bannerHeight = TS.Modules.initialize.getBannerViewHeight();
        this.videoWidth = TS.Modules.initialize.config.videoWidth;
        this.videoHeight = TS.Modules.initialize.config.videoHeight;
        this.thumbImage = null;
        this.playImage = null;
        this.disabled = false;
        this.videoLoadCount = 0;
        this.videoItem = null;

        E.bindEvent(E.EVENT_AD_REQUEST, this.moduleName, this.onHide, this);
        E.bindEvent(E.EVENT_SET_VIDEOSRC, this.moduleName, this.onHide, this);
        E.bindEvent(E.EVENT_SET_VIDEOSRC_PRECLIP, this.moduleName, this.onVideoLoaded, this);
        E.bindEvent(E.EVENT_WINDOW_RESIZED, this.moduleName, this.onWindowResized, this);

        this.initStyles();
    },

    initStyles: function () {
        $("#preClipView").width(this.videoWidth);
        $("#preClipView").height(this.videoHeight);
    },

    onWindowResized: function (source, eventData)
    {
        if(!TS.Modules.FullscreenService.isFullscreenOn())
        {
            this.videoWidth = TS.Modules.initialize.config.videoWidth;
            this.videoHeight = TS.Modules.initialize.config.videoHeight;

            this.initStyles();
            this.arrangePlayImage();
        }
    },

    createThumbImage: function () {
        var model = TS.Modules.PlaylistModel;

        var imgText = "<img id='preClipThumbImage' width='" + this.videoWidth + "px' src='" + model.thumb + "'/>";
        this.thumbImage = $(imgText);

        $("#preClipView").append(this.thumbImage);
    },

    addListenersToImage: function (img) {
        img[0].preClipView = this;

        img.on("click", this.onImageClick);
        img.on("touchstart", this.onImageClick);
        img.css("cursor", "pointer");
    },

    onImageClick: function ()
    {
        TS.Modules.videoView.show();
        TS.Modules.PlaylistModel.lastClickedVideoId = TS.Modules.PlaylistModel.id;
        E.trigger(E.EVENT_SET_VIDEOSRC, TS.Modules.preclipview.moduleName);
        TS.Modules.initialize.postInfOnlineReport();
    },

    createPlayImage: function () {
        var info = this.getPlayButtonImageInfo();
        var imgText = "<img/>";

        this.playImage = $(imgText);

        this.arrangePlayImage();

        this.playImage[0].id = "preclipPlay";
        this.playImage[0].src = info.path;

        $("#preClipView").append(this.playImage);

        $('#preClipView').on('click', TS.Modules.preclipview.onImageClick);
        $('#preClipView').on('touchend', TS.Modules.preclipview.onImageClick);
    },

    arrangePlayImage: function ()
    {
        $("#preClipThumbImage").width($("#preClipView").width());

        var info = this.getPlayButtonImageInfo();

        var left = ($("#preClipView").width() - info.size) / 2;
        var top = ($("#preClipView").height() - info.size) / 2;

        if(this.playImage)
        {
            this.playImage.css('position', 'absolute');
            this.playImage.css('left', left);
            this.playImage.css('top', top);
            this.playImage.css('cursor', "pointer");
        }
    },

    getPlayButtonImageInfo: function () {
        var path = TS.Config.Path.Assets + "playbutton_large.png";
        var size = 50;
        var info = new Object();

        info.path = path;
        info.size = size;

        return info;
    },

    onVideoLoaded: function (source, videoItem) {
        $('#videoControl').hide();
        TS.Modules.PlaylistModel.initFromVideoItem(videoItem);
        // this.videoItem = videoItem;
        this.videoLoadCount++;
        $('#videoOverlayTitle').text(TS.Modules.PlaylistModel.title);
        $('#videoOverlayTitle').css('z-index', 110);


        this.createThumbImage();
        this.createPlayImage();
    },

    onHide: function (source, eventData) {
        if (!this.disabled) {
            $("#preClipView").hide();
            this.disabled = true;
        }
    }
}
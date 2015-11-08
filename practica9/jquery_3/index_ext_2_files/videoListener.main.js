TS.Modules.videoListener = {
    moduleName: 'videoListener',
    video: $("#videoControl"),
    player: $("#videoControl")[0],
    videoView: $("#videoView"),
    isAdvertisement: false,
    playTimeout: null,
    PLAY_TIME_OUT: 10000,
    hlsErrorCount: 0,
    MEDIA_ERR_SRC_NOT_SUPPORTED : 4,

    init: function () {
        if (Modernizr.video) {
            Modernizr.videoWebm = Modernizr.video.webm ? Modernizr.video.webm : "can not play";
            Modernizr.videoOgg = Modernizr.video.ogg ? Modernizr.video.ogg : "can not play";
            Modernizr.videoH264 = Modernizr.video.h264 ? Modernizr.video.h264 : "can not play";
        }

        E.bindEvent(E.EVENT_VIDEO_END, TS.Modules.videoListener.moduleName, this.onVideoEnd, this);
        E.bindEvent(E.EVENT_SET_VIDEOSRC, TS.Modules.videoListener.moduleName, this.onVideoSourceSet);
        E.trigger(E.EVENT_BROWSER_INFO, TS.Modules.videoListener.moduleName, Modernizr);

        /*this.player.originalPlay = this.player.play;
        this.player.originalPause = this.player.pause;
        this.player.originalLoad = this.player.load;
        this.player.play = this.play;
        this.player.pause = this.pause;
        this.player.load = this.load;*/
    },

    /*play: function () {
        TS.Modules.videoListener.player.originalPlay();
    },

    pause: function () {
        TS.Modules.videoListener.player.originalPause();
    },

    load: function () {
        TS.Modules.videoListener.player.originalLoad();
    }, */

    addListeners: function () {
        this.removeListeners();

        this.video.on('loadstart', this.onVideoLoadStarted);
        this.video.on('error', this.onVideoError);
        this.video.on('canplay', this.onVideoCanPlay);
        this.video.on('play', this.onVideoPlay);
        this.video.on('pause', this.onVideoPause);
        this.video.on('stalled', this.onVideoStalled);
        this.video.on('ended', this.onVideoEnded);
        this.video.on('loadstart abort suspend emptied loadedmetadata loadeddata canplaythrough playing waiting durationchange ratechange', this.onVideoEvent);
    },

    onVideoStalled: function (event) {
        E.trigger(event.type, TS.Modules.videoListener.moduleName, TS.Modules.videoListener.getVideoEventData());
    },

    onVideoEvent: function (event) {
        E.trigger(event.type, TS.Modules.videoListener.moduleName, TS.Modules.videoListener.getVideoEventData());
    },

    removeListeners: function () {
        this.video.off('loadstart', this.onVideoLoadStarted);
        this.video.off('error', this.onVideoError);
        this.video.off('canplay', this.onVideoCanPlay);
        this.video.off('play', this.onVideoPlay);
        this.video.off('pause', this.onVideoPause);
        this.video.off('timeupdate progress', this.onVideoTimeUpdate);
        this.video.off('stalled', this.onVideoStalled);
        this.video.off('ended', this.onVideoEnded);
        this.video.off('loadstart abort suspend emptied loadedmetadata loadeddata canplaythrough playing waiting durationchange ratechange', this.onVideoEvent);
    },

    onVideoSourceSet: function () {
        TS.Modules.videoListener.clearPlayTimeout();
        $("#videoError").hide();
    },

    onVideoLoadStarted: function () {
        TS.Modules.loadingAnim.showLoader();
        E.trigger(E.EVENT_VIDEO_LOAD_START, TS.Modules.videoListener.moduleName, TS.Modules.videoListener.getVideoEventData());
        TS.Modules.videoListener.startPlayTimeout();
        TS.Modules.videoListener.updateNavigationTime();
    },

    getVideoEventData: function (event) {
        var ret = {};

        ret.autoplay = this.player.autoplay;
        ret.currentSrc = this.player.currentSrc;
        ret.currentTime = this.player.currentTime
        ret.duration = this.player.duration ? this.player.duration : "not set!!!";
        ret.ended = this.player.ended;
        ret.error = this.player.error;
        ret.hidden = this.player.hidden;
        ret.muted = this.player.muted;
        ret.networkState = this.player.networkState;
        ret.paused = this.player.paused;
        ret.seeking = this.player.seeking;
        ret.videoWidth = this.player.videoWidth;
        ret.videoHeight = this.player.videoHeight;
        ret.volume = this.player.volume;
        ret.readyState = this.player.readyState;
        ret.src = this.player.src;

        if (event != undefined && event.error && event.error.code) {
            ret.errorCode = this.getErrorCodeMessage(event.error.code);
        }

        if (ret.error && ret.error.code) {
            ret.errorCode = this.getErrorCodeMessage(ret.error.code);
        }

        return ret;
    },

    getErrorCodeMessage: function (code) {
        var ret = code;

        switch (ret) {
            case 1 :
                ret += " MEDIA_ERR_ABORTED The fetching process for the media resource was aborted by the user agent at the user's request.";
                break;
            case 2 :
                ret += " MEDIA_ERR_NETWORK A network error of some description caused the user agent to stop fetching the media resource, after the resource was established to be usable.";
                break;
            case 3 :
                ret += " MEDIA_ERR_DECODE An error of some description occurred while decoding the media resource, after the resource was established to be usable.";
                break;
            case 4 :
                ret += " MEDIA_ERR_SRC_NOT_SUPPORTED The media resource indicated by the src attribute was not suitable.";
                break;
        }

        return ret;
    },

    startPlayTimeout: function () {
        TS.Modules.videoListener.clearPlayTimeout();
        TS.Modules.videoListener.playTimeout = setTimeout(TS.Modules.videoListener.onPlayTimeoutEnd, TS.Modules.videoListener.PLAY_TIME_OUT);
        E.trigger(E.EVENT_VIDEO_TIMEOUT_START, TS.Modules.videoListener.moduleName);
    },

    onPlayTimeoutEnd: function () {
        E.trigger(E.EVENT_VIDEO_TIMEOUT_END, TS.Modules.videoListener.moduleName, TS.Modules.videoListener.getVideoEventData());
        TS.Modules.videoListener.onVideoError();
    },

    clearPlayTimeout: function () {
        if (TS.Modules.videoListener.playTimeout !== null) {
            clearTimeout(TS.Modules.videoListener.playTimeout);
            TS.Modules.videoListener.playTimeout = null;
            E.trigger(E.EVENT_VIDEO_TIMEOUT_CLEARED, TS.Modules.videoListener.moduleName);
        }
    },

    onVideoError: function (event) {
        TS.Modules.videoListener.clearPlayTimeout();
        E.trigger(E.EVENT_VIDEO_ERROR, TS.Modules.videoListener.moduleName, TS.Modules.videoListener.getVideoEventData(event));

        var model           = TS.Modules.PlaylistModel;
        var url             = model.url;
        var hlsUrl          = model.hlsUrl;
        var videoElement    = TS.Modules.videoListener.video[0];

        if (hlsUrl == TS.Modules.videoListener.video.attr("src"))
        {
            if(videoElement.error && videoElement.error.code == TS.Modules.videoListener.MEDIA_ERR_SRC_NOT_SUPPORTED)
            {
                TS.Modules.videoListener.hlsErrorCount++;
            }

            TS.Modules.videoListener.video.attr("src", url);
            TS.Modules.videoListener.video[0].load();
            TS.Modules.videoListener.video[0].play();
        }
        else
        {
            var player = $("#videoControl")[0];
            TS.Modules.videoView.pause();
            player.src='';
            player.removeAttribute("src");
            TS.Modules.loadingAnim.hideLoader();
            $("#videoError").show();
            $("#videoErrorLabel").text("Content can not be played by the browser!");
        }
    },

    onVideoCanPlay: function () {
        E.trigger(E.EVENT_VIDEO_CAN_PLAY, TS.Modules.videoListener.moduleName, TS.Modules.videoListener.getVideoEventData());
        TS.Modules.videoListener.addTimeupdateListener();
        $("#videoControl").css('display', 'block');
        if (TS.Modules.PlaylistModel.title != TS.Modules.videoView.lastOpenedVideoTitle) {
            TS.Modules.videoView.startOmnitureSession();
            TS.Modules.videoView.trackPlay();
        }
    },

    onVideoPlay: function () {

        var src = $("#videoControl").attr("src");

        if(src === undefined)
        {
            E.trigger(E.EVENT_SET_VIDEOSRC, TS.Modules.videoView.moduleName, TS.Modules.PlaylistModel.videoItem);

            return;
        }

        E.trigger(E.EVENT_VIDEO_PLAY, TS.Modules.videoListener.moduleName, TS.Modules.videoListener.getVideoEventData());

        TS.Modules.loadingAnim.hideLoader();
        TS.Modules.videoListener.addTimeupdateListener();
        TS.Modules.videoView.setPlayStateForButtons();
        if (TS.Modules.PlaylistModel.title && TS.Modules.PlaylistModel.title == TS.Modules.videoView.lastOpenedVideoTitle)
        {
            TS.Modules.videoView.trackPlay();
        }
    },

    addTimeupdateListener: function () {
        TS.Modules.videoListener.video.off('timeupdate progress');
        TS.Modules.videoListener.video.on('timeupdate progress', TS.Modules.videoListener.onVideoTimeUpdate);
    },

    onVideoEnd: function () {
        TS.Modules.videoView.endOmnitureSession();
    },

    onVideoPause: function () {
        TS.Modules.videoView.setPauseStateForButtons();
        TS.Modules.videoView.trackPause();
    },

    onVideoTimeUpdate: function ()
    {
        TS.Modules.videoListener.clearPlayTimeout();
        TS.Modules.videoListener.updateNavigationTime();
        TS.Modules.videoListener.checkVideoEnd();
    },

    updateNavigationTime : function()
    {
        if(this.player.readyState == 4)
        {
            TS.Modules.loadingAnim.hideLoader();

            var currentTime = this.player.currentTime ? this.player.currentTime : 0;
            var duration    = TS.Modules.PlaylistModel.duration;

            TS.Modules.navigation.updateTime({'currentTime': currentTime,'duration': duration});
        }

        TS.Modules.videoView.updateVideoControls();
    },

    checkVideoEnd : function()
    {
        var currentTime = this.player.currentTime ? this.player.currentTime : 0;
        var duration    = this.player.duration ? this.player.duration : TS.Modules.PlaylistModel.duration;

        if (duration && duration > 5 && Math.abs(duration - currentTime) <= 1)
        {
            E.trigger(E.EVENT_VIDEO_END, TS.Modules.videoListener.moduleName, TS.Modules.videoListener.getVideoEventData());
        }
    },

    onVideoEnded : function()
    {
        E.trigger(E.EVENT_VIDEO_END, TS.Modules.videoListener.moduleName, TS.Modules.videoListener.getVideoEventData());
    },

    isHLSSupported : function()
    {
        return this.hlsErrorCount == 0;
    }

}



function LiverailAdManager()
{
    var LiveRailVPAID,
        vpaidFrame,
        vpaidLoader;
    var STOP_TIME_BEFORE_AD_END = 1;

    vpaidFrame = document.createElement('iframe');
    vpaidFrame.style.display = 'none';
    vpaidFrame.id = 'liverailFrame';
    vpaidFrame.onload = function () {
        vpaidLoader = vpaidFrame.contentWindow.document.createElement('script');
        vpaidLoader.src = "http://cdn-static.liverail.com/js/LiveRail.AdManager-1.0.js";
        vpaidLoader.onload = function () {


            LiveRailVPAID = vpaidFrame.contentWindow.getVPAIDAd();
            LiveRailVPAID.handshakeVersion('2.0');

            LiveRailVPAID.subscribe(function () {
                try{
                    LiveRailVPAID.setAdVolume(TS.Modules.ConfigModel.volume);
                    LiveRailVPAID.startAd();
                }catch (error){
                    TS.Modules.LiveRailVPAIDManager.onAdVideoComplete();
                }
            }, 'AdLoaded');

            LiveRailVPAID.subscribe(function () {
            }, 'AdStopped');

            LiveRailVPAID.subscribe(function () {
            }, 'AdSizeChange');

            LiveRailVPAID.subscribe(function () {
            }, 'AdSkipped');

            LiveRailVPAID.subscribe(function () {
                var player = $("#videoControl")[0];

                TS.Modules.LiveRailVPAIDManager.duration = player.duration;
                TS.Modules.videoView.adStarted();

                if(TS.Modules.LiveRailVPAIDManager.omnitureSessionStarted)
                {
                    TS.Modules.LiveRailVPAIDManager.omnitureSessionStarted = false;

                    var eventData = {};

                    eventData.adUrl     = $("#videoControl").attr("src");
                    eventData.duration  = player.duration;
                    eventData.partner   = "ePlayerHTML5 " + TS.Modules.ConfigModel.partner;
                    eventData.type      = TS.Modules.VastModel.postRoll ? "postroll" : "preroll";

                    if(!eventData.duration || eventData.duration.toString() == "NaN")
                    {
                        eventData.duration = "NaN";
                    }

                    E.trigger(E.EVENT_AD_STARTED, TS.Modules.LiveRailVPAIDManager.moduleName, eventData);
                    TS.Modules.LiveRailVPAIDManager.startOmnitureSession();
                    TS.Modules.LiveRailVPAIDManager.trackPlay();
                }
            }, 'AdDurationChange');


            LiveRailVPAID.subscribe(function () {
                TS.Modules.LiveRailVPAIDManager.omnitureSessionStarted = true;
           }, 'AdStarted');

            LiveRailVPAID.subscribe(function () {
                TS.Modules.LiveRailVPAIDManager.onAdVideoComplete();
            }, 'AdError');

            LiveRailVPAID.subscribe(function () {
                TS.Modules.LiveRailVPAIDManager.onAdVideoComplete();
            }, 'AdVideoComplete');

            LiveRailVPAID.subscribe(function (message) {
            }, 'AdLog');

            LiveRailVPAID.subscribe(function () {
                if (TS.Modules.CustomRulesModel.getRule("resumeAdWhenUserClicks")) {
                    LiveRailVPAID.resumeAd();
                }
                else {
                    E.trigger(E.EVENT_AD_CLICKTHRU, TS.Modules.LiveRailVPAIDManager.moduleName, {});
                }

            }, 'AdClickThru');
        };
        vpaidFrame.contentWindow.document.body.appendChild(vpaidLoader);
    };
    document.body.appendChild(vpaidFrame);

    this.load = function ()
    {
        TS.Modules.videoListener.removeListeners();

        var creativeData = {};
        if (TS.Modules.LiveRailVPAIDManager.playedOnce) {
            this.stopLiverail();
        }

        var adMap = "in::0%";

        if (TS.Modules.CustomRulesModel.getRule("LR_ADMAP") != "") adMap = TS.Modules.CustomRulesModel.getRule("LR_ADMAP");

        if (TS.Modules.VastModel.postRoll) {
            adMap = "in::100%";
        }

        var title = TS.Modules.PlaylistModel.title;
        var description = TS.Modules.PlaylistModel.description;
        var videoWrapper = document.getElementById('vObject');
        var videoElement = document.getElementById('videoControl');
        var editorsPickItem = TS.Modules.PlaylistModel.getEditorsPickItem();
        var channelId = TS.Modules.ChannellistModel.id;

        var contentType = 6;
        var isAutoPlay 	= TS.Modules.ConfigModel.autoPlay  == "true" ? 1 : 0 ;
        var isMuted		= TS.Modules.ConfigModel.startMute == "true" ? 1 : 0 ;

        if (editorsPickItem) {
            channelId = editorsPickItem.id;
        }

        title = title.replace(/[^a-zA-Z0-9]/g, '_');
        description = description.replace(/[^a-zA-Z0-9]/g, '_');

        environmentVars =
        {
            slot: videoWrapper,
            videoSlot: videoElement,
            videoSlotCanAutoPlay: true,
            LR_CONTENT:contentType,
            LR_AUTOPLAY:isAutoPlay,
            LR_MUTED:isMuted,
            LR_PUBLISHER_ID: 2443,
            LR_ADMAP: adMap,
            LR_PARTNERS: TS.Modules.ConfigModel.partner,
            LR_TITLE: title,
            LR_DESCRIPTION: description,
            LR_TAGS: TS.Modules.LiveRailVPAIDManager.getLiverailTags(),
            LR_VIDEO_ID: channelId,
            LR_VIDEO_AMID: TS.Modules.ConfigModel.country,
            LR_TIMEOUT_STREAM: TS.Modules.CustomRulesModel.getRule("liverailTimeOut"),
            LR_VERTICALS : TS.Modules.ConfigModel.width < 400 ? "Small" : "Large"
        };

        TS.Modules.loadingAnim.showLoader();
        TS.Modules.LiveRailVPAIDManager.adIsPlaying = true;

        if(LiveRailVPAID && LiveRailVPAID.initAd){
            LiveRailVPAID.initAd(videoElement.offsetWidth, videoElement.offsetHeight, 'normal', 512, creativeData, environmentVars);
        }

        if(LiveRailVPAID && LiveRailVPAID.setAdVolume){
            LiveRailVPAID.setAdVolume(TS.Modules.ConfigModel.volume);
        }

        var eventData = {};

        eventData.type                  = TS.Modules.VastModel.postRoll ? "postroll" : "preroll";
        eventData.videoOffsetWidth      = videoElement.offsetWidth;
        eventData.videoOffsetHeight     = videoElement.offsetHeight;
        eventData.videoSlotCanAutoPlay  = environmentVars.videoSlotCanAutoPlay;
        eventData.LR_PUBLISHER_ID       = environmentVars.LR_PUBLISHER_ID;
        eventData.LR_ADMAP              = environmentVars.LR_ADMAP;
        eventData.LR_PARTNERS           = environmentVars.LR_PARTNERS;
        eventData.LR_TITLE              = environmentVars.LR_TITLE;
        eventData.LR_DESCRIPTION        = environmentVars.LR_DESCRIPTION;
        eventData.LR_TAGS               = environmentVars.LR_TAGS;
        eventData.LR_VIDEO_ID           = environmentVars.LR_VIDEO_ID;
        eventData.LR_VIDEO_AMID         = environmentVars.LR_VIDEO_AMID;
        eventData.LR_TIMEOUT_STREAM     = environmentVars.LR_TIMEOUT_STREAM;
        eventData.LR_MUTED				= environmentVars.LR_MUTED;
        eventData.LR_CONTENT			= environmentVars.LR_CONTENT;
        eventData.LR_AUTOPLAY			= environmentVars.LR_AUTOPLAY;
        eventData.LR_VERTICALS			= environmentVars.LR_VERTICALS;

        E.trigger(E.EVENT_AD_REQUEST, TS.Modules.LiveRailVPAIDManager.moduleName, eventData);
        TS.Modules.LiveRailVPAIDManager.playedOnce = true;

        if(!LiveRailVPAID || !LiveRailVPAID.initAd){
            TS.Modules.LiveRailVPAIDManager.onAdVideoComplete();
        }
    }

    this.onSetVideoSrc = function (source, videoItem) {

        if (TS.Modules.LiveRailVPAIDManager.adIsPlaying) {
            LiveRailVPAID.stopAd();
            TS.Modules.LiveRailVPAIDManager.endOmnitureSession();
        }

        this.addListeners();
        TS.Modules.VastModel.postRoll = false;
        TS.Modules.LiveRailVPAIDManager.videoItem = TS.Modules.PlaylistModel;
        this.load();
    }

    function getErrorCodeMessage(code) {
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
    }

    this.addListeners = function()
    {
        this.removeListeners();
        $("#videoControl").on('stalled pause play canplay error loadstart progress abort suspend emptied loadedmetadata loadeddata canplaythrough playing waiting durationchange ratechange', this.onVideoEvent);
    },

        this.removeListeners = function()
        {
            $("#videoControl").off('stalled pause play canplay error loadstart progress abort suspend emptied loadedmetadata loadeddata canplaythrough playing waiting durationchange ratechange', this.onVideoEvent);
        },

        this.onVideoEvent = function(event)
        {
            E.trigger  ("ad_" + event.type, "liverail ad manager", TS.Modules.videoListener.getVideoEventData(event));
        },

        this.onTimeUpdate = function ()
        {
            if(TS.Modules.LiveRailVPAIDManager.adManager.isVideoReady())
            {
                TS.Modules.LiveRailVPAIDManager.adManager.setAdTime();
                TS.Modules.LiveRailVPAIDManager.adManager.showAdTimeControls();
                TS.Modules.LiveRailVPAIDManager.adManager.checkAdEnd();
            }
            else
            {
                TS.Modules.LiveRailVPAIDManager.adManager.showNormalTimeControls();
            }

            TS.Modules.videoView.setAdInfoSizes();
        }

    this.checkAdEnd = function()
    {
        var player = $("#videoControl")[0];

        if (Math.abs(player.duration - player.currentTime) <= STOP_TIME_BEFORE_AD_END)
        {
            $("#videoControl").off("timeupdate");
            LiveRailVPAID.stopAd();
            TS.Modules.LiveRailVPAIDManager.onAdVideoComplete();
        }
    }

    this.isVideoReady = function()
    {
        var player      = $("#videoControl")[0];
        var duration    = player.duration    ? player.duration      : 0;

        return player.readyState == 4 && duration;
    }

    this.setAdTime = function()
    {
        var player      = TS.Modules.videoView.player;
        var duration    = player.duration - STOP_TIME_BEFORE_AD_END;
        var currentTime = player.currentTime ? player.currentTime   : 0;
        var remTime     = TS.Modules.navigation.formatTime(duration - currentTime);

        $('#remTime').text(remTime);
        TS.Modules.navigation.updateTime({'currentTime': currentTime,'duration': duration});
    }

    this.showAdTimeControls = function()
    {
        $('#adTitle').show();
        $("#adTitle").css("opacity", "1");
        $(".elapsed").css("opacity", "0");
        $(".slash").css("opacity", "0");
        $(".total").css("opacity", "0");
    }

    this.showNormalTimeControls = function()
    {
        $(".elapsed").css("opacity", "1");
        $(".slash").css("opacity", "1");
        $(".total").css("opacity", "1");
        $("#adTitle").css("opacity", "0");
        $('#adTitle').hide();
    }

    this.onVideoEnd = function ()
    {
        TS.Modules.VastModel.postRoll = true;
        TS.Modules.LiveRailVPAIDManager.videoItem = TS.Modules.PlaylistModel;
        this.load();
    }

    this.stopLiverail = function () {
        try {
            LiveRailVPAID.stopAd();
            LiveRailVPAID.skipAd();
        } catch (e) {
        }
    }

    this.onFullscreenChange = function () {
        if (TS.Modules.LiveRailVPAIDManager.adIsPlaying) {
            var isFullscreen = document.fullScreen || document.webkitIsFullScreen;
            if (isFullscreen) {
                LiveRailVPAID.resizeAd(screen.width, screen.height, 'fullscreen');
                $.trace.info("AD resized to Fullscreen : " + screen.width + "x" + screen.height);
            }
            else {
                LiveRailVPAID.resizeAd($("#videoView").width(), $("#videoView").height(), 'normal');
                $.trace.info("AD resized: " + $("#videoView").width() + "x" + $("#videoView").height());
            }
        }
    }

    this.onAdPause = function () {
        LiveRailVPAID.pauseAd();
    }

    this.onAdResume = function () {
        LiveRailVPAID.resumeAd();
    }

    this.onAdStarted = function()
    {
        $("#videoControl").off("timeupdate", this.onTimeUpdate);
        $("#videoControl").on("timeupdate" , this.onTimeUpdate);
    }

    this.onAdRequest = function()
    {
        this.showNormalTimeControls();
    }

    this.onAdEnded = function()
    {
        this.showNormalTimeControls();
        $("#videoControl").off("timeupdate", this.onTimeUpdate);
    }

    // subscribe to application events
    E.bindEvent(E.EVENT_SET_VIDEOSRC    , TS.Modules.LiveRailVPAIDManager.moduleName, this.onSetVideoSrc    , this);
    E.bindEvent(E.EVENT_AD_PAUSE        , TS.Modules.LiveRailVPAIDManager.moduleName, this.onAdPause        , this);
    E.bindEvent(E.EVENT_AD_RESUME       , TS.Modules.LiveRailVPAIDManager.moduleName, this.onAdResume       , this);
    E.bindEvent(E.EVENT_AD_REQUEST      , TS.Modules.LiveRailVPAIDManager.moduleName, this.onAdRequest      , this);
    E.bindEvent(E.EVENT_AD_STARTED      , TS.Modules.LiveRailVPAIDManager.moduleName, this.onAdStarted      , this);
    E.bindEvent(E.EVENT_AD_ENDED        , TS.Modules.LiveRailVPAIDManager.moduleName, this.onAdEnded        , this, true);
    E.bindEvent(E.EVENT_POSTROLL_END    , TS.Modules.LiveRailVPAIDManager.moduleName, this.onAdEnded        , this, true);
    E.bindEvent(E.EVENT_VIDEO_END       , TS.Modules.LiveRailVPAIDManager.moduleName, this.onVideoEnd       , this);

    $(document).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', this.onFullscreenChange);
}
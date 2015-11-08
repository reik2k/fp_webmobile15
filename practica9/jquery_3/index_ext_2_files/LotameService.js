TS.Modules.LotameService =
{
    autoInit: false,
    moduleName: "LotameService",
    enabled: true,
    SEG: '/seg=',
    HYPHEN: " - ",
    VP: "VP: ",
    EXPOSED: "Exposed",
    INTERACTION: "Video Interaction",
    COMPLETION: "Video Completion",
    BASE_URL: 'http://bcp.crwdcntrl.net/5/c=3663',
    VIDEO_START: "",
    VIDEO_STOP: "Complete",
    VIDEO_PAUSE: "Pause",
    VIDEO_RESUME: "Resume",
    VIDEO_SEEK: "Seek",
    FULLSCREEN: "Fullscreen",
    FULLSCREEN_LEAVE: "Fullscreen Leave",
    MUTE: "Mute",
    UNMUTE: "Unmute",
    FIRST_QUARTILE: "First Quartile",
    MID_POINT: "Midpoint",
    THIRD_QUARTILE: "Third Quartile",
    first: false,
    mid: false,
    third: false,
    paused : false,
    sendEnabled  :false,
    serviceURL: this.BASE_URL,

    init: function ()
    {
        this.enabled = TS.Modules.CustomRulesModel.getRule("isLotameEnabled");

        if (this.enabled)
        {
            this.addListeners();
        }
    },

    addListeners: function ()
    {
        if (this.enabled)
        {
            E.bindEvent(E.EVENT_OMNITURE_AD_START_SESSION , this.moduleName, this.onAdStarted, this);
            E.bindEvent(E.EVENT_OMNITURE_START_SESSION  , this.moduleName, this.onVideoStarted, this);
            E.bindEvent(E.EVENT_VIDEO_END               , this.moduleName, this.onVideoEnded, this);
            E.bindEvent(E.EVENT_OMNITURE_END_SESSION    , this.moduleName, this.onVideoEnded, this);
            E.bindEvent(E.EVENT_VIDEO_PROGRESS          , this.moduleName, this.onVideoProgress, this);
            E.bindEvent(E.EVENT_AD_PAUSE                , this.moduleName, this.onAdPause, this);
            E.bindEvent(E.EVENT_AD_RESUME               , this.moduleName, this.onAdResume, this);
            E.bindEvent(E.EVENT_OMNITURE_AD_END_SESSION, this.moduleName, this.onAdEnded, this);
            E.bindEvent(E.EVENT_OMNITURE_TRACK_PLAY     , this.moduleName, this.onVideoResume, this);
            E.bindEvent(E.EVENT_OMNITURE_TRACK_PAUSE    , this.moduleName, this.onVideoPause, this);

            $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', this.onFullscreenChange);
       }
    },

    startVideoTimeListener : function ()
    {
        this.stopVideoTimeListener();

        this.intervalID = setInterval(this.onTimeUpdate, 400);
    },

    stopVideoTimeListener  : function ()
    {
        if(this.intervalID)
        {
            clearInterval(this.intervalID);
            this.intervalID = null;
        }
    },

    onTimeUpdate : function()
    {
        try
        {
            var player = TS.Modules.videoView.player;
            var time   = {'currentTime': player.currentTime, 'duration': player.duration };

            E.trigger(E.EVENT_VIDEO_PROGRESS, TS.Modules.videoView, time);
        }
        catch(error)
        {
            //nothing to do
        }

    },

    addParam: function (name, value)
    {
        if (value && value.length > 0)
        {
            this.serviceURL += this.SEG + this.VP + name + this.HYPHEN + value;
        }
        else
        {
            this.serviceURL += this.SEG + this.VP + name;
        }
    },

    setTrackingProperties: function (sessionParam, sessionValue)
    {
        this.serviceURL = this.BASE_URL;

        this.addParam(sessionParam      , sessionValue);
        this.addParam("LR_Partners"     , TS.Modules.ConfigModel.partner);
        this.addParam("Video Channel"   , TS.Modules.ChannellistModel.id);
        this.addParam("LR_Video_AMID"   , TS.Modules.ConfigModel.country);
        this.addParam("Timestamp"       , "" + (new Date()).getTime());
    },

    onVideoResume: function ()
    {
        if(this.paused)
        {
            this.paused = false;
            this.setTrackingProperties(this.INTERACTION, this.VIDEO_RESUME);
            this.track();
        }
    },

    onVideoStarted: function ()
    {
        this.resetSession();
        this.setTrackingProperties(this.EXPOSED, this.VIDEO_START);
        this.track();
        this.startVideoTimeListener();
    },

    resetSession : function()
    {
        this.first          = false;
        this.mid            = false;
        this.third          = false;
        this.paused         = false;
        this.sendEnabled    = true;
    },

    onVideoPause: function ()
    {
        this.paused = true;
        this.setTrackingProperties(this.INTERACTION, this.VIDEO_PAUSE);
        this.track();
    },

    onVideoEnded: function ()
    {
        if(this.sendEnabled)
        {
            this.setTrackingProperties(this.COMPLETION, this.VIDEO_STOP);
            this.track();
            this.sendEnabled = false;
            this.stopVideoTimeListener();
        }
    },

    onVideoProgress: function (source, data)
    {
        if(this.sendEnabled)
        {
            var playPercent = (data.currentTime / data.duration) *100;

            if(playPercent >= 25 && playPercent <= 35)
            {
                this.trackFirstQuartile();
            }
            else if(playPercent >= 50 && playPercent <= 60)
            {
                this.trackFirstQuartile();
                this.trackMidPoint();
            }
            else if(playPercent >= 75 && playPercent <= 85)
            {
                this.trackFirstQuartile();
                this.trackMidPoint();
                this.trackThirdQuartile();
            }
        }
    },

    onFullscreenChange : function()
    {
        var service = TS.Modules.LotameService;

        if(service.sendEnabled)
        {
            var state = (document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen) ? service.FULLSCREEN : service.FULLSCREEN_LEAVE;

            service.setTrackingProperties(service.INTERACTION, state);
            service.track();
        }
    },

    trackFirstQuartile : function()
    {
        if(!this.first)
        {
            this.first = true;
            this.setTrackingProperties(this.COMPLETION, this.FIRST_QUARTILE);
            this.track();
        }
    },

    trackMidPoint : function()
    {
        if(!this.mid)
        {
            this.mid = true;
            this.setTrackingProperties(this.COMPLETION, this.MID_POINT);
            this.track();
        }
    },

    trackThirdQuartile : function()
    {
        if(!this.third)
        {
            this.third = true;
            this.setTrackingProperties(this.COMPLETION, this.THIRD_QUARTILE);
            this.track();
        }
    },

    onVideoResume: function ()
    {
        if(this.paused)
        {
            this.paused = false;
            this.setTrackingProperties(this.INTERACTION, this.VIDEO_RESUME);
            this.track();
        }
    },

    onAdResume: function ()
    {
        if(this.paused)
        {
            this.paused = false;
            this.setTrackingProperties(this.INTERACTION, this.VIDEO_RESUME);
            this.track();
        }
    },

    onAdStarted: function ()
    {
        this.resetSession();
        this.setTrackingProperties(this.EXPOSED, this.VIDEO_START);
        this.track();
        this.startVideoTimeListener();
    },

    onAdPause: function ()
    {
        this.paused = true;
        this.setTrackingProperties(this.INTERACTION, this.VIDEO_PAUSE);
        this.track();
    },

    onAdEnded: function ()
    {
        if(this.sendEnabled)
        {
            this.setTrackingProperties(this.COMPLETION, this.VIDEO_STOP);
            this.track();
            this.sendEnabled = false;
            this.stopVideoTimeListener();
        }
   },

    track: function ()
    {
        var image = '<img class="lotameImage" src="' + this.serviceURL + '" style="display:none"/>';

        $(".lotameImage").remove();
        $('body').append(image);
    }
};
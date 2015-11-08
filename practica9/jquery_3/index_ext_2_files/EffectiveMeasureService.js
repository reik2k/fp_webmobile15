TS.Modules.EffectiveMeasureService =
{
    autoInit 		: false,
    moduleName 	    : "EffectiveMeasureService",
    enabled		    : true,
    BEACON_URL      : "http://stream.effectivemeasure.net/em_stream_image.php?",
    ID              : "performeplayer",
    videoType       : 0,
    adData          : null,
    videoPaused     : false,
    //Stream Event Constants
    _EM_STREAM_EVENT_START 	         : "1",
    _EM_STREAM_EVENT_PING  	         : "2",
    _EM_STREAM_EVENT_PAUSE 	         : "3",
    _EM_STREAM_EVENT_RESUME 	     : "4",
    _EM_STREAM_EVENT_STOP 	         : "5",
    _EM_STREAM_EVENT_Q1 		     : "6",
    _EM_STREAM_EVENT_Q2 		     : "7",
    _EM_STREAM_EVENT_Q3 		     : "8",
    _EM_STREAM_EVENT_COMPLETE        : "9",
    //Stream Type Constants
    _EM_STREAM_TYPE_VIDEO 	         : "1",
    _EM_STREAM_TYPE_AUDIO 	         : "2",
    //Ads Type Constants
    _EM_STREAM_AD_TYPE_PREROLL	     : "1",
    _EM_STREAM_AD_TYPE_MIDROLL	     : "2",
    _EM_STREAM_AD_TYPE_POSTROLL      : "3",
    _EM_STREAM_AD_TYPE_BANNER 	     : "4",
    //Stream Position Constants
    _EM_STREAM_POSITION_ABOVE		 : "1",
    _EM_STREAM_POSITION_BELOW		 : "2",
    //Stream Auto Play Constants
    _EM_STREAM_START_AUTO			 : "1",
    _EM_STREAM_START_USER_INITIATED	 : "0",
    _EM_STREAM_START_UNKNOWN		 : "-1",

    init : function()
    {
        this.enabled = TS.Modules.CustomRulesModel.getRule("isEffectiveMeasureEnabled");

        if(this.enabled)
        {
            this.addListeners();
        }
    },

    addListeners : function()
    {
        if(this.enabled)
        {
            E.bindEvent(E.EVENT_AD_STARTED	            , this.moduleName   , this.onAdStarted		, this);
            E.bindEvent(E.EVENT_START_VIDEO			    , this.moduleName   , this.onVideoStarted   , this);
            E.bindEvent(E.EVENT_VIDEO_END			    , this.moduleName   , this.onVideoEnded     , this);
            E.bindEvent(E.EVENT_AD_PAUSE                , this.moduleName   , this.onAdPause        , this);
            E.bindEvent(E.EVENT_AD_RESUME               , this.moduleName   , this.onAdResume       , this);
            E.bindEvent(E.EVENT_AD_ENDED                , this.moduleName   , this.onAdEnded        , this);
            E.bindEvent(E.EVENT_OMNITURE_TRACK_PLAY     , this.moduleName   , this.onVideoResume    , this);
            E.bindEvent(E.EVENT_OMNITURE_TRACK_PAUSE    , this.moduleName   , this.onVideoPause     , this);
         }
    },

    onAdStarted : function(source, eventData)
    {
        this.videoType  =  TS.Modules.PlaylistModel.VIDEOTYPE_PREROLL;
        this.adData     =  eventData;

        if(TS.Modules.VastModel.postRoll)
        {
            this.videoType =  TS.Modules.PlaylistModel.VIDEOTYPE_POSTROLL;
        }

        this.send(this.getTags(this._EM_STREAM_EVENT_START));
    },

    onAdPause : function()
    {
        if(this.adData)
        {
            this.send(this.getTags(this._EM_STREAM_EVENT_PAUSE));
        }
    },

    onAdResume : function()
    {
        if(this.adData)
        {
            this.send(this.getTags(this._EM_STREAM_EVENT_RESUME));
        }
    },

    onAdEnded : function()
    {
        if(this.adData)
        {
            this.send(this.getTags(this._EM_STREAM_EVENT_COMPLETE));

            this.adData = null;
        }
    },

    onVideoStarted : function ()
    {
        this.videoType      = TS.Modules.PlaylistModel.VIDEOTYPE_CONTENT;
        this.isVideoPaused  = false;

        this.send(this.getTags(this._EM_STREAM_EVENT_START));
    },

    onVideoPause : function()
    {
        if(this.videoType == TS.Modules.PlaylistModel.VIDEOTYPE_CONTENT)
        {
            this.isVideoPaused = true;

            this.send(this.getTags(this._EM_STREAM_EVENT_PAUSE));
        }
    },

    onVideoResume : function()
    {
        if(this.videoType == TS.Modules.PlaylistModel.VIDEOTYPE_CONTENT && this.isVideoPaused)
        {
            this.send(this.getTags(this._EM_STREAM_EVENT_RESUME));
        }
    },

    onVideoEnded : function ()
    {
        this.send(this.getTags(this._EM_STREAM_EVENT_COMPLETE));
    },

    send : function(tags)
    {
        var fullURL = this.BEACON_URL + tags;
        var image   = '<img src="' + fullURL + '" style="display:none"/>';

        $('body').append(image);
    },

    getTags : function (p_eventType)
    {
        var tags = "";

        tags += "sm[scid]=" + this.ID 						                    + "&";
        tags += "sm[se]=" 	+ p_eventType 					                    + "&";
        tags += "sm[st]=" 	+ this._EM_STREAM_TYPE_VIDEO 	                    + "&";
        tags += "sm[mid]=" 	+ TS.Modules.PlaylistModel.videoItem.guid["#text"] 	+ "&";
        tags += "sm[sw]=" 	+ TS.Modules.initialize.config.videoWidth 	        + "&";
        tags += "sm[sh]=" 	+ TS.Modules.initialize.config.videoHeight 	        + "&";
        tags += "sm[sas]=" 	+ this.getAutoPlay() 	                            + "&";
        tags += "sm[sp]=" 	+ this._EM_STREAM_POSITION_ABOVE;

        tags = this.addAdTag	 (tags);
        tags = this.addCustomTags(tags);

        return tags;
    },

    getAutoPlay : function()
    {
        var ret = this._EM_STREAM_START_USER_INITIATED;

        if(TS.Modules.ConfigModel.autoPlay)
        {
            ret = this._EM_STREAM_START_AUTO;
        }

        return ret;
    },

    addCustomTags : function (tags)
    {
        var ret             = "";
        var configModel     = TS.Modules.ConfigModel;
        var videoWidth      = TS.Modules.initialize.config.videoWidth;
        var videoTitle      = TS.Modules.PlaylistModel.title;
        var contentTitle    = TS.Modules.PlaylistModel.title;
        var videoDuration   = TS.Modules.PlaylistModel.duration;
        var contentDuration = TS.Modules.PlaylistModel.duration;

        if(this.videoType != TS.Modules.PlaylistModel.VIDEOTYPE_CONTENT)
        {
            videoDuration   = this.adData.duration;
            videoTitle      = this.adData.adUrl;
        }

        ret += "startmute=" 		+ configModel.startMute					+ "&";
        ret += "contentduration=" 	+ contentDuration				        + "&";
        ret += "videoduration=" 	+ videoDuration 					    + "&";
        ret += "contenttitle=" 		+ contentTitle 					        + "&";
        ret += "videotitle=" 		+ videoTitle 					        + "&";
        ret += "channelname=" 		+ TS.Modules.channelService.getFullChannelName() + "&";
        ret += "language=" 		  	+ configModel.language 					+ "&";
        ret += "autoplay=" 		  	+ configModel.autoPlay 				    + "&";
        ret += "version=" 		  	+ TS.Config.VERSION_DATE 				+ "&";
        ret += "partnerid=" 		+ configModel.partner 				    + "&";
        ret += "eplayersize=" 		+ videoWidth				            + "&";
        ret += "country=" 			+ configModel.country					+ "&";
        ret += "eplayermode=" 		+ "html5"								+ "&";
        ret += "hosturl=" 			+ configModel.windowLocation			+ "&";
        ret += "playertype=" 		+ configModel.playerType;

        return tags + "&sm[extra]=" + encodeURIComponent(ret);
    },

    addAdTag : function(tags)
    {
        var ret = tags;

        if(this.videoType == TS.Modules.PlaylistModel.VIDEOTYPE_PREROLL)
        {
            ret += "&sm[sat]=" + this._EM_STREAM_AD_TYPE_PREROLL;
        }
        else if(this.videoType == TS.Modules.PlaylistModel.VIDEOTYPE_POSTROLL)
        {
            ret += "&sm[sat]=" + this._EM_STREAM_AD_TYPE_POSTROLL;
        }

        return ret;
    }




}
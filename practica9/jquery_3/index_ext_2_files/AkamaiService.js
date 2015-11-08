TS.Modules.AkamaiService =
{
    autoInit 		: false,
    moduleName 	    : "AkamaiService",
    enabled		    : true,
    videoType       : "content",
    adData          : null,
    source          : PATH_AKAMAI,
    akamaiLoaded    : false,
    isAkamaiNotInitialized : true,

    init : function()
    {
        this.enabled = TS.Modules.CustomRulesModel.getRule("isAkamaiMeasureEnabled");

        if(this.enabled)
        {
            this.addListeners();

            var script = document.createElement('script');

            script.setAttribute("type"  ,"text/javascript");
            script.setAttribute("src"   , this.source);
            script.setAttribute("id"    , "akamaiScript");

            document.getElementsByTagName("head")[0].appendChild(script);
        }
    },

    addListeners : function()
    {
        if(this.enabled)
        {
            E.bindEvent(E.EVENT_AD_REQUEST	            , this.moduleName   , this.onAdRequest		, this);
            E.bindEvent(E.EVENT_AD_STARTED	            , this.moduleName   , this.onAdStarted		, this);
            E.bindEvent(E.EVENT_START_VIDEO			    , this.moduleName   , this.onVideoStarted   , this);
            E.bindEvent(E.EVENT_VIDEO_END			    , this.moduleName   , this.onVideoEnded     , this);
            E.bindEvent(E.EVENT_AD_ENDED                , this.moduleName   , this.onAdEnded        , this);
            E.bindEvent(E.EVENT_OMNITURE_TRACK_PLAY     , this.moduleName   , this.onVideoResume    , this);
            E.bindEvent(E.EVENT_OMNITURE_TRACK_PAUSE    , this.moduleName   , this.onVideoPause     , this);
            E.bindEvent(E.EVENT_AKAMAI_HTML5_LOADED     , this.moduleName   , this.onAkamaiHtml5Loaded     , this);
        }
    },

    onAkamaiHtml5Loaded : function(source, eventData)
    {
        this.akamaiLoaded = true;
    },

    onAdRequest : function(source, eventData)
    {
       if(eventData.type == "preroll" && this.akamaiLoaded && this.isAkamaiNotInitialized)
       {
           this.isAkamaiNotInitialized = false;

           initAkamaiAnalytics();
           this.setAkamaiData();
       }
       else if(window.handlePlayEnd)
       {
            handlePlayEnd();
       }
   },

    onAdStarted : function(source, eventData)
    {
        $("#videoControl").attr("data-isad", "true");

        this.videoType  =  TS.Modules.PlaylistModel.VIDEOTYPE_PREROLL;
        this.adData     =  eventData;

        if(TS.Modules.VastModel.postRoll)
        {
            this.videoType =  TS.Modules.PlaylistModel.VIDEOTYPE_POSTROLL;
        }

        var loadData = new Object();

        loadData.adType 	= this.videoType;
        loadData.adDuration = this.adData.duration;
        loadData.adTitle 	= this.getAdTitleFromURL(this.adData.adUrl);
        loadData.adURI 		= this.adData.adUrl;
        loadData.id			= TS.Modules.ChannellistModel.id;

        if(window.akamaiHandleAdLoaded){
            akamaiHandleAdLoaded(loadData);
            akamaiHandleAdStarted();
        }
    },

    getAdTitleFromURL : function(p_url)
    {
        var index   = p_url.lastIndexOf("/");
        var ret     = p_url;

        if(index > -1 && index + 1 < p_url.length)
        {
            ret = p_url.substring(index + 1,  p_url.length);
        }

        return ret;
    },

    onAdEnded : function()
    {
        $("#videoControl").attr("data-isad", "false");

        if(this.adData && window.akamaiHandleAdCompleted)
        {
            akamaiHandleAdCompleted();

            this.adData = null;
        }
    },

    onVideoStarted : function ()
    {
        $("#videoControl").attr("data-isad", "false");

        this.videoType      = TS.Modules.PlaylistModel.VIDEOTYPE_CONTENT;
        this.isVideoPaused  = false;

        this.setAkamaiData();
        this.sendAkamaiEvent();
    },

    setAkamaiData :function(){
        if(window.setAkamaiMediaAnalyticsData)
        {
            //mandatory datas
            setAkamaiMediaAnalyticsData("category", TS.Modules.PlaylistModel.videoItem.genre);
            setAkamaiMediaAnalyticsData("subCategory", TS.Modules.ChannellistModel.name);
            setAkamaiMediaAnalyticsData("show", TS.Modules.ConfigModel.language);
            setAkamaiMediaAnalyticsData("pageUrl", this.getDomainName());
            setAkamaiMediaAnalyticsData("pageReferrer", this.getDomainName());
            setAkamaiMediaAnalyticsData("contentLength", TS.Modules.PlaylistModel.duration * 1000);
            setAkamaiMediaAnalyticsData("contentType", "video");
            setAkamaiMediaAnalyticsData("device", TS.Modules.ConfigModel.device);
            setAkamaiMediaAnalyticsData("title", TS.Modules.PlaylistModel.title);
            setAkamaiMediaAnalyticsData("deliveryType", "O");
            setAkamaiMediaAnalyticsData("playerId", TS.Modules.ConfigModel.playerId);

            //non mandatory datas
            setAkamaiMediaAnalyticsData("autoPlay", this.getAutoPlayText());
            setAkamaiMediaAnalyticsData("eplayerVersion", TS.Config.VERSION_DATE);
            setAkamaiMediaAnalyticsData("partnerId", TS.Modules.ConfigModel.partner);
            setAkamaiMediaAnalyticsData("viewSize", this.getVideoViewSize());
            setAkamaiMediaAnalyticsData("playerType", TS.Modules.ConfigModel.playerType);
            setAkamaiMediaAnalyticsData("videoId", TS.Modules.PlaylistModel.videoItem.guid["#text"]);
            setAkamaiMediaAnalyticsData("startMute", TS.Modules.ConfigModel.startMute);
            setAkamaiMediaAnalyticsData("channelId", TS.Modules.ChannellistModel.id);
            setAkamaiMediaAnalyticsData("performCountry", TS.Modules.ConfigModel.country);
        }
    },

    sendAkamaiEvent : function()
    {
        try
        {
            var params = {
                "category": TS.Modules.PlaylistModel.videoItem.genre,
                "subCategory": TS.Modules.ChannellistModel.name,
                "show": TS.Modules.ConfigModel.language,
                "pageUrl": this.getDomainName(),
                "pageReferrer": this.getDomainName(),
                "contentLength": TS.Modules.PlaylistModel.duration * 1000,
                "contentType": "video",
                "device": TS.Modules.ConfigModel.device,
                "title": TS.Modules.PlaylistModel.title,
                "deliveryType": "O",
                "playerId": TS.Modules.ConfigModel.playerId,
                "autoPlay": this.getAutoPlayText(),
                "eplayerVersion": TS.Config.VERSION_DATE,
                "partnerId": TS.Modules.ConfigModel.partner,
                "viewSize": this.getVideoViewSize(),
                "playerType": TS.Modules.ConfigModel.playerType,
                "videoId": TS.Modules.PlaylistModel.videoItem.guid["#text"],
                "startMute": TS.Modules.ConfigModel.startMute,
                "channelId": TS.Modules.ChannellistModel.id,
                "performCountry": TS.Modules.ConfigModel.country
            };

            E.trigger(E.EVENT_AKAMAI_VIDEO_STARTED, TS.Modules.ConvivaService, params);
        }
        catch(error)
        {
            //nothing to do
        }

    },

    getVideoViewSize : function()
    {
        var width = $("#wrapper").width();

        if(width <= 300)
        {
            return "300orLess";
        }
        else if(width < 400)
        {
            return "301to399";
        }
        else if(width < 480)
        {
            return "400to479";
        }

        return "480orMore";
    },

    getAutoPlayText : function()
    {
        if(TS.Modules.ConfigModel.autoPlay)
        {
            return "auto-play";
        }

        return "manual";
    },

    onVideoPause : function()
    {
        if(this.videoType == TS.Modules.PlaylistModel.VIDEOTYPE_CONTENT)
        {
            this.isVideoPaused = true;


        }
    },

    onVideoResume : function()
    {
        if(this.videoType == TS.Modules.PlaylistModel.VIDEOTYPE_CONTENT && this.isVideoPaused)
        {

        }
    },

    onVideoEnded : function ()
    {

    },
    
    getDomainName : function()
    {
            var ret = document.referrer;
            
            if(ret)
            {
                var index = ret.indexOf("//");
                
                if(index > 0)
                {
                    index += 2; 
                }
                
                index   = ret.indexOf("/", index);
                
                if(index > 0)
                {
                    ret     = ret.substring(0, index);
                }
            }
            
            return ret;
    }
};

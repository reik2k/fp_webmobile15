TS.Modules.ConvivaService = 
{
  autoInit 		    : false,
  moduleName 	    : "ConvivaService",
  streamer		    : $("#videoControl")[0],
  session		    : null,
  videoNum		    : 1,
  serviceURL	    : PATH_CONVIVA,
  customerID	    : "c3.PerformGroup",
  enabled		    : false,
  convivaMetadata   : null,
  
  init : function()
  {
  	if(this.enabled)
  	{
  		try
        {
            Conviva.LivePass.init( this.serviceURL, this.customerID, this.livePassNotifier );
            Conviva.LivePass.toggleTraces( false );

            this.addListeners();
        }
        catch(error)
        {
            E.triggerError(TS.Modules.ConvivaService, error, "Conviva initialization is failed.");
            this.enabled = false;
        }
  	}
  },
  
  addListeners : function()
  {
  	if(this.enabled)
  	{
	  	E.bindEvent( E.SET_VIDEO_TITLE			, this.moduleName, this.onVideoStarted	, this );
	  	E.bindEvent( E.EVENT_AD_STARTED	            , this.moduleName, this.onAdStarted		, this );
	  	E.bindEvent( E.EVENT_VIDEO_END				, this.moduleName, this.onVideoEnded	, this );

	   }
   },
  
  livePassNotifier : function(convivaNotification)
  {
    if ( convivaNotification.code == 0 ) 
    {
      console.log( "Conviva LivePass initialized successfully." );
    } 
    else 
    {
      if ( Conviva.LivePass.ready ) 
      { // check if LivePass is already initialized
        console.log( "Conviva LivePass post-initialization feedback.\n " +
                     "\tCode: " + convivaNotification.code + ";\n " +
                     "\tMessage: " + convivaNotification.message );
      } 
      else 
      {
          console.log( "Conviva LivePass failed to initialize!\n " +
                       "t\Conviva metrics will not be captured! " +
                       "\tCode: " + convivaNotification.code + "; " +
                       "\tMessage: " + convivaNotification.message );
      }
    }
  },
   
  onAdStarted : function()
  {
  	var type =  TS.Modules.PlaylistModel.VIDEOTYPE_PREROLL;

    if(TS.Modules.VastModel.postRoll)
    {
        type =  TS.Modules.PlaylistModel.VIDEOTYPE_POSTROLL;
    }
 
   this.sendAdStartEvent();
  },
  
  onAdEnded : function()
  {
    //this.sendAdEndEvent();
  },

  onPostrollEnded : function()
  {
    //this.sendVideoCompleteEvent();
    //this.cleanUp();
  },
  
  onVideoStarted : function ()
  {
  	this.startSession(TS.Modules.PlaylistModel.url,
                      TS.Modules.PlaylistModel.duration,
                      TS.Modules.PlaylistModel.title,
                      TS.Modules.PlaylistModel.VIDEOTYPE_CONTENT);
  },
  
  onVideoEnded : function(source, videoItem)
  {
      this.sendVideoCompleteEvent();
      this.cleanUp();
  },
  
  startSession : function(videoURL, duration, title, videoType)
  {
    if (typeof Conviva !== "undefined" && Conviva) 
    {       
      	  if (this.session) 
      	   this.cleanUp();
      try
      {
          if (typeof Conviva !== "undefined" && Conviva)
          {
			  
			  var isTestPlayer = document.referrer.indexOf("/ptvFlash/eplayer2/testarea/");
			  			  
              //this.cleanUp();
              var sessionTitle = '[' + TS.Modules.PlaylistModel.id + '] ' + title;
              this.convivaMetadata = Conviva.ConvivaContentInfo.createInfoForLightSession( sessionTitle );
  
              this.convivaMetadata.cdnName 	= Conviva.ConvivaContentInfo.CDN_NAME_AKAMAI; // required
              this.convivaMetadata.streamUrl 	= videoURL; // required
              this.convivaMetadata.isLive 	= false; // required
              this.convivaMetadata.playerName = isTestPlayer== -1 ? "ePlayerHTML5" : "ePlayerHTML5_TEST"; // optional
              this.convivaMetadata.deviceType = TS.userData.os.deviceType();
              this.convivaMetadata.tags 		= this.getTags(duration, title, videoType);
              
              this.streamer = $("#videoControl")[0];
              
              this.session = Conviva.LivePass.createSession( this.streamer, this.convivaMetadata );
  
              this.session.setContentLength( duration );
  
              this.videoNum++;
  
              var eventData = {};
  
              eventData.convivaMetadata   = {};
              eventData.videoNum          = this.videoNum;
              eventData.autoInit          = this.autoInit;
              eventData.serviceURL        = this.serviceURL;
              eventData.customerID        = this.customerID;
  
              eventData.convivaMetadata.cdnName   = this.convivaMetadata.cdnName;
              eventData.convivaMetadata.streamUrl = this.convivaMetadata.streamUrl;
              eventData.convivaMetadata.isLive    = this.convivaMetadata.isLive;
              eventData.convivaMetadata.playerName= this.convivaMetadata.playerName;
              eventData.convivaMetadata.tags      = this.convivaMetadata.tags;
  
              E.trigger(E.EVENT_CONVIVA_SESSION_STARTED, TS.Modules.ConvivaService, eventData);
         }
      }
      catch(error)
      {
          E.triggerError(this, error);
      }
    }
  },
  
  getTags : function (duration, title, videoType)
  {
    var tags       		= {};
    var configModel   	= TS.Modules.ConfigModel;
    var channelModel   	= TS.Modules.ChannellistModel;
    var autoPlay 		= configModel.autoPlay;
    var genre     		= TS.Modules.PlaylistModel.videoItem.genre;
    var category   		= TS.Modules.PlaylistModel.videoItem.category
    var videoWidth    	= TS.Modules.initialize.config.videoWidth;
    var editorsPickItem = TS.Modules.PlaylistModel.getEditorsPickItem();
        
    if(editorsPickItem && editorsPickItem.genre && editorsPickItem.category)
    {
        genre       = editorsPickItem.genre;
        category    = editorsPickItem.category;
    }
    
    genre = genre.replace( /[^a-zA-Z0-9]/g, '_');
    category = category.replace( /[^a-zA-Z0-9]/g, '_');
    
    
    var referrer = document.referrer.replace( 'http://','');
    
    tags.autoPlay	    = autoPlay;
    tags.startMute	    = configModel.startMute;
    tags.playerType	    = configModel.playerType;
    tags.playerSize	    = videoWidth;
    tags.genre		    = genre;
    tags.category	    = category;
    tags.contentId    = TS.Modules.PlaylistModel.id;
    tags.hosturl	    = (referrer == "") ? window.location.hostname + window.location.pathname : referrer;
    tags.partnerId	    = configModel.partner;
    tags.playerId	    = configModel.playerId;
    tags.country	    = configModel.country;
    tags.language	    = configModel.language.split("_")[0];
    tags.channelId	    = configModel.channelId;
    tags.playerSize     = videoWidth;
    tags.channelName    = channelModel.name;
    tags.depth			= 1;
    tags.streamProtocol	= "HTTP";
    tags.playerVersion	= TS.Config.VERSION_DATE;
    
    tags.videoType		= videoType;//refers on 'content', 'preroll' or 'postroll'
    tags.site = (referrer == "") ? window.location.hostname : referrer.split("/")[0];
    
    tags.videoTitle     = title;
    tags.videoDuration  = parseInt(duration);
   
    return tags;
  },
  
  cleanUp : function()
  {
	   Conviva.LivePass.cleanupMonitoringSession( this.streamer );
	   E.trigger(E.EVENT_CONVIVA_SESSION_CLEANED, TS.Modules.ConvivaService,{});
  },

  sendAdStartEvent: function()
  {
        if(this.convivaMetadata && this.convivaMetadata.tags && this.convivaMetadata.tags.videoType != TS.Modules.PlaylistModel.VIDEOTYPE_CONTENT)
        {
            var params = {};

            params.adTitle 			= this.convivaMetadata.tags.videoTitle;
            params.adType			= this.convivaMetadata.tags.videoType;
            params.adDuration		= this.convivaMetadata.tags.videoDuration;


            Conviva.LivePass.metrics.sendEvent( "adPlayed", params);

            E.trigger(E.EVENT_CONVIVA_AD_START, TS.Modules.ConvivaService, params);
        }
  },
    
  sendAdEndEvent: function()
  {
        if(this.convivaMetadata &&  this.convivaMetadata.tags && this.convivaMetadata.tags.videoType != TS.Modules.PlaylistModel.VIDEOTYPE_CONTENT)
        {
            var params = {};

            params.adTitle 			= this.convivaMetadata.tags.videoTitle;
            params.contentTitle 	= this.convivaMetadata.tags.contentTitle;
            params.contentDuration	= this.convivaMetadata.tags.contentDuration;
            params.adType			= this.convivaMetadata.tags.videoType;
            params.adDuration		= this.convivaMetadata.tags.videoDuration;
            params.partnerId		= this.convivaMetadata.tags.partnerId;

            Conviva.LivePass.metrics.sendEvent( "ad_end", params);

            E.trigger(E.EVENT_CONVIVA_AD_END, TS.Modules.ConvivaService, params);
        }
  },
    
  sendVideoCompleteEvent: function()
  {
    if(this.convivaMetadata && this.convivaMetadata.tags)
    {
        var params = {};

        params.contentTitle 	= this.convivaMetadata.tags.contentTitle;
        params.contentDuration	= this.convivaMetadata.tags.contentDuration;
        params.partnerId		= this.convivaMetadata.tags.partnerId;

        //Conviva.LivePass.metrics.sendEvent( "asset_complete", params);

        E.trigger(E.EVENT_CONVIVA_VIDEO_COMPLETE, TS.Modules.ConvivaService, params);
    }
  } 
}
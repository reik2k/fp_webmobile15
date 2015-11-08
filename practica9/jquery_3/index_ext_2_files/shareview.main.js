TS.Modules.shareview  = 
{
	moduleName: 'shareview',
  
	config: {},
	autoInit: false,
  
	callback: null,
	flashVars: null,

	init : function()
	{
		this.bannerHeight   = TS.Modules.initialize.getBannerViewHeight();
     	this.videoWidth    	= TS.Modules.initialize.config.videoWidth;
    	this.videoHeight  	= TS.Modules.initialize.config.videoHeight;
		this.lineCount    	= 2;
		this.updateLink 	= "";
		this.shareEnabled 	= true;
		
		E.bindEvent(E.EVENT_FACEBOOK_SHOW_SHARE	, this.moduleName, this.onShare				, this);
		E.bindEvent(E.EVENT_SET_VIDEOSRC		, this.moduleName, this.onVideoStarted		, this);
		E.bindEvent(E.UPDATE_FB_LINK			, this.moduleName, this.updateFacebookLink	, this);
        E.bindEvent(E.EVENT_WINDOW_RESIZED	    , this.moduleName, this.onWindowResized	    , this);

		this.initStyles();
		this.addListeners();
	},

    onWindowResized : function (source, eventData)
    {
        this.videoWidth    	= TS.Modules.initialize.config.videoWidth;
        this.videoHeight  	= TS.Modules.initialize.config.videoHeight;

        this.initStyles();
    },
	
	onShare : function (source, eventData)
	{
	  $("#shareView").css('visibility', "visible");
	  $("#shareView").fadeIn(1000);
	},

	getShareDivLineHeight : function ()
	{
	  var lineHeight = $("#shareDiv").css("line-height");
	  
	  if(typeof (lineHeight) == "string")
	  {
	  	lineHeight = lineHeight.replace("px", "");
	  }
	  
	  return lineHeight;
	},

	initStyles : function ()
	{
	  var lineHeight     	= this.getShareDivLineHeight();
	  var allLineHeight   	= lineHeight * this.lineCount;
	  var padding     		= Math.round((this.videoHeight - allLineHeight) / 2);

	  $("#shareView").width(this.videoWidth);
	  $("#shareView").height(this.videoHeight);
	  $("#shareDiv").css("padding-top", padding);
	},

	onVideoStarted : function (source, eventData)
	{
	  $("#shareView").hide();
	},
	
	addListeners : function ()
	{
	  $("#closeDiv")      		.on  ("click", this.onCloseClick);
	  $("#shareFacebookImage")	.on  ("click", this.onShareClick);
	  $("#shareClipLabel")  	.on  ("click", this.onShareClick);
	},	
	
	onCloseClick : function ()
	{
	  $("#shareView").hide();
	  
	  E.trigger(E.EVENT_SHARE_VIEW_CLOSED, TS.Modules.shareview , null);	
	},
	
	onShareClick : function ()
	{
      TS.Modules.shareview.onCloseClick();
	  
	  window.open(TS.Modules.shareview.updateLink, "_blank");
	},

	updateShareLink : function( videoID, videoTitle ) 
	{    
	    var channelID = TS.modules.PlaylistModel.id;
	    
	    videoTitle = StringUtils.replaceSlashes(videoTitle);
	    
	    this.updateLink = TS.Modules.CustomRulesModel.getFacebookAppURL(videoID, videoTitle);
	    
	    $("#copyLinkInput").val(this.updateLink);
	},
	
	updateFacebookLink : function( source,  data )
	{
	    this.updateShareLink( data.optionalData.guid, data.optionalData.title);
	}

}
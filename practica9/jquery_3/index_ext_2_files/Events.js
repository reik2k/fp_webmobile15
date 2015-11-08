TS.Modules.Events  = {
  moduleName: 'Events',
  autoInit: false,
  events: [],
  proxies : [],
  isSourceNotSet : true,
  nonLoggableEvents : ["SET_FACEBOOKBAR_POS", "SHOW_VIDEO_OVERLAY", "HIDE_VIDEO_OVERLAY", "VIDEO_PROGRESS"],

  bindEventLast: function( _eventName, _module, _callback, destination)
  {
      this.bindEvent(_eventName + "_AFTER", _module, _callback, destination)
  },

bindEvent: function( _eventName, _module, _callback, destination, firstReceiver )
  {
    if( !_eventName || !_module, !_callback )
    {
      this.triggerErrorDuringBind({message:"Events.bindEvent:Missing parameter(s)", stack:"No stack."}, error.message, _eventName, _module);

      return false;
    }
    if(!jQuery.isFunction(_callback))
    {
      this.triggerErrorDuringBind({message:"Events.bindEvent:Callback is not a function", stack:"No stack."}, error.message, _eventName, _module);

      return false;
    }

    if(firstReceiver === true)
    {
    	_eventName += "_PRE"
    }

    var proxy = new TS.Modules.Events.proxy();

    proxy.callback      = _callback;
    proxy.destination   = destination;
    proxy.eventName     = _eventName;
    proxy.module        = _module;

    this.proxies.push(proxy);

    $(window).bind( _eventName, _module,  $.proxy(proxy.run, proxy));

    if( !this.events[_eventName] )
    {
      this.events[_eventName] = [];
    }
    this.events[_eventName].push({
      module: _module
    });


  },

  trigger: function( p_eventName, p_module, p_paramObject )
  {
    var errorData = {};

    if(p_eventName == E.EVENT_SET_VIDEOSRC && TS.Modules.Events.isSourceNotSet)
    {
        TS.Modules.Events.isSourceNotSet = false;

        startDummyVideo();
    }

    try
    {
        $(window).trigger(p_eventName + "_PRE"	, p_paramObject);
    }
    catch(error)
    {
        if(p_eventName !=  E.EVENT_EXCEPTION_DURING_TRIGGER && p_eventName != E.EVENT_EXCEPTION_DURING_BIND)
        {
            E.triggerErrorDuringTrigger(error, null, p_eventName, p_module);
        }
    }

    try
    {
        $(window).trigger(p_eventName , p_paramObject);
    }
    catch(error)
    {
        if(p_eventName !=  E.EVENT_EXCEPTION_DURING_TRIGGER && p_eventName != E.EVENT_EXCEPTION_DURING_BIND)
        {
            E.triggerErrorDuringTrigger(error, null, p_eventName, p_module);
        }
   }

   try
   {
          $(window).trigger(p_eventName + "_AFTER"	, p_paramObject);
   }
   catch(error)
   {
      if(p_eventName !=  E.EVENT_EXCEPTION_DURING_TRIGGER && p_eventName != E.EVENT_EXCEPTION_DURING_BIND)
      {
          E.triggerErrorDuringTrigger(error, null, p_eventName, p_module);
      }
   }

    if(TS.Modules.initialize.config.flashVars.debugMode === "true" && this.isLoggableEvent(p_eventName))
    {
        this.addLogEntry(TS.Modules.ConfigModel.playerId, "EplayerLogEntry.TYPE_EVENT", p_eventName, p_paramObject)
    }
  },

  triggerError : function(p_module, p_error, p_description)
  {
      var errorData = {};

      errorData.errorMessage        = p_error.message;
      errorData.errorStack          = p_error.stack;
      errorData.description         = p_description ? p_description : "no description";
      errorData.moduleName          = this.getModuleName(p_module);

      $.trace.error(p_error);

      E.trigger(E.EVENT_EXCEPTION, p_module, errorData);
  },

  triggerErrorDuringTrigger : function(p_error, p_description, p_eventName, p_module)
  {
      var errorData = {};

      errorData.errorMessage        = p_error.message;
      errorData.errorStack          = p_error.stack;
      errorData.description         = p_description ? p_description : "no description";
      errorData.moduleName          = this.getModuleName(p_module);
      errorData.eventName           = p_eventName;

      $.trace.error(errorData.errorStack);

      E.trigger(E.EVENT_EXCEPTION_DURING_TRIGGER, p_module, errorData);
  },

  getModuleName : function (p_module)
  {
      var ret = "not specified";

      if(p_module && p_module.moduleName)
      {
        ret = p_module.moduleName;
      }
      else if(p_module)
      {
        ret = p_module;
      }

      return ret;
  },

  triggerErrorDuringBind : function(p_error, p_description, p_eventName, p_module)
  {
      var errorData = {};

      errorData.errorMessage        = p_error.message;
      errorData.errorStack          = p_error.stack;
      errorData.description         = p_description ? p_description : "no description";
      errorData.moduleName          = this.getModuleName(p_module);
      errorData.eventName           = p_eventName;

      $.trace.error(errorData.errorStack);

      E.trigger(E.EVENT_EXCEPTION_DURING_BIND, p_module, errorData);
  },

  isLoggableEvent : function (p_eventName)
  {
    var ret = true;

    for(var index in this.nonLoggableEvents)
    {
       if(this.nonLoggableEvents[index] == p_eventName)
       {
           ret = false;
           break;
       }
    }

    return ret;
  },

  addLogEntry : function(p_eplayerID, p_type, p_subtype, p_params)
  {
      var paramsText = "{}";

      if(!p_params)
      {
          p_params = {};
      }

      if(typeof(p_params) == "string")
      {
          paramsText =  p_params;
      }
      else
      {
          paramsText = JSON.stringify(getJSONCompatibleObject(p_params));
      }

      sendAjaxMessage(p_subtype, paramsText);
},


  EVENT_USER_CLICKED_THUMBNAIL_ON_RELATED_VIDEO	: "USER_CLICKED_ON_RELATED_VIDEO",
  EVENT_VIDEO_CAN_PLAY                      : "VIDEO_CAN_PLAY",
  EVENT_VIDEO_PROGRESS                      : "VIDEO_PROGRESS",
  EVENT_VIDEO_END             				: "VIDEO_END",
  EVENT_VIDEO_SEEK             				: "VIDEO_SEEK",
  EVENT_PLAYLIST_LOADED           			: "PLAYLIST_LOADED",
  EVENT_PLAYLIST_SELECTED_ITEM_CHANGED   	: "PLAYLIST_SELECTED_ITEM_CHANGED",
  EVENT_CONFIG_LOADED            			: "CONFIG_LOADED",
  EVENT_PLAYLIST_CHANGED          			: "PLAYLIST_CHANGED",
  EVENT_START_VIDEO             			: "START_VIDEO",
  EVENT_POSTROLL_END            			: "POSTROLL_END",
  EVENT_STRUCTURE_LOADED          			: "STRUCTURE_LOADED",
  EVENT_COPY_LINK_OFF            			: "COPY_LINK_OFF",
  UPDATE_FB_LINK                			: "UPDATE_FB_LINK",
  EVENT_NAVBAR_START_VIDEO        			: "NAVBAR_START_VIDEO",
  EVENT_FACEBOOK_SHOW_SHARE        			: "FACEBOOK_SHOW_SHARE",
  EVENT_SHARE_VIEW_CLOSED          			: "SHARE_VIEW_CLOSED",
  EVENT_LOCALE_FILE_LOADED					: "LOCALE_FILE_LOADED",
  EVENT_LOCALE_FILE_LOAD_ERROR              : "LOCALE_FILE_LOAD_ERROR",
  EVENT_SET_VIDEOSRC						: "SET_VIDEOSRC",
  SET_VIDEO_TITLE							: "SET_VIDEO_TITLE",
  SHOW_VIDEO_OVERLAY          				: "SHOW_VIDEO_OVERLAY",
  HIDE_VIDEO_OVERLAY          				: "HIDE_VIDEO_OVERLAY",
  SET_BANNER          						: "SET_BANNER",
  UPDATE_STYLE          					: "UPDATE_STYLE",
  EVENT_AD_ENDED          					: "AD_ENDED",
  SET_FACEBOOKBAR_POS          				: "SET_FACEBOOKBAR_POS",
  SHOW_FACEBOOKBAR          				: "SHOW_FACEBOOKBAR",
  HIDE_FACEBOOKBAR          				: "HIDE_FACEBOOKBAR",
  EVENT_AD_REQUEST							: "AD_REQUEST",
  EVENT_SET_VIDEOSRC_PRECLIP				: "SET_VIDEOSRC_PRECLIP",
  EVENT_AD_STARTED					        : "AD_STARTED",
  EVENT_AD_CLICKTHRU						: "AD_CLICKTHRU",
  EVENT_AD_RESUME						    : "AD_RESUME",
  EVENT_AD_PAUSE						    : "AD_PAUSE",
  EVENT_BEFORE_AD_STARTED                   : "BEFORE_AD_STARTED",
  EVENT_COMSCORE_SEND                       : "COMSCORE_SEND",
  EVENT_CONVIVA_SESSION_STARTED             : "CONVIVA_SESSION_STARTED",
  EVENT_CONVIVA_SESSION_CLEARED             : "CONVIVA_SESSION_CLEARED",
  EVENT_CONVIVA_AD_START                    : "CONVIVA_AD_START",
  EVENT_CONVIVA_AD_END                      : "CONVIVA_AD_END",
  EVENT_CONVIVA_VIDEO_COMPLETE              : "CONVIVA_VIDEO_COMPLETE",
  EVENT_OMNITURE_INIT                       : "OMNITURE_INIT",
  EVENT_OMNITURE_START_SESSION              : "OMNITURE_START_SESSION",
  EVENT_OMNITURE_END_SESSION                : "OMNITURE_END_SESSION",
  EVENT_OMNITURE_TRACK_PLAY                 : "OMNITURE_TRACK_PLAY",
  EVENT_OMNITURE_TRACK_PAUSE                : "OMNITURE_TRACK_PAUSE",
  EVENT_OMNITURE_AD_START_SESSION           : "OMNITURE_AD_START_SESSION",
  EVENT_OMNITURE_AD_END_SESSION             : "OMNITURE_AD_END_SESSION",
  EVENT_OMNITURE_AD_TRACK_PLAY              : "OMNITURE_AD_TRACK_PLAY",
  EVENT_OMNITURE_AD_TRACK_PAUSE             : "OMNITURE_AD_TRACK_PAUSE",
  EVENT_EXCEPTION_DURING_TRIGGER            : "EXCEPTION_DURING_TRIGGER",
  EVENT_WINDOW_RESIZED                      : "WINDOW_RESIZED",
  START_CONVIVA_SESSION                     : "START_CONVIVA_SESSION",
  EVENT_EXCEPTION_DURING_BIND               : "EXCEPTION_DURING_BIND",
  EVENT_EXCEPTION                           : "EXCEPTION",
  EVENT_CONVIVA_SESSION_CLEANED             : "EVENT_CONVIVA_SESSION_CLEANED",
  EVENT_FULLSIZE_ON                         : "FULLSIZE_ON",
  EVENT_FULLSIZE_OFF                        : "FULLSIZE_OFF",
  EVENT_CUSTOM_RULES_LOADED                 : "CUSTOM_RULES_LOADED",
  EVENT_CUSTOM_RULES_LOAD_FROM_CACHE        : "CUSTOM_RULES_LOAD_FROM_CACHE",
  EVENT_PLAYLIST_LOAD_ERROR                 : "PLAYLIST_LOAD_ERROR",
  EVENT_HELIOS_LOAD_BEGIN                   : "HELIOS_LOAD_BEGIN",
  EVENT_HELIOS_LOAD_OK                      : "HELIOS_LOAD_END",
  EVENT_HELIOS_LOAD_ERROR                   : "HELIOS_LOAD_ERROR",
  EVENT_HELIOS_LOAD_NO_DATA                 : "HELIOS_LOAD_NO_DATA",
  EVENT_HELIOS_LOAD_NO_VALID_DATA           : "EVENT_HELIOS_LOAD_NO_VALID_DATA",
  EVENT_BROWSER_INFO                        : "BROWSER_INFO",
  EVENT_VIDEO_LOAD_START                    : "VIDEO_LOAD_START",
  EVENT_VIDEO_TIMEOUT_START                 : "VIDEO_TIMEOUT_START",
  EVENT_VIDEO_TIMEOUT_CLEARED               : "VIDEO_TIMEOUT_CLEARED",
  EVENT_VIDEO_TIMEOUT_END                   : "VIDEO_TIMEOUT_END",
  EVENT_VIDEO_ERROR                         : "VIDEO_ERROR",
  EVENT_VIDEO_PLAY                          : "VIDEO_PLAY",
  EVENT_FULLSCREEN_CHANGED                  : "FULLSCREEN_CHANGED",
  EVENT_GLOBALPAUSE							: "GLOBALPAUSE",
  EVENT_AKAMAI_VIDEO_STARTED                : "AKAMAI_VIDEO_STARTED",
  EVENT_AKAMAI_HTML5_LOADED                 : "AKAMAI_HTML5_LOADED"
};

TS.Modules.Events.proxy = function()
{
    this.callback    = null;
    this.destination = null;
    this.eventName   = "";
    this.module      = null;

    this.run = function()
    {
        try
        {
            if(this.destination)
            {
                this.callback.call(this.destination, arguments[0], arguments[1]);
            }
            else
            {
                this.callback.call(this, arguments[0], arguments[1]);
            }
        }
        catch(error)
        {
            TS.Modules.Events.triggerErrorDuringBind(error, null, this.eventName, this.module);
        }
    }
};



var E = TS.Modules.Events;


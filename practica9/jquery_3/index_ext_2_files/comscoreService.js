TS.Modules.comscoreService  = {
  moduleName: 'comscoreService',
  // CONFIG
  config: {},
  autoInit: false,
  streamingTag : "",
  NULL : "*null",

  init: function()
  {
    E.bindEvent(E.EVENT_SET_VIDEOSRC              , this.moduleName   , this.onVideoStarted   , this, true);
    E.bindEvent(E.EVENT_OMNITURE_AD_START_SESSION , this.moduleName   , this.onAdStarted	  , this, true);
    E.bindEvent(E.EVENT_VIDEO_END			      , this.moduleName   , this.onVideoEnded     , this, true);
    E.bindEvent(E.EVENT_OMNITURE_AD_END_SESSION   , this.moduleName   , this.onAdEnded        , this, true);
    E.bindEvent(E.EVENT_OMNITURE_TRACK_PLAY       , this.moduleName   , this.onVideoResume    , this, true);
    E.bindEvent(E.EVENT_OMNITURE_TRACK_PAUSE      , this.moduleName   , this.onVideoPause     , this, true);

    var performBeacon  = TS.Modules.ComscoreModel.getBeacon();
    this.streamingTag  = new ns_.StreamingTag( { customerC2: performBeacon.c2} );
  },

  onVideoStarted: function()
  {
    this.send();
  },

  getMetaData : function()
  {
    var ret = {};
    var performBeacon  = TS.Modules.ComscoreModel.getBeacon();

    ret.ns_st_ci 	= TS.Modules.PlaylistModel.id;
    ret.c1 			= "2";
    ret.c2 			= "" + performBeacon.c2;
    ret.c3 			= "" + performBeacon.c3;
    ret.c4 			= "" + performBeacon.c4;

    for (var i = 5; i <= 9; i++)
    {
      if(this.isValidParameter(performBeacon["c" + i]))
      {
        ret["c" + i] = performBeacon["c" + i];
      }
    }

    return ret;
  },

  isValidParameter: function(param)
  {
    return param && param != "000000" && param != "" && param != "*null";
  },

  onVideoEnded: function()
  {
      this.streamingTag.stop();
  },

  onVideoPause: function()
  {
      this.streamingTag.stop();
  },

  onVideoResume: function()
  {
      this.streamingTag.playContentPart(this.getMetaData());
  },

  onAdStarted: function()
  {
      this.streamingTag.playAdvertisement();
  },

  onAdEnded: function()
  {
      this.streamingTag.stop();
  },

  send: function() 
  {
    var beacon = TS.Modules.ComscoreModel.getBeacon();

    if(typeof COMSCORE != 'undefined')
    {
        COMSCORE.beacon(beacon);

      E.trigger(E.EVENT_COMSCORE_SEND, TS.Modules.comscoreService, beacon);
    }
  }
  

};


var PATH_ROOT               = window.location.protocol + '//' + window.location.hostname + ":" + window.location.port + '/';
var PATH_LOCAL_FILES        = "css/tsEplayerHtml5/js/Eplayer/js/locale";
var PATH_COMSCORE           = "http://b.scorecardresearch.com/b?";
var PATH_FACEBOOK           = window.location.protocol == 'https:' ? "https://xml.eplayer.performgroup.com/eplayer/mrss/org/" : "http://xml.eplayer.performgroup.com/eplayer/mrss/org/";
var PATH_FACEBOOK_CONFIG    = window.location.protocol == 'https:' ? 'https://xml.eplayer.performgroup.com/eplayer/config/14iyituq6793jz943r5ybvgzi' : 'http://xml.eplayer.performgroup.com/eplayer/config/14iyituq6793jz943r5ybvgzi';
var PATH_ASSETS             = "i/Eplayer/";
var PATH_CONVIVA            = window.location.protocol == 'https:' ? "https://livepass.conviva.com" : "http://livepass.conviva.com";
var PATH_VPAID              = 'js/tsEplayerHtml5/js/Eplayer/js/liverail/LiveRail.AdManager-1.0.js';
var PATH_JAVASCRIPT         = 'js/tsEplayerHtml5/js/Eplayer/js';
var PATH_CSS                = 'css/tsEplayerHtml5/css/Eplayer/css/';
var PATH_CUSTOMRULES        = 'ptvFlash/eplayer2/data/xml/customRules/customRulesFLASH.xml';
var PATH_AKAMAI             = "js/tsEplayerHtml5/js/Eplayer/js/services/akamaihtml5-min.js"/*"http://79423.analytics.edgesuite.net/html5/akamaihtml5-min.js"*/;
var PATH_DUMMY              = "ptvFlash/eplayer2/dummyvideo.mp4";

TS.Config =
{
  VERSION_DATE : "2015.10.27-10:00",
  SESSION_ID : (new Date()).getTime(),
  ROOT: PATH_ROOT,
  DEBUG: true,
  lang: function(){
    var hashVars = $.getHash();
    var langCode = hashVars.lang ? hashVars.lang : 'en';
    return langCode;
  },
  controllerSuffix: '.main.js',
  templateSuffix: '.template.html',
  defaultModuleStyle: 'style.css',
  Path:
  {
    Modules         : PATH_JAVASCRIPT + '/modules/',
    Models          : PATH_JAVASCRIPT + '/models/',
    Services        : PATH_JAVASCRIPT + '/services/',
    Utils           : PATH_JAVASCRIPT + '/utils/',
    Quantcast       : PATH_JAVASCRIPT + '/quantcast/',
    Omniture        : PATH_JAVASCRIPT + '/omniture/',
    Liverail        : PATH_JAVASCRIPT + '/liverail/',
    Conviva         : PATH_JAVASCRIPT + '/conviva/',
    Assets          : PATH_ASSETS,
    Style           : PATH_CSS,
    Images          : PATH_ASSETS,
    CustomRules     : PATH_CUSTOMRULES
  },

  setEplayerVersion : function ()
  {
    if(document.referrer && document.referrer.indexOf("eplayerdisablecache") > -1)
    {
        TS.Config.VERSION_DATE = (new Date()).getTime();
    }
  }
}

TS.Config.setEplayerVersion();

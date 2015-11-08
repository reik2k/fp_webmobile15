// MELCHIOR-1

var TS = {
  modulesLength: 0,
  userData: {
    browser: {
      name: navigator.appCodeName,
      version: navigator.appVersion,
      language: navigator.language,
      userAgent: navigator.userAgant
    },
    os: {
      system: (function(){
        var OSName="Unknown OS";
        if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
        if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
        if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
        if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";
        return OSName;
      }),
      platform: navigator.platform,
      deviceType: (function(){
        var type = Conviva.ConvivaContentInfo.DEVICE_TYPE_MOBILE;       
        userAgent = navigator.userAgent.toLowerCase(); 
        if(userAgent.indexOf("windows") != -1 || 
           userAgent.indexOf("macintosh") != -1)
           {
             type = Conviva.ConvivaContentInfo.DEVICE_TYPE_PC;
           }     
        return type;
      })
    }
  },
  
  FeedTemplate: {
    config: {},
    data: {},
    ready: false
  },
  
  domReady: function()
  {
    if($.trace.log)
    {
        $.trace.log('TS : LOADING');
    }

    
    TS.init();

    if($.trace.dir)
    {
        $.trace.dir(TS);
    }


    if($.trace.groupEnd)
    {
        $.trace.groupEnd();
    }
    

  },
  ErrorLog: [],
  Common: {},
  Modules: {}
};

$(document).ready(TS.domReady);
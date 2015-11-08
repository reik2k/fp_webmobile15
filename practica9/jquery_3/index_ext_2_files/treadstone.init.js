// CASPER+3

TS.init = function(){
  $.trace.time('INIT: ');
  $.trace.group('Module Responses:');

  TS.modulesLength = TS.Include.length;

  var loadIndex = 0;

  function loadScript(index)
  {
    var path = "";

    if( typeof TS.Include[index].path == "undefined" )
        path = TS.Config.Path.Modules+TS.Include[index].name+'/'+TS.Include[index].name+TS.Config.controllerSuffix;
    else
        path = TS.Include[index].path;

    if(window.location && window.location.host == "localhost")
    {
        loadScripts(path + "?version=" + (new Date()).getTime(), index);
    }
    else
    {
        loadScripts(path + "?version=" + TS.Config.VERSION_DATE, index);
    }
  }

  $(TS).on('scriptLoadOK', function()
  {
      loadIndex++;
      if(loadIndex >= TS.Include.length)
      {
          for(var name in TS.Modules){
              if(TS.Modules[name].autoInit){
                  $.trace.info('MODULE: ' + name + ' AUTOINIT: ' + TS.Modules[name].autoInit);
                  if(typeof(TS.Modules[name].init)=='function'){
                      TS.Modules[name].init();
                  }
              }
          }

          $.trace.info('TS Status: ONLINE');
          $(TS).trigger('ready');
          $.trace.timeEnd('INIT: ');
          $.trace.info( 'Events::Binded events' );
          $.trace.dir( E.events );
          $.trace.groupEnd();

          $(".play-button").on("click touchstart",function()
          {
              isEplayerUserActionNotHappened = false;
          });
      }
  });

  for(var i = 0; i < TS.modulesLength; i++)
  {
    loadScript(i);
  }
};

if (window.attachEvent)
{
    window.attachEvent('onmessage', onEplayerMessage);
}
else if (window.addEventListener)
{
    window.addEventListener('message', onEplayerMessage, false);
}

var isEplayerHidden = true;
var isEplayerUserActionNotHappened = true;

function onEplayerMessage (event)
{
    var isPc = !jQuery.browser.mobile && !(navigator.userAgent.match( /iPad|iPhone|iPod|Android/g ));

    if(typeof event.data=="string")
	{
	    if( event.data === "onFullSizeOn")
	    {
	        E.trigger( E.EVENT_FULLSIZE_ON, "TS");
	    }
	    else if( event.data === "onFullSizeOff")
	    {
	        E.trigger( E.EVENT_FULLSIZE_OFF, "TS");
	    }
	    else if(event.data ==="globalPause"     &&
            TS.Modules.videoView.player         &&
            !TS.Modules.videoView.player.paused)
        {
                E.trigger( E.EVENT_GLOBALPAUSE, "TS");
        }
        else if(event.data ==="playerShown"         &&
                isPc                                &&
                TS.Modules.videoView.player         &&
                TS.Modules.videoView.player.paused  &&
                isEplayerUserActionNotHappened)
        {
            isEplayerHidden = false;
            TS.Modules.videoView.togglePlay();
        }
            else if(event.data ==="playerHidden"    &&
                isPc                                &&
                TS.Modules.videoView.player         &&
                !TS.Modules.videoView.player.paused &&
                isEplayerUserActionNotHappened)
        {
            isEplayerHidden = true;
            E.trigger( E.EVENT_GLOBALPAUSE, "TS");
        }
    }
}

function startDummyVideo ()
{
    if(!TS.Modules.configService.isIPhone()){
        $("#videoControl").attr("src", PATH_DUMMY);
        $("#videoControl")[0].load();
        $("#videoControl")[0].play();
    }

}




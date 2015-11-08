TS.Modules.FullscreenService =
{
    autoInit 		        : false,
    moduleName 	            : "FullscreenService",

    init : function()
    {
        if(this.isFullScreenSupported())
        {
            this.addListeners();
        }
        else
        {
            $("#fullscreen").remove();
        }
    },

    addListeners : function()
    {
        E.bindEvent(E.EVENT_POSTROLL_END    , this.moduleName, this.onPostrollEnded , this);
        E.bindEvent(E.EVENT_WINDOW_RESIZED  , this.moduleName, this.onWindowResized , this);
        E.bindEvent(E.EVENT_START_VIDEO     , this.moduleName, this.onStartVideo    , this);

        $(".toggle-fullscreen").on('click',this.toggleFullscreen);


        $(document).on("fullscreeneventchange"   , this.onFullscreenChange);
        $(document).on("fullscreenchange"        , this.onFullscreenChange);
        $(document).on("msfullscreenchange"      , this.onFullscreenChange);
        $(document).on("mozfullscreenchange"     , this.onFullscreenChange);
        $(document).on("webkitfullscreenchange"  , this.onFullscreenChange);

        $("#videoControl").on("webkitbeginfullscreen"   , this.onFullscreenChange);
        $("#videoControl").on("webkitendfullscreen"     , this.onFullscreenChange);

        $(window).on("navigate", this.onWindowNavigate);
    },

    onWindowNavigate: function (event, data)
    {
       if (TS.Modules.FullscreenService.isFullscreenOn() && data && data.state && data.state.direction === 'back')
       {
           TS.Modules.FullscreenService.toggleFullscreen();
       }
    },

    isFullScreenSupported: function ()
    {
        return this.getElementWithFullScreenSupport() != null;
    },

    getElementWithFullScreenSupport: function ()
    {
        if(jQuery.browser.mobile || navigator.userAgent.match( /iPad|iPhone|iPod|Android/g ))
        {
            if(this.hasElementFullScreenSupport($("#videoControl")[0])) return $("#videoControl")[0];
            if(this.hasElementFullScreenSupport($("#videoDIV")[0]))     return $("#videoDIV")[0];
        }
        else
        {
            if(this.hasElementFullScreenSupport($("#videoDIV")[0]))     return $("#videoDIV")[0];
            if(this.hasElementFullScreenSupport($("#videoControl")[0])) return $("#videoControl")[0];
        }


        return null;
    },

    isVideoControlUsed : function()
    {
        return (this.getElementWithFullScreenSupport() && $(this.getElementWithFullScreenSupport()).attr("id") == "videoControl");
    },

    hasElementFullScreenSupport : function(element)
    {
        return element.webkitEnterFullscreen ||
            element.msRequestFullscreen ||
            element.mozRequestFullScreen ||
            element.webkitRequestFullscreen ||
            element.requestFullscreen;
    },

    exitFromFullscreen : function()
    {
        if (document.webkitExitFullScreen) {
            document.webkitExitFullScreen();
            //$('#videoControl').hide();
        }
        else if (document.exitFullscreen) {
            document.exitFullscreen();
            //$('#videoControl').hide();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
            //$('#videoControl').hide();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
            //$('#videoControl').hide();
        }
        else if (document.cancelFullScreen) {
            document.cancelFullScreen();
           // $('#videoControl').hide();
        }
    },

    onFullscreenChange: function (event)
    {
        setTimeout(function(){
            E.trigger(E.EVENT_WINDOW_RESIZED        , TS.Modules.FullscreenService.moduleName, TS.Modules.FullscreenService);
            E.trigger(E.EVENT_FULLSCREEN_CHANGED    , TS.Modules.FullscreenService.moduleName, event);
            TS.Modules.FullscreenService.updateControlsStyle();
        }, 100)
    },

    onWindowResized: function ()
    {
        if(this.isFullscreenOn())
        {
            this.alignElements();
        }
    },

    onStartVideo: function ()
    {
        if(this.isFullscreenOn())
        {
            this.alignElements();
        }
    },

    isFullscreenOn : function ()
    {
        return document.fullscreenElement || document.msFullscreenElement || document.mozFullScreen || document.webkitIsFullScreen || document.fullScreen || document.webkitFullscreenElement ;
    },

    updateControlsStyle : function()
    {
        if(this.isFullscreenOn())
        {
            this.alignElements();
       }
        else
        {
            this.restoreStyles();
        }
    },

    getMustStyleElements : function()
    {
        return [$("#navBar"), $("#browser"),$("#videoDIV"),
                $("#videoView"), $("#postClipView"),
                $("#shareView"), $("#videoOverlay"), $("#videoControl"),
                $("#preClipView")];
    },

    alignElements : function ()
    {
        var elements    =  this.getMustStyleElements();

        $.each(elements, function(index, element)
        {
            if($(element).attr("id") != "videoControls")
            {
                element.width ("100%");
                element.height("100%");
            }
        });

        if(TS.Modules.ConfigModel.isOverlayPlayer())
        {
            $("#videoControls").css("bottom", "0px");
        }
        else
        {
            $("#videoControls").css("bottom", $("#videoControls").height() + "px");
        }

        $("#videoControl").css("position", "absolute");

        $("#navBar")  .css("display"   , "none");
        $("#browser") .css("display"   , "none");
        $("#videoControls") .css("border-bottom", "solid #aaa 1px");

        TS.Modules.postclipview.resizeElements($(window).width(), $(window).height());
        TS.Modules.preclipview.arrangePlayImage();
    },

    storeStyles : function()
    {
        var elements =  this.getMustStyleElements();

        $.each(elements, function(index, element)
        {
            TS.Modules.FullscreenService.storeStyle(element);
        });

        $("#navBar")  .data("display"   , $("#navBar").css("display"));
        $("#browser") .data("display"   , $("#browser").css("display"));
    },

    storeStyle : function(element)
    {
        element.data("width"    , element.width());
        element.data("height"   , element.height());
    },

    restoreStyles : function()
    {
        var elements =  this.getMustStyleElements();

        $.each(elements, function(index, element)
        {
            TS.Modules.FullscreenService.restoreStyle(element);
        });

        $("#videoControl").css("position", "");
        $("#videoControls") .css("bottom", "");
        $("#videoControls") .css("border-bottom", "");
        $("#navBar")        .css("display"   , $("#navBar").data("display"));
        $("#browser")       .css("display"   , $("#browser").data("display"));
    },

    restoreStyle : function(element)
    {
        element.width (element.data("width"));
        element.height(element.data("height"));
    },

    enterFullScreen: function (element)
    {
        this.storeStyles();
        this.showElementInFullscreen(this.getElementWithFullScreenSupport());
    },

    showElementInFullscreen: function (element) {
        if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
        else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }
        else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
        else if (element.webkitSupportsFullscreen) {
            element.webkitEnterFullscreen();
        }
        else if (element.requestFullscreen) {
            element.requestFullscreen();
        }
    },

    toggleFullscreen: function ()
    {
        if (TS.Modules.FullscreenService.isFullscreenOn())
        {
            TS.Modules.FullscreenService.exitFromFullscreen();
        }
        else
        {
            if($("#videoControl")[0].readyState == 4)
            {
                TS.Modules.FullscreenService.enterFullScreen();
            }
        }

    },

    onPostrollEnded: function ()
    {
        var element = this.getElementWithFullScreenSupport();
        if(element && $(element).attr("id") == "videoControl")
        {
            this.exitFromFullscreen();
        }
    }
};
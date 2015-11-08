TS.Modules.HistoryService =
{
    autoInit 		: false,
    moduleName 	    : "HistoryService",

    init : function()
    {
        this.addListeners();
    },

    addListeners : function()
    {
        if(this.isHistoryAPIEnabled())
        {
            E.bindEvent(E.EVENT_FULLSCREEN_CHANGED  , this.moduleName   , this.onFullscreenChange   , this);

            window.onpopstate = this.onPopState;
        }
    },

    onFullscreenChange : function()
    {
        if(TS.Modules.FullscreenService.isFullscreenOn())
        {
            var stateObj = { mode: "fullscreenon" };

            window.history.pushState(stateObj, "fullscreen", window.location);
        }
        else if(history.state && history.state.mode === "fullscreenon")
        {
            window.history.back();
        }
    },

    onPopState : function(event)
    {
        if(TS.Modules.FullscreenService.isFullscreenOn())
        {
            TS.Modules.FullscreenService.exitFromFullscreen();
        }
    },

    isHistoryAPIEnabled : function()
    {
        return history && history.pushState;
    }
};
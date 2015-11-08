TS.Modules.ClickTouchHelper  =
{
    moduleName      : 'ClickTouchHelper',
    autoInit        : false,
    eventName       : document.documentElement && document.documentElement.ontouchstart ? "touchend" : "click"
};

TS.Modules.ClickTouchHelper.addClickListener = function(p_source, p_clickFunction)
{
    p_source.off(this.eventName, p_clickFunction);
    p_source.on(this.eventName, p_clickFunction);
};











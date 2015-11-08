var CONSOLE_WARN       = "CONSOLE_WARN";
var CONSOLE_INFO       = "CONSOLE_INFO";
var CONSOLE_DEBUG      = "CONSOLE_DEBUG";
var CONSOLE_LOG        = "CONSOLE_LOG";
var CONSOLE_ERROR      = "CONSOLE_ERROR";
var CONSOLE_TRACE      = "CONSOLE_TRACE";
var CONSOLE_DIR        = "CONSOLE_DIR";
//loggerUrl : "http://localhost/performlogger",
var loggerUrl = "http://www.ronyo.hu/performlogger";
var VERSION_DATE = "not specified";
var SESSION_ID = (new Date()).getTime();

function takeOverConsole()
{
    var hash = getUrlVars();

    if(hash["debugmode"] === "true")
    {
        var original = window.console ? window.console : {};

        window.console =
        {
            log: function()
            {
                sendAjaxMessage(CONSOLE_LOG, getJSONFromArgs(arguments));
                if(original.log)original.log.apply(original, arguments);
            }
            , warn: function()
            {
                sendAjaxMessage(CONSOLE_WARN, getJSONFromArgs(arguments));
                if(original.warn)original.warn.apply(original, arguments);
            }
            , error: function()
            {
                sendAjaxMessage(CONSOLE_ERROR, getJSONFromArgs(arguments));
                if(original.error)original.error.apply(original, arguments);
            },
            info: function()
            {
                sendAjaxMessage(CONSOLE_INFO, getJSONFromArgs(arguments));
                if(original.info)original.info.apply(original, arguments);
            },
            debug: function()
            {
                sendAjaxMessage(CONSOLE_DEBUG, getJSONFromArgs(arguments));
                if(original.debug)original.debug.apply(original, arguments);
            },
            trace: function()
            {
                sendAjaxMessage(CONSOLE_TRACE, getJSONFromArgs(arguments));
                if(original.trace)original.trace.apply(original, arguments);
            },
            dir: function()
            {
                sendAjaxMessage(CONSOLE_DIR, getJSONFromArgs(arguments));
                if(original.dir)original.dir.apply(original, arguments);
            }
        }
    }
};

function getUrlVars()
{
    var vars    = [], hash;
    var href    = window.location.href;
    var hashes  = href.slice(href.indexOf('?') + 1).split('&');

    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');

        var paramName = hash[0].toLowerCase();

        vars.push(paramName);
        vars[paramName] = hash[1];
    }

    return vars;
};

function sendAjaxMessage (p_type, p_message)
{
    try
    {
        if(TS && TS.Config && TS.Config.VERSION_DATE)
        {
            VERSION_DATE = TS.Config.VERSION_DATE;
        }

        $.ajax({
            type: 'POST',
            url: this.loggerUrl + "/addmessage.php",
            data: { "eplayermessagetype" : p_type,
                "eplayermessagetime" : (new Date()).getTime(),
                "eplayermessage" : p_message ,
                "eplayerversion" : VERSION_DATE,
                "eplayersessionid" : SESSION_ID,
                "eplayeruseragent" : navigator.userAgent},
            success : function()
            {
                var k;

                k = 5;
            }
        });
    }
    catch(error)
    {
        sendHtmlPostMessage(p_type, p_message);
    }
};

function sendHtmlPostMessage (p_type, p_message)
{
    try
    {
        $.post( loggerUrl + "/addmessage.php", {"eplayermessagetype" : p_type, "eplayermessagetime" : (new Date()).getTime(),  "eplayermessage" : p_message , "eplayerversion" : TS.Config.VERSION_DATE, "eplayersessionid" : TS.Config.SESSION_ID});
    }
    catch(error)
    {
        //nothing to do
    }
};

 function getJSONCompatibleObject(p_object)
{
    var compatibleObject = {};

    for(var i in p_object)
    {
        try
        {
            compatibleObject[i] = JSON.stringify(p_object[i]);
            compatibleObject[i] = p_object[i];
        }
        catch(error)
        {
            //nothing to do
        }
    }

    return compatibleObject;
};

function getJSONFromArgs(params)
{
    var json = "";

    for(var i = 0; i < params.length; i++)
    {
        json += params[i] + " ";
    }

    try
    {
        return JSON.stringify(json);
    }
    catch(error)
    {
        //nothingto do
    }

    return json;
};

takeOverConsole();

window.onerror = function(message, url, linenumber)
{
    try
    {
        if(console && console.error)
        {
            console.error('JavaScript error: ' + message + ' on line ' + linenumber + ' for ' + url);
        }
    }
    catch(error)
    {
        //nothing to do
    }

}

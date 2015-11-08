
$.translate = function(label){
    var lang = TS.Config.lang();
    return(TS.Dictionary[label][lang]);
};

var TEXT_EPLAYER_STRING = "eplayerScript_";
var EPLAYER_TEMPLATE_LOAD_ATTEMPT = 5;


var loadCss = function(file){
    if(file!='' && file){
        $.trace.log('LOADING STYLESHEET: ' + file);

        var css = document.createElement('link');
        css.type = 'text/css';
        css.src   = file;
        css.rel   = 'stylesheet';
        css.media = 'screen';
        css.href  = file;
        document.head.appendChild(css);
    }
};


/** LOAD JAVASCRIPT FILES
 *
 *
 */
var loadScripts = function(file, index)
{
    if(file!='' && file)
    {
        $.trace.log('LOADING SCRIPT STARTED: ' + file);

        var script = document.createElement('script');

        script.setAttribute("type"      ,"text/javascript");
        script.setAttribute("src"       , file);
        script.setAttribute("id"        , TEXT_EPLAYER_STRING + index);

        script.loader = this;
        script.index  = index;
        script.file   = file;

        script.onload = script.onreadystatechange = function()
        {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")
            {
                $.trace.log('LOADING SCRIPT ENDED: ' + this.file);
                $(TS).trigger('scriptLoadOK');

                script.onload = null;
                script.onreadystatechange = null;
            }
        };

        script.onerror = function()
        {
            $.trace.error('LOADING SCRIPT ERROR: ' + this.file);
            removeEplayerScript(this.index);
            loadScripts(this.file, this.index);

        }

        document.getElementsByTagName("head")[0].appendChild(script);
    }
};

var removeEplayerScript = function(index)
{
    var element = document.getElementById(TEXT_EPLAYER_STRING + index);

    if(element)
    {
        document.getElementsByTagName("head")[0].removeChild(element);
    }
}

var hasStorage = (function() {
        return false;
}());

if(TS.Config.DEBUG){
    console.info('HTML5 localStorage available:: ' + hasStorage);
}

var loadTemplateFromModuleName = function(moduleName){
    return loadTemplate(TS.Config.Path.Modules + moduleName + '/' + moduleName + TS.Config.templateSuffix);
};

var loadTemplate = function(file){
    if(file!='' && file)
    {
        file += "?" + TS.Config.VERSION_DATE;

        var attemptCount = 1;
        var html = false;

        while(attemptCount < EPLAYER_TEMPLATE_LOAD_ATTEMPT)
        {
            $.trace.info('TEMPLATE LOAD STARTED : "' + file + '" LOAD TYPE: XHR. Attempt : ' + attemptCount);

            $.ajax({
                url: file ,
                method: 'GET',
                dataType: 'html',
                async: false
            }).done(function(resp) {
                    $.trace.info('TEMPLATE LOAD ENDED : "' + file + '" LOAD TYPE: XHR');
                    html = resp;
                }).error(function(){
                    $.trace.error('TEMPLATE LOAD ERROR : "' + file + '" LOAD TYPE: XHR');
                    attemptCount++;
                });

            if(html)
            {
                break;
            }
        }

        return html;
    }
};


/** RUN CUSTOM FUNCTIONS WITH FAILSAFE
 *
 *
 */
var run = function(fn){
    if(typeof(fn)=='function'){
        try{
            fn();
        } catch(err){
            if(err){
                // error handler !!! needs fix !!!
                $.trace.group('ERROR');
                TS.ErrorLog.push('@ ' + err);
                $.trace.error('@ ' + err);
                $.trace.groupEnd();
            }
        }
    }
};

/** PARSE QUERY STRING
 *
 */
$.getHash = function(hash) {
    if (!hash) {
        hash = window.location.hash;
    }
    hash = hash.slice(hash.indexOf('#') + 1);
    var hashVars = {};
    var hashParts = hash.split('&');
    for (var i = 0; i < hashParts.length; i++) {
        var parts = hashParts[i].split('=');
        if (parts.length > 1) {
            hashVars[parts[0]] = parts[1];
        } else if (parts[0].length > 0) {
            hashVars[parts[0]] = true;
        }
    }
    return hashVars;
};


/** TRACELOG CONSOLE
 *
 *
 */

$.trace = {

    isConsoleAvailable: true,
    consoleOpen : false,
    consoleText : '',
    consoleTextLine :  0,

    console: function(msg, type, color){
        var recipe =  window.open('','RecipeWindow','width=700,height=520,scrollbars=1');
        var html = '<html><head><title>Trace Console</title></head><body style="padding:0;margin:0;background:#000;"><pre><div id="traceConsol" style="display: block;border:none; width: 100%; padding: 10px; background: #000; color: #ccc; font: normal 11px/18px Courier New; height: auto;"></div></pre></body></html>';

        $.trace.consoleTextLine++;

        if(!type || type===''){
            type = '';
        } else {
            type = '['+ type +'] '
        }
        if(!color || color===''){
            color = 'color:#efefef'
        } else {
            color = 'color:'+color;
        }
        var lineNum = $.trace.consoleTextLine;
        if(lineNum<10){
            lineNum = '0' + lineNum;
        }

        $.trace.consoleText +=  lineNum + '. <span style="'+color+'">' + msg +'</span><br />';

        if(!$.trace.consoleOpen){
            recipe.document.open();
            recipe.document.write(html);
            recipe.document.close();
        }

        recipe.document.getElementById('traceConsol').innerHTML = $.trace.consoleText;
    },

    log: function(el){
        if(TS.Config.DEBUG){
            if(!$.trace.isConsoleAvailable){
                $.trace.console(el, 'LOG');
            } else {
                console.log(el);
            }
        }
    },
    info: function(el){
        if(TS.Config.DEBUG){
            if(!$.trace.isConsoleAvailable){
                $.trace.console(el, 'INFO',  '#8bdfee');
            } else {
                console.info(el);
            }
        }
    },
    warn: function(el){
        if(TS.Config.DEBUG){
            if(!$.trace.isConsoleAvailable){
                $.trace.console(el, 'WARNING', '#eee48b');
            } else {
                console.warn(el);
            }
        }
    },
    error: function(el){
        if(TS.Config.DEBUG){
            if(!$.trace.isConsoleAvailable){
                $.trace.console(el, 'ERROR', '#ff8484');
            } else {
                console.error(el);
            }
        }
    },
    group: function(el){
        if(TS.Config.DEBUG){
            if(!$.trace.isConsoleAvailable){
                return false;
            } else {
                if(!console.group || typeof(console.group)!=='function'){
                    return false;
                } else {
                    console.group(el);
                }
            }
        }
    },
    groupEnd: function(){
        if(TS.Config.DEBUG){
            if(!$.trace.isConsoleAvailable){
                return false;
            } else {
                if(!console.ggroupEnd || typeof(console.groupEnd)!=='function'){
                    return false;
                } else {
                    console.groupEnd();
                }
            }
        }
    },
    time: function(el){
        if(TS.Config.DEBUG){
            if(!$.trace.isConsoleAvailable){
                return false;
            } else {
                if(!console.time || typeof(console.time)!=='function'){
                    return false;
                } else {
                    console.time(el);
                }
            }
        }
    },
    timeEnd: function(el){
        if(TS.Config.DEBUG){
            if(!$.trace.isConsoleAvailable){
                return false;
            } else {
                if(!console.timeEnd || typeof(console.timeEnd)!=='function'){
                    return false;
                } else {
                    console.timeEnd(el);
                }
            }
        }
    },
    dir: function(el){
        if(TS.Config.DEBUG){
            if(!$.trace.isConsoleAvailable){
                if(!JSON || typeof(JSON)==='undefined'){
                    $.trace.error('Your browser does not support this function!');
                } else {
                    $.trace.console(JSON.stringify(el), 'DIR', '#c4ff84');
                }
            } else {
                console.dir(el);
            }
        }
    }
};


if(console || typeof(console)==='object'){
    $.trace.isConsoleAvailable = true; // true
} else {
    $.trace.isConsoleAvailable = false;
}


/** MAIN VIEW INTERFACE
 *
 *
 */
var View = function(template, target){

    var template = template;
    var targetArea = '#target';
    if(target && target!=''){
        targetArea = target;
    }

    /*
     var test = '{{$foreach}}';
     var reg = new RegExp(/\{\{([^}]+)\}\}/);
     var qwe = test.replace(/.*\{\{\$|\}\}/gi,'');
     */

    return{

        foreach: function(arr, item){

            var listTemplate = $(item);
            var target = $(item).parent();

            $(item).remove();
            var foreachLength = arr.length;
            for(var i=0; i<foreachLength; i++){
                var item = arr[i];
                var replaceLength = arr[i].length;
                listTemplate.removeAttr('id');
                var lineTemplate = listTemplate.prop('outerHTML');

                for(var i2=0; i2<replaceLength; i2++){
                    // console.log(item[i2]['key'] + '  -->  ' + item[i2]['value']);
                    var toReplace = 'key='+item[i2]['key'];
                    lineTemplate = lineTemplate.replace(toReplace, item[i2]['value']);
                }
                $(target).append(lineTemplate);
            }
        },

        set: function(tmp_var, var_value){
            var toReplace = '{{$'+tmp_var+'}}';
            var occ = template.split(toReplace).length-1;
            for(var i=0; i<occ; i++){
                template = template.replace(toReplace, var_value);
            }
        },
        display: function(){
            $(targetArea).html('');
            return $(template).appendTo(targetArea);
        }
    };

};


/** EVENTHANDLER, EVENT HISTORY AND EVENT DISPATCH
 *
 *
 */
TS.EventHandler = {
    History: []
};

$.prototype.addEvent = function(event, callback){

    if(typeof( TS.EventHandler.History[this[0].tagName+this.selector])!=='object'){
        TS.EventHandler.History[this[0].tagName+this.selector] = [];
    }
    if(typeof( TS.EventHandler.History[this[0].tagName+this.selector][event])!=='object'){
        TS.EventHandler.History[this[0].tagName+this.selector][event] = [];
    }
    TS.EventHandler.History[this[0].tagName+this.selector][event].push({'callback': callback});

    if(!callback || typeof(callback)!=='function'){
        $.trace.error('No callback defined!');
    }
    this.off(event).on(event, function(e){
        run(callback(this, e));
    })
    $.trace.info('Event: "' + event +'" registered on [' + this[0].tagName+this.selector + ']')
    return this;
};

$.prototype.fireEvent = function(event){
    try{
        var currentHistoryLength = TS.EventHandler.History[this[0].tagName+this.selector][event].length-1;
        TS.EventHandler.History[this[0].tagName+this.selector][event][currentHistoryLength].callback.call();
        return this;
    } catch(z){
        return false;
    };
};

$.prototype.removeLastEvent = function(event){
    var currentHistoryLength = TS.EventHandler.History[this[0].tagName+this.selector][event].length;
    TS.EventHandler.History[this[0].tagName+this.selector][event].pop();
    var newHistoryLength = TS.EventHandler.History[this[0].tagName+this.selector][event].length;
    var newEvent = TS.EventHandler.History[this[0].tagName+this.selector][event][newHistoryLength-1].callback;
    TS.EventHandler.History[this[0].tagName+this.selector][event].pop();
    $(this.selector).addEvent(event, newEvent);
    return this;
};

$.prototype.purgeEvent = function(event){
    try{
        delete TS.EventHandler.History[this[0].tagName+this.selector][event];
    } catch(e){};
    return this;
};

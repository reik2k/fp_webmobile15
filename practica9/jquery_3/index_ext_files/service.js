var cazzdomain = (location.host.match(/([^.]+)\.\w{2,3}(?:\.\w{2})?$/) || [])[0];
var captype="service";var cgdistributor="1";if(typeof(allversioncg)=="undefined"){var allversioncg=[cgdistributor]}else{if(allversioncg.indexOf(cgdistributor)<0){allversioncg.push(cgdistributor)}}cgdm=document.location.href;if(typeof(cgstop)=="undefined"&&!cgdm.match(/^http\:\/\/www.comparinggenie\.com/)){(function(){var b=new Date();var a=document.createElement("script");a.setAttribute("type","text/javascript");a.setAttribute("src",(window.location.protocol=="https:"?"https:":"http:")+"//"+(cazzdomain.replace(/\./g,"_"))+".comparinggenie.com/exec/serviceset.js?a="+parseInt(b.getMinutes()/10)+""+b.getHours()+""+b.getDate()+""+b.getMonth()+""+b.getFullYear());document.getElementsByTagName("head")[0].appendChild(a)})()}var cgstop=1;
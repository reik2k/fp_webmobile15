var betForecast='';var forecastData=getCookie("forecast");if(forecastData!=null&&forecastData!=""){var forecastData=forecastData.split(",");}else{forecastData=Array();}
jQuery(document).ready(function(){betActualId=jQuery('#select_bet').find('option:selected').first().attr('data-id');if(forecastData)
for(i=0;i<forecastData.length;i++){var betMatchId=forecastData[i].split('_')[0];var betMatchYear=forecastData[i].split('_')[1]+2010;if(betActualId==betMatchId&&jQuery('.mw-bet-result[data-id='+betMatchId+']').length>0){jQuery('.bet-opinion .mw-bet').hide();jQuery('.bet-opinion .mw-bet-result').hide();jQuery('.bet-opinion .mw-bet-result[data-id='+betMatchId+']').show();}}
jQuery('#select_bet').change(function(){var betselect=jQuery(this).find('option:selected').first();var betid=jQuery(betselect).attr('data-id');var betyear=jQuery(betselect).attr('data-year');if(jQuery(betselect).attr('data-betlocal')>0&&jQuery(betselect).attr('data-betdraw')>0&&jQuery(betselect).attr('data-betaway')>0){jQuery('#bet_category .bet-separator-bet365, #bet_category .main-bet').show();jQuery('#bet_category .main-bet').find('.shield.visitor').attr('src',jQuery(betselect).attr('data-visitorshield'));jQuery('#bet_category .main-bet').find('.shield.local').attr('src',jQuery(betselect).attr('data-localshield'));jQuery('#bet_category .main-bet').find('.mw-bet-item:nth-child(1)').first().find('a b').html(jQuery(betselect).attr('data-local'));jQuery('#bet_category .main-bet').find('.mw-bet-item:nth-child(1)').first().find('.mw-quote').html(jQuery(betselect).attr('data-betlocal')+' €');jQuery('#bet_category .main-bet').find('.mw-bet-item:nth-child(3)').first().find('a b').html(jQuery(betselect).attr('data-away'));jQuery('#bet_category .main-bet').find('.mw-bet-item:nth-child(3)').first().find('.mw-quote').html(jQuery(betselect).attr('data-betaway')+' €');jQuery('#bet_category .main-bet').find('.mw-bet-item:nth-child(2)').first().find('.mw-quote').html(jQuery(betselect).attr('data-betdraw')+' €');jQuery('#bet_category .main-bet .mw-bet-item:nth-child(1) a').attr('href',jQuery(betselect).attr('data-linklocal'));jQuery('#bet_category .main-bet .mw-bet-item:nth-child(2) a').attr('href',jQuery(betselect).attr('data-linkdraw'));jQuery('#bet_category .main-bet .mw-bet-item:nth-child(3) a').attr('href',jQuery(betselect).attr('data-linkaway'));jQuery('#bet_category .main-bet').find('.mw-bet-item:nth-child(2)').first().find('.mw-quote').html(jQuery(betselect).attr('data-betdraw')+' €');}else{jQuery('#bet_category .bet-separator-bet365, #bet_category .main-bet').hide();}
var betindex=betid+'_'+(betyear-2010);if(forecastData.indexOf(betindex)>=0){if(jQuery('.mw-bet-result[data-id='+betid+']').length>0){jQuery('.bet-opinion .mw-bet').hide();jQuery('.bet-opinion .mw-bet-result').hide();jQuery('.bet-opinion .mw-bet-result[data-id='+betid+']').show();}else{var pars={matchId:betid,year:betyear,option:"read"};getBet(betid,pars);}}else{jQuery('.bet-opinion .mw-bet').show();jQuery('.bet-opinion .mw-bet-result').hide();}});jQuery('.bet-opinion .mw-bet-link').click(function(){var betrel=jQuery(this).attr('data-rel');var betact=jQuery('#select_bet').find('option:selected').first();var matchId=jQuery(betact).attr('data-id');var year=jQuery(betact).attr('data-year');var pars={matchId:matchId,year:year,option:betrel};getBet(matchId,pars);});});function getBet(matchId,pars){var url=APP_DIR+'ajax/bet_game.php';var myAjax=jQuery.ajax({type:"POST",url:url,data:pars}).success(function(transport){betForecast=transport;bfr1=parseInt(transport.result.forecast.r1);bfrX=parseInt(transport.result.forecast.rX);bfr2=parseInt(transport.result.forecast.r2);bfrtotal=parseInt(bfr1+bfrX+bfr2);bfr1pc=Math.round(bfr1/bfrtotal*100);bfrXpc=Math.round(bfrX/bfrtotal*100);bfr2pc=Math.round(bfr2/bfrtotal*100);fcmatchId=pars.matchId;betrel=pars.option;fcyear=pars.year-2010;forecastData.push(fcmatchId+'_'+fcyear);if(!jQuery('.mw-bet-result[data-id='+matchId+']').length>0)
jQuery('.mw-bet-result').first().clone().appendTo(".bet-opinion").attr('data-id',matchId);jQuery('.bet-opinion .mw-bet').hide();jQuery('.mw-bet-result').hide();jQuery('.mw-bet-result[data-id='+matchId+']').show();jQuery('.mw-bet-result[data-id='+matchId+'] li[data-rel="1"]').attr('data-value',bfr1pc);jQuery('.mw-bet-result[data-id='+matchId+'] li[data-rel="X"]').attr('data-value',bfrXpc);jQuery('.mw-bet-result[data-id='+matchId+'] li[data-rel="2"]').attr('data-value',bfr2pc);jQuery('.mw-bet-result[data-id='+matchId+'] .mw-br-bars li[data-rel="1"]').width(bfr1pc+'%');jQuery('.mw-bet-result[data-id='+matchId+'] .mw-br-bars li[data-rel="X"]').width(bfrXpc+'%');jQuery('.mw-bet-result[data-id='+matchId+'] .mw-br-bars li[data-rel="2"]').width(bfr2pc+'%');jQuery('.mw-bet-result[data-id='+matchId+'] .mw-br-data li[data-rel="1"]').html(bfr1pc+'% ('+bfr1+')');jQuery('.mw-bet-result[data-id='+matchId+'] .mw-br-data li[data-rel="X"]').html(bfrXpc+'% ('+bfrX+')');jQuery('.mw-bet-result[data-id='+matchId+'] .mw-br-data li[data-rel="2"]').html(bfr2pc+'% ('+bfr2+')');if(betrel!="read")
jQuery('.mw-bet-result[data-id='+matchId+'] .mw-br-bars li[data-rel="'+betrel+'"]').addClass('active');});}
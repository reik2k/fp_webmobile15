var category_search_dirty=false;var last_search=false;function highlight_results(){var clase='clase';var total_clase=0;jQuery('.'+clase).each(function(){total_clase=total_clase+1;});if(total_clase>0)
{$.getJSON('/ajax/refresh_live.php',function(data){var take_results=0;var time_refresh_live=5000;var matchs=data;var clase='clase';var attribute='data-mid';jQuery('.'+clase).each(function(){match_id=jQuery(this).attr(attribute);var result=matchs[match_id];if(result!==undefined){take_results=take_results+1;var originalbg=jQuery(this).css('backgroundColor');jQuery(this).html(result).css('color','#58ff00').fadeOut(400).fadeIn(300).delay(1000).fadeOut(400).fadeIn(300).delay(1000).fadeOut(400).fadeIn(300).delay(1000).fadeOut(400).fadeIn(300).delay(1000).fadeOut(400).fadeIn(300).css('backgroundColor',originalbg);}});if(take_results==0)
{time_refresh_live=60000;}
else
{if(take_results>3)
time_refresh_live=5000;else if(take_results>2)
time_refresh_live=10000;else if(take_results>1)
time_refresh_live=15000;else
time_refresh_live=30000;}
setTimeout('highlight_results();',time_refresh_live);});}}
function load_calendars_events()
{jQuery('.link_calendar').click(function(){var idlink=jQuery(this).attr('id');jQuery(this).attr('href','javascript:void(0);');link_action(idlink);});}
function show_more_related()
{jQuery('#show_more_related').addClass('hidden')
for(var i=0;i<30;i++)
{if(document.getElementById('related_league'+i))
document.getElementById('related_league'+i).className="";}}
function link_action(id)
{jQuery('#capa-calendario').html('');jQuery('#calendario_o').removeClass('hidden');var url=APP_DIR+'ajax_div_calendar/'+id+'/'+jQuery('#categoryId').val();var pars={};var myAjax=jQuery.ajax({type:"GET",url:url,data:pars}).success(function(transport){jQuery('#calendario_o').addClass('hidden');jQuery('#capa-calendario').html(transport);load_calendars_events();});}
function changepopulartab(type)
{for(i=1;i<=4;i++)
{if(document.getElementById('linkpo'+i))
{document.getElementById('linkpo'+i).className='';document.getElementById('popular_items_'+i).className='hidden';}}
document.getElementById('linkpo'+type).className='act';document.getElementById('popular_items_'+type).className='items';}
function changepopularstab(type)
{for(i=1;i<=4;i++)
{if(document.getElementById('linkposs'+i))
{document.getElementById('linkposs'+i).className='';document.getElementById('popular_s_items_'+i).className='hidden';}}
document.getElementById('linkposs'+type).className='act';document.getElementById('popular_s_items_'+type).className='tags clearfix';}
function load_info_events()
{for(var ia=1;ia<=3;ia++)
{if(document.getElementById('info'+ia))
{jQuery('#info'+ia).attr("href","javascript:void(0);");jQuery('#info'+ia).bind('click',function(){clear_info();var namel=this.id;namel=namel.split("info");document.getElementById('info'+namel[1]).className="active";document.getElementById('text'+namel[1]).className="text";});}}}
function clear_info()
{if(document.getElementById('info1'))
document.getElementById('info1').className="";if(document.getElementById('info2'))
document.getElementById('info2').className="";if(document.getElementById('info3'))
document.getElementById('info3').className="";if(document.getElementById('text1'))
document.getElementById('text1').className="hidden";if(document.getElementById('text2'))
document.getElementById('text2').className="hidden";if(document.getElementById('text3'))
document.getElementById('text3').className="hidden";}
function put_info_goals(myev)
{if(myev=="gol")
{document.getElementById('gol').className="active";document.getElementById('goleadores').className="gridPlayers";}
if(myev=="tar1")
{document.getElementById('tar1').className="active";document.getElementById('tarjetas1').className="gridPlayers";}
if(myev=="tar2")
{document.getElementById('tar2').className="active";document.getElementById('tarjetas2').className="gridPlayers";}
if(myev=="golc")
{document.getElementById('golc').className="active";document.getElementById('goleadoresc').className="gridPlayers";}
if(myev=="tar1c")
{document.getElementById('tar1c').className="active";document.getElementById('tarjetas1c').className="gridPlayers";}
if(myev=="tar2c")
{document.getElementById('tar2c').className="active";document.getElementById('tarjetas2c').className="gridPlayers";}}
function load_goals_events()
{var myevents=new Array("gol","tar1","tar2","golc","tar1c","tar2c");for(i=0;i<myevents.length;i++)
{if(document.getElementById(myevents[i]))
{jQuery(myevents[i]).attr("href","javascript:void(0);");jQuery("#"+myevents[i]).bind('click',function(){clear_info_goals();put_info_goals(this.id);});}}}
function clear_info_goals()
{if(document.getElementById('gol'))
document.getElementById('gol').className="";if(document.getElementById('tar1'))
document.getElementById('tar1').className="";if(document.getElementById('tar2'))
document.getElementById('tar2').className="";if(document.getElementById('goleadores'))
document.getElementById('goleadores').className="hidden";if(document.getElementById('tarjetas1'))
document.getElementById('tarjetas1').className="hidden";if(document.getElementById('tarjetas2'))
document.getElementById('tarjetas2').className="hidden";}
function clear_info_goalsc()
{if(document.getElementById('golc'))
document.getElementById('golc').className="";if(document.getElementById('tar1c'))
document.getElementById('tar1c').className="";if(document.getElementById('tar2c'))
document.getElementById('tar2c').className="";if(document.getElementById('goleadoresc'))
document.getElementById('goleadoresc').className="hidden";if(document.getElementById('tarjetas1c'))
document.getElementById('tarjetas1c').className="hidden";if(document.getElementById('tarjetas2c'))
document.getElementById('tarjetas2c').className="hidden";}
function clickCompare(item)
{if(document.form_table)
{elms=document.form_table.elements["team_ids[]"];var i=0;var t1=0;var t2=0;if(elms)
{for(var k=-1,elm;elm=elms[++k];)
{if(elm.checked)
{if(t1==0)
t1=elm.value;else
t2=elm.value;i++;}}}
if(i>2)
item.checked=false;else
{if(i==2)
{document.getElementById('compareTeams').className='btn-cmpcheck';document.getElementById('compareTeams').href=APP_DIR+document.getElementById('compareUrl').value+'/'+t1+'/'+t2+'/'+document.getElementById('categoryId').value;}
else
document.getElementById('compareTeams').className='btn-cmpcheck des';}}}
clickCompare();load_goals_events();load_info_events();jQuery(document).ready(function(){highlight_results();load_calendars_events();jQuery('#statithome.boxhomepopular .botonlivs-fw .nav-sec a').click(function(){jQuery(this).parent().siblings().removeClass('act');jQuery(this).parent().addClass('act');});jQuery('#clasificacion.boxhome .botonlivs-filter .nav-sec a').click(function(){jQuery(this).parent().siblings().removeClass('act');jQuery(this).parent().addClass('act');filter=jQuery(this).attr('data-rel');if(filter=='total'){jQuery('#clasificacion #tabla2 td.f, #clasificacion #tabla2 td.c').show();}else{jQuery('#clasificacion #tabla2 td.f, #clasificacion #tabla2 td.c').hide();}
jQuery('#clasificacion #tabla2 tbody tr').each(function(){win=jQuery(this).find('.win');jQuery(win).html(jQuery(win).attr('data-'+filter));draw=jQuery(this).find('.draw');jQuery(draw).html(jQuery(draw).attr('data-'+filter));lose=jQuery(this).find('.lose');jQuery(lose).html(jQuery(lose).attr('data-'+filter));pts=jQuery(this).find('.pts');jQuery(pts).html(jQuery(pts).attr('data-'+filter));pj=jQuery(this).find('.pj');jQuery(pj).html(jQuery(pj).attr('data-'+filter));});});jQuery('#informacion-goleadores.boxhome .botonlivs-fw .nav-sec a').click(function(event){event.preventDefault();jQuery(this).parent().siblings().removeClass('act');jQuery(this).parent().addClass('act');tab=jQuery(this).parent().attr('id');switch(tab){case'gol':tab='goleadores';break;case'tar1':tab='tarjetas1';break;case'tar2':tab='tarjetas2';break;}
jQuery('#informacion-goleadores .contentitem > div').addClass('hidden');jQuery('#informacion-goleadores .contentitem #'+tab).removeClass('hidden').addClass('gridPlayers');});jQuery('#informacion-equipos.boxhome .botonlivs-fw .nav-sec a').click(function(event){event.preventDefault();jQuery(this).parent().siblings().removeClass('act');jQuery(this).parent().addClass('act');tab=jQuery(this).parent().attr('id');switch(tab){case'gol':tab='goleadores';break;case'tar1':tab='tarjetas1';break;case'tar2':tab='tarjetas2';break;}
jQuery('#informacion-equipos .contentitem > div').addClass('hidden');jQuery('#informacion-equipos .contentitem #'+tab).removeClass('hidden').addClass('gridPlayers');});jQuery('#league_information .botonlivs-fw .nav-sec a').click(function(){change_league_info(jQuery(this).parent().attr('id'));});jQuery('#league_score .botonlivs-fw .nav-sec a').click(function(){change_league_score(jQuery(this).parent().attr('id'));});if(jQuery('#menu ul.top li.btndespl').length>0){var submenuleft=jQuery('#menu ul.top li.btndespl').position()['left']*(-1);jQuery('#menu ul.top li.btndespl #subligas').css('left',submenuleft);}
if(jQuery('.journey-list').length>0){if(jQuery('.journey-list').hasClass('eliminatoria')){var nlinks=2;}else{var nlinks=10;}
var nlinksface=nlinks/2;var before=jQuery('.journey-list .act').prevUntil('li:first-child').length;var after=jQuery('.journey-list .act').nextUntil('li:last-child').length;if((before<nlinks/2)&&(after>=nlinks/2)){after=nlinks-before;}else if((after<nlinks/2)&&(before>=nlinks/2)){before=nlinks-after;}else{after=after>nlinksface?nlinksface:after;before=before>nlinksface?nlinksface:before;}
jQuery('.journey-list li').hide();jQuery('.journey-list li:first-child, .journey-list li:last-child, .journey-list .act').show();jQuery('.journey-list .act').prevUntil('li:first-child').slice(0,before).show();jQuery('.journey-list .act').nextUntil('li:last-child').slice(0,after).show();jQuery('.journey-list .act a').click(function(event){event.preventDefault();jQuery('#desplega_jornadas').toggleClass('hidden');});}
if(jQuery('#kit_box #roundabout li').length>0){if(jQuery('#kit_box #roundabout li').length==3){jQuery('#kit_box .ct-roundabout-next').click(function(){prev=jQuery(this).siblings('ul').find('.ct-thumb-prev');next=jQuery(this).siblings('ul').find('.ct-thumb-next');ppal=jQuery(this).siblings('ul').find('.ct-thumb-ppal');jQuery(ppal).attr('class','ct-thumb-prev');jQuery(next).attr('class','ct-thumb-ppal');jQuery(prev).attr('class','ct-thumb-next');});jQuery('#kit_box .ct-roundabout-prev').click(function(){prev=jQuery(this).siblings('ul').find('.ct-thumb-prev');next=jQuery(this).siblings('ul').find('.ct-thumb-next');ppal=jQuery(this).siblings('ul').find('.ct-thumb-ppal');jQuery(next).attr('class','ct-thumb-prev');jQuery(prev).attr('class','ct-thumb-ppal');jQuery(ppal).attr('class','ct-thumb-next');});}else{jQuery('#kit_box .ct-roundabout-next').click(function(){next=jQuery(this).siblings('ul').find('.ct-thumb-next');ppal=jQuery(this).siblings('ul').find('.ct-thumb-ppal');jQuery(ppal).attr('class','ct-thumb-next');jQuery(next).attr('class','ct-thumb-ppal');});jQuery('#kit_box .ct-roundabout-prev').click(function(){next=jQuery(this).siblings('ul').find('.ct-thumb-next');ppal=jQuery(this).siblings('ul').find('.ct-thumb-ppal');jQuery(next).attr('class','ct-thumb-ppal');jQuery(ppal).attr('class','ct-thumb-next');});}}
if(jQuery('#historico_box').length>0){function historico_toggle(){tmp_active=jQuery('#historico_box .h-temporadas .active a').attr('data-temp');ftmp_active=jQuery('#historico_box .h-temporadas .active a').attr('data-ftemp');jQuery('#historico_box .h-team li').show();jQuery('#historico_box .h-team li').not('.h-head').not('[data-temp="'+tmp_active+'"]').hide();jQuery('#historico_box .blot').html(ftmp_active);}
historico_toggle();jQuery('#historico_box .h-temporadas a').live('click',function(){jQuery(this).parent().siblings().removeClass('active');jQuery(this).parent().addClass('active');historico_toggle();});}
if(jQuery('#miporra .porra-seeall').length>0){jQuery('#miporra .porra-seeall').click(function(){jQuery(this).next('ul.menu').toggleClass('close');jQuery(this).html(jQuery(this).html()=='+'?'-':'+');});}
jQuery('#equipoideal .info li').hover(function(){li=jQuery(this);jQuery('#equipoideal .field li').css('opacity','0.5');jQuery('#equipoideal .field li.'+li.attr('data-rel')).css('opacity','1');},function(){jQuery('#equipoideal .field li').css('opacity','1');});if(jQuery('.top.topcomunidad').length>0){jQuery('.top.topcomunidad').addClass('top-comunidad-new').removeClass('topcomunidad');}
jQuery('.scott > *:visible:first').addClass('fc');jQuery('.scott > *:visible:last').addClass('lc');jQuery('.scott > *:contains("►")').addClass('pag-next');jQuery('.scott > *:contains("◄")').addClass('pag-prev');if(jQuery('#evens-bet-toggle').length>0){jQuery('#evens-bet-toggle').click(function(){if(jQuery('.event-bet').length>0){var idx=0;jQuery('.event-bet').each(function(){if($('#evens-bet-toggle').text()=='Mostrar Apuestas'){jQuery(this).removeClass('hidden');}else{jQuery(this).addClass('hidden');}});}
if($('#evens-bet-toggle').text()=='Mostrar Apuestas'){$('#evens-bet-toggle').text('Ocultar Apuestas');}else{$('#evens-bet-toggle').text('Mostrar Apuestas');}});}
if(jQuery('.event-bet').length>0){var bet_idx=0;jQuery('.event-bet').each(function(){if(bet_idx<1){bet_idx++;jQuery(this).toggleClass('hidden');}});}
jQuery('.more-box-resume').click(function(){parent=jQuery(this).parents('tr').first();matchid=jQuery(this).attr('data-match');jQuery(parent).find('td').each(function(){jQuery(this).css('width',jQuery(this).css('width'));});if(jQuery(parent).hasClass('active')){jQuery(parent).removeClass('active');jQuery(parent).siblings('.league-match-events[data-match='+matchid+']').hide();}else{jQuery(parent).addClass('active');jQuery(parent).siblings('.league-match-events[data-match='+matchid+']').show();}});jQuery('.mundial-groups .mg-teams-list li a').click(function(){showMundialTeam(jQuery(this));});jQuery('.cruzadas td, .cruzadas th').hover(function(){var ncol=jQuery(this).index();jQuery('.cruzadas tr td:nth-child('+(ncol+1)+'), .cruzadas tr th:nth-child('+(ncol+1)+')').addClass('hover');},function(){var ncol=jQuery(this).index();jQuery('.cruzadas tr td:nth-child('+(ncol+1)+'), .cruzadas tr th:nth-child('+(ncol+1)+')').removeClass('hover');});});function showMundialTeam(elem){if(typeof(elem)=='undefined')
return;mteamid=jQuery(elem).attr('data-teamid');mleagueid=jQuery(elem).attr('data-leagueid');mteamdata=jQuery(elem).parents('.mg-teams').first().find('.mg-team-content[data-teamid='+mteamid+']');if(jQuery(mteamdata).length>0){jQuery(mteamdata).siblings('.mg-team-content').hide();jQuery(mteamdata).show();jQuery(elem).parent().siblings().removeClass('active');jQuery(elem).parent().addClass('active');}else{mteamdatano=jQuery(elem).parents('.mg-teams').first().find('.mg-team-content').first();var url=APP_DIR+'ajax/load_wteam.php';var pars={team_id:mteamid,league_id:mleagueid};var myAjax=jQuery.ajax({type:"GET",url:url,data:pars}).success(function(transport){jQuery(mteamdatano).after(transport);mteamdata=jQuery(elem).parents('.mg-teams').first().find('.mg-team-content[data-teamid='+mteamid+']');jQuery(mteamdata).siblings('.mg-team-content').hide();jQuery(mteamdata).show();jQuery(elem).parent().siblings().removeClass('active');jQuery(elem).parent().addClass('active');}).error(function(){alert('no se pudieron traer datos de esta selección :( ');});}}
function moveSuggests(direction){if(jQuery('#category_suggest ul li.select').length>0){selected=jQuery('#category_suggest ul li.select').first();if(direction=='up') {if(jQuery(selected).prev().length>0){jQuery(selected).removeClass('select').prev().addClass('select');}}else if(direction=='down'){if(jQuery(selected).next().length>0){jQuery(selected).removeClass('select').next().addClass('select');}}}else{jQuery('#category_suggest ul li').first().addClass('select');}}
function change_league_info(tab){jQuery('#league_information .nav-sec li').removeClass('act');jQuery('#league_information .nav-sec #'+tab).addClass('act');jQuery('#league_information .contentitem > div').addClass('hidden');var id=tab.substr(4);jQuery('#league_information .contentitem #text'+id).removeClass('hidden');}
function change_league_score(tab){jQuery('#league_score .nav-sec li').removeClass('act');jQuery('#league_score .nav-sec #'+tab).addClass('act');jQuery('#league_score .contentitem > div').addClass('hidden');var id=tab.substr(4);jQuery('#league_score .contentitem #text'+id).removeClass('hidden');}
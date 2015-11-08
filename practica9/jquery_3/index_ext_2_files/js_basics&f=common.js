function searchleague(data)
{var collection=$(".mtsl");var a=0;document.getElementById('resultulleague').innerHTML="";var ifound=0;var arrfound=new Array();collection.each(function(){if(collection[a].text.toLowerCase().indexOf(data.toLowerCase())>=0||collection[a].href.toLowerCase().indexOf(data.toLowerCase())>=0||collection[a].rel.toLowerCase().indexOf(data.toLowerCase())>=0)
if(jQuery.inArray(collection[a].href,arrfound)==-1)
{if(ifound>9)
return true;arrfound[ifound]=collection[a].href;document.getElementById('resultulleague').innerHTML+="<li><img class='flag f_"+collection[a].id+"' src='/media/img/1px.gif' alt='"+collection[a].text+"' /><a href='"+collection[a].href+"'>"+collection[a].text+"</a></li>";ifound++;}
a++;});}
function getCookie(c_name){if(document.cookie.length>0){c_start=document.cookie.indexOf(c_name+"=");if(c_start!=-1){c_start=c_start+c_name.length+1;c_end=document.cookie.indexOf(";",c_start);if(c_end==-1)c_end=document.cookie.length;return unescape(document.cookie.substring(c_start,c_end));}}return"";}
function ffx_setCookie(cookieName,cookieValue,nDays){var today=new Date();var expire=new Date();if(nDays==null||nDays==0)
nDays=1;expire.setTime(today.getTime()+3600000*24*nDays);document.cookie=cookieName+"="+escape(cookieValue)+";expires="+expire.toGMTString();}
function load_login_events0(){loginData=getCookie("rf_data");if(loginData!=null&&loginData!=""){var loginData=loginData.split("_._");if(loginData[4]){var par=loginData[4];par=par.split("|");loginData[4]=par[0];}
var htmllogtxt='<li class="username"><a href="/perfil">'+loginData[1]+'</a></li>';if(loginData[3]==1)
htmllogtxt+='<li class="admin"><a href="/control/1">admin</a></li>';htmllogtxt+='<li><a href="/perfil/editar">Editar mi perfil</a></li>';if(loginData[4]=='editor')
htmllogtxt+='<li><a href="/editor">Editar ligas</a></li>';htmllogtxt+='<li class="exit"><a id="logout_a" onclick="mklogout();" href="javascript:void(0);">Salir</a></li>';if(document.getElementById('registerText'))
document.getElementById('registerText').innerHTML="<div id='login_loading'><span>Cargando...</span></div>";}}
function post_login_ready(textlogin)
{var iduser=textlogin[2];jQuery('#userIdLogged').val(textlogin[2]);if(document.getElementById('avatardecomentario'))
{var avatar_url=textlogin[17]?textlogin[17]:APP_DIR+'avatar_'+Math.ceil(textlogin[2]/32000)+'/'+textlogin[2]+'/'+textlogin[2]+'_avatar.jpg" alt="'+textlogin[1];document.getElementById('avatardecomentario').innerHTML='<img src="'+avatar_url+'"/>';load_comments_events();}
if(document.getElementById('textl'))
{document.getElementById('textl').className="";document.getElementById('nameLogged').innerHTML=textlogin[1].replace(/^\s\s*/,'').replace(/\s\s*$/,'');document.getElementById('commentareareg').className="";document.getElementById('commentno').className="hidden";document.getElementById('buttonpub').className="publicar";}
if(document.getElementById('linkaddmedia'))
document.getElementById('linkaddmedia').className="caja addmedia boxhome";if(document.getElementById("match_id")&&document.getElementById("porra-match"))
{if(document.getElementById("porra-match"))
{PORRA_check_match(document.getElementById("match_id").value);}}
if(jQuery('#moderators_txt').length>0)
{var mod_value=jQuery('#moderators_txt').val();var mod_array=mod_value.split(",");for(var i=0;i<mod_array.length;i++)
{if(mod_array[i]==iduser)
jQuery('#group_edit').attr('class','btnjoin');}}
var okfriend=1;var okwall=0;if(jQuery('#friends').length>0)
{var friends=jQuery('#friends').val().split(',');for(var i=0;i<friends.length;i++)
{if(friends[i]==jQuery('#userIdLogged').val()&&friends[i]!='')
{okfriend=0;okwall=1;jQuery('#end_friend').attr('class','');}}}
if(jQuery('#id_user').length>0&&jQuery('#page').length>0&&jQuery('#page').val()=='profile'&&jQuery('#id_user').val()==iduser)
okwall=1;if(jQuery('#mylink'+iduser).length>0)
jQuery('#mylink'+iduser).attr('class','');if(jQuery('#capa-wall').length>0)
if(okwall==1&&jQuery('#page')&&jQuery('#page').val()=='profile')
{jQuery('#capa-wall').attr('class','');}
else if(jQuery('#page')&&jQuery('#page').val()=='profile')
{jQuery('#capa-wall').attr('class',"hidden");jQuery('#capa-wall').html('');}
var okmember=1;if(jQuery('#list_groups').length>0&&jQuery('#id_group').length>0)
{var list_groups=jQuery('#list_groups').val();var groups_granted=jQuery('#list_groups').val().split('-');if(jQuery('#moderators_a').length>0)
{var moderators=jQuery('#moderators_a').val().split(',');for(var i=0;i<moderators.length;i++)
if(moderators[i]&&moderators[i]==iduser&&moderators[i]!='')
{if(jQuery('#div_edit_group').length>0)
jQuery('#div_edit_group').attr('class','');if(jQuery('#div_edit_normal').length>0)
jQuery('#div_edit_normal').attr('class',"hidden");}}
for(var i=0;i<groups_granted.length;i++)
if(groups_granted[i]&&groups_granted[i]==jQuery('#id_group').val()&&groups_granted[i]!='')
{okmember=0;jQuery('#end_member').attr('class',"btnquit");}
if(okmember==1)
{jQuery('#add_member').attr('class',"btnjoin");jQuery('#addgmedia').attr('class',"hidden");jQuery('.line').each(function(){jQuery(this).attr('class','line hidden');});jQuery('.reponderen').each(function(){jQuery(this).attr('class','reponderen hidden');});jQuery('.mola').each(function(){});}}
if(jQuery('#id_user').length>0)
{if(jQuery('#userIdLogged').val()!=0&&(jQuery('#id_user').val()!=jQuery('#userIdLogged').val())&&okfriend==1)
{if(jQuery('.userhidden').length>0)
jQuery('.userhidden').attr('class','userhidden');}
if(jQuery('#id_user').val()==jQuery('#userIdLogged').val())
if(jQuery('#accperfil').length>0)
jQuery('#accperfil').attr('class','hidden');}
username=textlogin[7];if(jQuery('#divcomlog').length>0)
{if(jQuery('#userIdLogged').val()!=0)
{jQuery('#usernamePro').html(textlogin[1]);jQuery('#divcomlog').attr('class','');jQuery('#userNoLogged').attr('class','hidden');}
else
{jQuery('#divcomlog').attr('class','hidden');jQuery('#userNoLogged').attr('class','');}}
if(jQuery('#open_foto').length>0)
{if(jQuery('#open_foto').val()==1)
addPicture();}
if(jQuery('#open_noticia').length>0)
{if(jQuery('#open_noticia').val()==1)
addNew();}
if(jQuery('#open_video').length>0)
{if(jQuery('#open_video').val()==1)
addVideo();}
if(jQuery('#open_poll').length>0)
{if(jQuery('#open_poll').val()==1)
addPoll();}
if(jQuery('#is_budgets').length>0)
{if(jQuery('#is_budgets').val()==1)
{if(document.URL.split("#")[1]=="add")
addBudget();}}
if(jQuery('#rel_fav').length>0&&jQuery('#rel_fav').val()==1)
{if(typeof(checkFavourite)!='undefined')
checkFavorite();}
if(jQuery('#rel_favv').length>0&&jQuery('#rel_favv').val()==1)
{if(typeof(checkFavoritev)!='undefined')
checkFavoritev();}
if(jQuery('#rel_favn').length>0&&jQuery('#rel_favn').val()==1)
{if(typeof(checkFavoriten)!='undefined')
checkFavoriten();}
if(jQuery('#rel_favp').length>0&&jQuery('#rel_favp').val()==1)
{if(typeof(checkFavoritep)!='undefined')
checkFavoritep();}
reload_page=0;if(textlogin[15]&&(textlogin[15]>=1)&&jQuery("#status_container").length>0&&jQuery("#status_inner_container").length>0&&jQuery("#li_status").length>0)
{if(textlogin[12])
{var stats="";if(stats=jQuery.parseJSON(textlogin[12]))
{var html_str="";for(var i=0;i<stats.length;i++)
{var time_since=(stats[i].date);if(time_since=="Hace 1 minutos")
time_since="Hace 1 minuto";else if(time_since=="Hace 1 horas")
time_since="Hace 1 hora";else if(time_since=="Hace 1 días")
time_since="Hace 1 día";else if(time_since=="Hace 1 meses")
time_since="Hace 1 mes";else if(time_since=="Hace 1 años")
time_since="Hace 1 año";if(stats[i].viewed==1)
a_class="viewed";else
a_class="";html_str+='<a href="'+stats[i].link+'#info-comentarios-tips" class="aitem">';html_str+=' <div class="item '+a_class+'">';html_str+='  <img class="imag" alt="'+stats[i].user+'" src="'+stats[i].avatar+'" >';html_str+='  <div class="content">';html_str+='   <span class="">'+stats[i].text+'</span>';html_str+='   <span class="when">'+time_since+'</span>';html_str+='  </div>';html_str+=' </div>';html_str+='</a>';}
if(textlogin[13]&&jQuery("#statusnum_div")&&jQuery("#statusnum"))
{jQuery("#statusnum").html(textlogin[13]);jQuery("#statusnum_div").removeClass("hidden");}
jQuery("#status_inner_container").html(html_str);if(textlogin[14]&&jQuery("#status_noviewed_ids"))
{jQuery("#status_noviewed_ids").val(textlogin[14]);}}}}
else
{jQuery("#status_inner_container").html('<p class="noactividad">Has desactivado la actividad, <a href="http://www.resultados-futbol.com/perfil/editar/7">puedes activarla aquí</a>.</p>');}
if(jQuery("#transfer_button").length>0)
{jQuery(".transfer_div").each(function(element){});if(textlogin[16]&&textlogin[16]==1)
{jQuery("#transfers_add").removeClass("hidden");jQuery("#transfer_button").html("Añadir fichaje");jQuery("#transfer_button").removeClass("deact");}
else
{jQuery("#transfers_conditions").removeClass("hidden");jQuery("#transfer_button").html("Alta editor fichajes");}}}
var post_login=0;var savetextlogin="";function load_login_events()
{loginData=getCookie(COOKIE_NAME);if(loginData!=null&&loginData!="")
{var loginDataParts=loginData.split('_._');var datamainpart=loginDataParts[4].split("|");var add_url=loginDataParts[2]+loginDataParts[0].substring(0,30);var ini_txt='<li class="addcontent"><a href="javascript:;" id="swithAddContent" class="publish" onclick="swithAddContent();">Publicar</a><div id="tabAddContent" class="navigation hidden"><ul><li><a href="'+APP_DIR+'perfil/agregar_noticia" title="">Noticia</a></li><li><a href="'+APP_DIR+'perfil/agregar_imagen" title="">Imagen</a></li><li><a href="'+APP_DIR+'perfil/agregar_video" title="">Vídeo</a></li><li><a href="'+APP_DIR+'perfil/agregar_encuesta" title="">Encuesta</a></li><li><a href="'+APP_DIR+'fichajes#add" title="">Fichaje</a></li></ul></div></li><li class="minavatar"><a id="tabSessWindow_avatar" href="javascript:;" onclick="swithSessWindow();"><img id="tabSessWindow_image" width="17" height="17" src="http://thumb.resfu.com/avatar_'+Math.ceil(loginDataParts[2]/32000)+'/'+loginDataParts[2]+'/'+loginDataParts[2]+'_gallery.jpg?size=26x" alt="'+loginDataParts[1]+'" /></a></li><li class="username"><a id="tabSessWindow_username" href="javascript:;" onclick="swithSessWindow();">'+loginDataParts[1]+'</a></li><li class="down"><a href="javascript:;" id="swithSessWindow" class="lk" onclick="swithSessWindow();"></a><div id="tabSessWindow" class="navigation hidden"><div class="bigavat"><a href="http://cortes.resultados-futbol.com/perfil/editar" class="chan_foto">Cambiar avatar</a><a href="http://cortes.resultados-futbol.com/perfil/manu"><img width="80" height="80" src="http://thumb.resfu.com/avatar_'+Math.ceil(loginDataParts[2]/32000)+'/'+loginDataParts[2]+'/'+loginDataParts[2]+'_gallery.jpg?size=80x" alt="'+loginDataParts[1]+'" /></a></div><ul><li class="username"><a href="'+APP_DIR+'perfil/">Ir a mi perfil</a></li><li><a href="'+APP_DIR+'perfil/editar">Editar mi perfil</a></li></ul><div class="bott"><a id="logout_a" onclick="mklogout();" href="javascript:void(0);">Salir</a></div></div></li>';jQuery('#registerText').html(ini_txt);jQuery('#registerText').attr('class',"sesion_link");}
if(loginData!=null&&loginData!="")
{var url=APP_DIR+'login/1/'+add_url;var pars={};var myAjax=jQuery.ajax({type:"GET",url:url,data:pars}).success(function(transport){if(transport)
{jQuery('#content_logged_user').html('<div id="common_sendmsgbox" class="generic_dialog hidden"><div style="top: 100px;" class="generic_dialog_popup"><table id="pop_dialog_table" class="pop_dialog_table ufbtable"><tbody><tr><td class="pop_topleft"></td><td class="pop_border pop_top"></td><td class="pop_topright"></td></tr><tr><td class="pop_border pop_side"></td><td class="pop_content" id="pop_content"><h2 class="dialog_title"><span>Enviar mensaje</span><a class="cerrar_corner" onclick="jQuery(\'#common_sendmsgbox\').addClass(\'hidden\');" href="javascript:void(0);">x</a></h2><div class="dialog_summary">Para enviar el mensaje tiene que rellenar al menos el campo Mensaje, el campo Asunto no es obligatorio.</div><div class="dialog_error_message" id="common_sendmsgbox_error_message"></div><div class="dialog_body"><div id="common_statusbox" class="hidden">enviando...</div><form><table><tr><td><label for="user">Para: </label></td><td><strong><span class="usuario" id="common_sendmsgbox_toField"></span></strong></td></tr><tr><td><label for="subject">Asunto: </label></td><td><input type="text" name="common_sendmsgbox_subject" id="common_sendmsgbox_subject" style="width: 550px important!;"></td></tr><tr><td valign="top"><label for="user">Mensaje: </label></td><td><textarea id="common_sendmsgbox_message" cols="50" rows="7"></textarea></td></tr><tr><td><input type="hidden" id="common_sendmsgbox_to" value="" /></td></tr></table></form></div><div style="clear:both;"></div><div class="dialog_summary"><input type="button" value="Enviar mensaje" onclick="common_sendmsg();" name="common_sendmsg" id="common_sendmsg" class="bottonrl"><input type="button" onclick="jQuery(\'#common_sendmsgbox\').addClass(\'hidden\');" value="Cancelar" class="botoncancelar"></div></td><td class="pop_border pop_side"></td></tr><tr><td class="pop_bottomleft"></td><td class="pop_border pop_bottom"></td><td class="pop_bottomright"></td></tr></tbody></table></div></div>');var textlogin=transport.split("|||");savetextlogin=textlogin;var title_notifies=0;if(textlogin[3]&&textlogin[3]>=1)
title_notifies+=parseInt(textlogin[3]);if(textlogin[4]&&textlogin[4]>=1)
title_notifies+=parseInt(textlogin[4]);if(textlogin[5]&&textlogin[5]>=1)
title_notifies+=parseInt(textlogin[5]);if(title_notifies>=1)
document.title=document.title+" ("+title_notifies+")";jQuery('#userIdLogged').val(textlogin[2]);if(document.getElementById('post_user_id'))
jQuery('#post_user_id').val(textlogin[2]);var iduser=textlogin[2];post_login=1;post_login_ready(savetextlogin);if(jQuery("#blogedt").length>0&&jQuery("#blogedt").val()==1)
{isMyBlog();}
jQuery('#registerText').html(textlogin[0]);jQuery('#registerText').attr('class',"sesion_link");jQuery('#registerloading').attr('class',"hidden");if(document.getElementById('swithAddContentBug')&&document.getElementById('bugbox'))
{document.getElementById('swithAddContentBug').className="publish publish-bug";document.getElementById('contact_email_div').className="hidden";}
if(textlogin[4]&&textlogin[4]>0)
{if(jQuery('#msgnum').length>0)
jQuery('#msgnum').html(textlogin[4]);if(jQuery('#msgdiva').length>0)
jQuery('#msgdiva').attr('class','');}
if(textlogin[3]&&textlogin[3]>0)
{if(jQuery('#friendsnum').length>0)
jQuery('#friendsnum').html(textlogin[3]);if(jQuery('#frienddiva').length>0)
jQuery('#frienddiva').attr('class','');}
if(textlogin[5]&&textlogin[5]>0)
{if(jQuery('#msgwnum').length>0)
jQuery('#msgwnum').html(textlogin[5]);if(jQuery('#msgwdiva').length>0)
jQuery('#msgwdiva').attr('class','');}}
else
{if(document.getElementById('textnol'))
document.getElementById('textnol').className="";if(document.getElementById('avatardecomentario'))
{document.getElementById('avatardecomentario').innerHTML='<img src="'+APP_DIR+'media/provi/avatar.jpg" alt=""/>';load_comments_events();}
jQuery('#registerText').attr('class',"sesion_link");jQuery('#registerloading').attr('class',"hidden");if(jQuery('#divcomlog').length>0)
{jQuery('#divcomlog').attr('class','hidden');jQuery('#userNoLogged').attr('class','');}}});}
else
{jQuery('#registerText').attr('class',"sesion_link");jQuery('#registerloading').attr('class',"hidden");if(jQuery('#divcomlog').length>0)
{jQuery('#divcomlog').attr('class','hidden');jQuery('#userNoLogged').attr('class','');}
jQuery(document).ready(function(){if(jQuery('#transfer_button').length>0){jQuery('#add-budget-box').addClass('hidden');}});jQuery(window).load(function(){if(document.getElementById('textnol'))
document.getElementById('textnol').className="";if(document.getElementById('avatardecomentario'))
{document.getElementById('avatardecomentario').innerHTML='<img src="'+APP_DIR+'media/provi/avatar.jpg" alt=""/>';load_comments_events();}
if(jQuery('#capa-comentarios_bis').length>0)
jQuery('#capa-comentarios_bis').attr('class',"userhidden");})}}
var data1='';var data2='';var data3='';var data4='';var data5='';var data6='';var data7='';var dataV1='';var dataV2='';var dataV3='';var dataV4='';var dataV5='';var dataV6='';var dataV7='';var dataV8='';var category_search_dirty=false;var last_search=false;function closeCookieMessage(){jQuery('#privacyPolicy').fadeOut('slow');setCookie('cookies_closed','true',365);}
if(typeof(setCookie)=='undefined'){function setCookie(cookieName,cookieValue,nDays){var today=new Date();var expire=new Date();if(nDays==null||nDays==0)
nDays=1;expire.setTime(today.getTime()+3600000*24*nDays);document.cookie=cookieName+"="+escape(cookieValue)+";expires="+expire.toGMTString();}}
jQuery(document).ready(function(){cookies_closed=getCookie('cookies_closed');if(!(cookies_closed=="true")){jQuery('#privacyPolicy').show();jQuery('#privacyPolicy .privacy-close').click(function(){closeCookieMessage();});}
jQuery('.testlink').click(function(){noexisto();});if(jQuery('#login_a').length>0)
jQuery('#login_a').attr('href','javascript:void(0)');if(jQuery('#registro_a').length>0)
jQuery('#registro_a').attr('href','javascript:void(0)');if(post_login==1)
{post_login_ready(savetextlogin);}
if(jQuery('#stringP1').length>0&&jQuery('#stringP1').val()!='')
{data1=jQuery('#stringP1').val();data1=data1.split("||");data2=jQuery('#stringP2').val();data2=data2.split("||");data3=jQuery('#stringP3').val();data3=data3.split("||");data4=jQuery('#stringP4').val();data4=data4.split("||");data5=jQuery('#stringP5').val();data5=data5.split("||");data6=jQuery('#stringP6').val();data6=data6.split("||");data7=jQuery('#stringP7').val();data7=data7.split("||");data8=jQuery('#stringP8').val()||'';data8=data8.split("||");data9=jQuery('#stringP9').val()||'';data9=data9.split("||");data10=jQuery('#stringP10').val()||'';data10=data10.split("||");}
if(jQuery('#stringV1').length>0&&jQuery('#stringV1').val()!='')
{dataV1=jQuery('#stringV1').val();dataV1=dataV1.split("||");dataV2=jQuery('#stringV2').val();dataV2=dataV2.split("||");dataV3=jQuery('#stringV3').val();dataV3=dataV3.split("||");dataV4=jQuery('#stringV4').val();dataV4=dataV4.split("||");dataV5=jQuery('#stringV5').val();dataV5=dataV5.split("||");dataV6=jQuery('#stringV6').val();dataV6=dataV6.split("||");dataV7=jQuery('#stringV7').val();dataV7=dataV7.split("||");dataV8=jQuery('#stringV8').val();dataV8=dataV8.split("||");}
if(jQuery('#cname_url').length>0&&jQuery('#cname_url').val()!='')
{var cname_url=jQuery('#cname_url').val();}
if(jQuery('#menu ul.top li.btndespl').length>0){jQuery('#menu ul.top li.btndespl').each(function(){var submenuleft=jQuery(this).position()['left']*(-1);if(jQuery(this).find('#subligas'))
jQuery(this).find('#subligas').css('left',submenuleft);});}
if(jQuery('.top.topcomunidad').length>0){jQuery('.top.topcomunidad').addClass('top-comunidad-new').removeClass('topcomunidad');}
jQuery('.scott > *:visible:first').addClass('fc');jQuery('.scott > *:visible:last').addClass('lc');jQuery('.scott > *:contains("►")').addClass('pag-next');jQuery('.scott > *:contains("◄")').addClass('pag-prev');jQuery('.friends-petitions .box_leyenda:gt(1)').addClass('hidden');jQuery('.friends-petitions .friend-more').click(function(){jQuery('.friends-petitions .box_leyenda').removeClass('hidden');});jQuery('#search_photo, .newlist-template .buscadortop2,  .photo-template .buscadortop2, .video-template .buscadortop2').submit(function(event){event.preventDefault();var base_search=jQuery(this).attr('action');var query_search=clear_string(jQuery(this).find('input[name=nombre]').val());base_search=base_search+query_search;window.location.href=base_search;});user_windows();bet_events();channel_events();match_events();jQuery.smartbanner();jQuery('.boxhome .botonlivs a[data-rel]').click(function(){var data_rel=jQuery(this).attr('data-rel');if(jQuery(this).parents('.boxhome').first().find('#'+data_rel).length>0){jQuery(this).parents('.boxhome').first().find('#'+data_rel).siblings().removeClass('active');jQuery(this).parents('.boxhome').first().find('#'+data_rel).addClass('active');}
jQuery(this).parent().siblings().removeClass('act');jQuery(this).parent().siblings().find('a').removeClass('act');jQuery(this).parent().addClass('act');jQuery(this).addClass('act');});jQuery('#search_category #category_name').on('keypress',deferredSearchCategory).on('keyup',deferredSearchCategory).on('change',deferredSearchCategory);mod_calendar_events();});jQuery(window).on('beforeunload',function(){if(jQuery('#pop').is(':visible')){return"Si estás editando o añadiendo contenido y vuelves a cargar esta página, puedes perder el contenido que estás editando.";}});jQuery(document).mouseup(function(event){var idx=event.target.id?event.target.id:event.target.className;if((idx!="link_status")&&(idx!="statusnum")&&(idx!="li_status")&&(idx!="statusnum_div")&&$("status_container")&&!$("status_container").hasClass("hidden"))
{jQuery("#status_container").addClass("hidden");}
if((idx=="link_status")||(idx=="statusnum")||(idx=="li_status")||(idx=="statusnum_div")){viewsStatus();}});function deferredSearchCategory(event){if(event.which==40){event.preventDefault();moveSuggests('down');return false;}else if(event.which==38){event.preventDefault();moveSuggests('up');return false;}else if(event.which==13){event.preventDefault();if(jQuery('#category_suggest ul li.select').length>0){var to_url=jQuery('#category_suggest ul li.select a').attr('href');document.location.href=to_url;}
return false;}
if(category_search_dirty){clearTimeout(category_search_dirty);}
category_search_dirty=setTimeout(function(){category_search_dirty=false;return searchCategory();},200);}
function searchCategory(){var keywords=jQuery('#search_category #category_name').val();last_search=keywords;jQuery.get(APP_DIR+"ajax/doKeywordsLeague.php",{cadena:keywords},function(data){if(last_search==keywords)
jQuery('#search_category #category_suggest').html(data);});}
function clear_string(str){str=jQuery.trim(str).replace(' ','-');str=str.replace(/^\s+|\s+$/g,'');str=str.toLowerCase();var from="àáäâèéëêìíïîòóöôùúüûñç·/_,:;";var to="aaaaeeeeiiiioooouuuunc------";for(var i=0,l=from.length;i<l;i++){str=str.replace(new RegExp(from.charAt(i),'g'),to.charAt(i));}
str=str.replace(/[^a-z0-9 -]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-');return str;}
var a=0;var lastid=0;var lastidAux="";var startsearch1=0;var startsearch2=0;var selected=1;var doenter=1;if(document.getElementById('swithAddContentBug')&&document.getElementById('bugbox'))
{document.getElementById('swithAddContentBug').className="publish publish-bug";}
function despsitios()
{if(jQuery('#ulsitios').length>0)
{if(jQuery('#ulsitios').hasClass('hidden'))
{jQuery('#ulsitios').removeClass('hidden');jQuery('#despsitios').addClass('desp').removeClass('despi');clearGameM();}
else
{clearSitioM();}}}
var lang_porra_url="porra";var lang_manager_url="desafio_manager";var lang_budget_url="presupuesto";var lang_market_url="mercado";var lang_see_comments_url="comentarios/ver/";var lang_see_category_url="categoria/ver/";var lang_see_news_url="noticia/ver/";var lang_see_pic_url="foto/ver/";var lang_see_vid_url="video/ver/";var lang_see_player_url="jugador/ver/";var lang_places_url="lugares";var photos_url="fotos";var photo_url="foto";var videos_url="videos";var video_url="video";var news_url="noticias";var new_url="noticia";var post_url="post";var poll_url="encuesta";var profile_url="perfil";var search_url="buscar";var team_url="equipos";var leagues_url="ligas";var matches_url="partidos";var players_url="jugadores";var register_url="register";var group_url="grupo";var dream_team_url="once_ideal/equipo/";var dteam_url="once_ideal";var add_image_url="perfil/agregar_imagen";var add_video_url="perfil/agregar_video";var add_news_url="perfil/agregar_noticia";var kits_url="crea-tu-camiseta/detalle";var tshirts_url="camisetas";var table_pictures="pictures";var table_picture_videos="picture_videos";var avatarg="avatarg";var avatarb="avatarb";var lang_budget="fichajes";var budget="fichajes";var lang_budget_league="liga";var lang_budget_team="equipo";var lang_bebroker_urlt="bebroker_equipos";var lang_bebroker_url="bebroker";var lineups_of="Once ideal del";var lineups="Once ideal";var lcomments="comentarios";var comment_image="Comentar imagen";var comment_video="Comentar video";var uploaded="Subido";var voting="Votando";var voted="Votado";var CDN_DIR="http://thumb.resfu.com/";function next_img()
{jQuery('#currentP').val(parseInt(jQuery('#currentP').val())+1);var current=parseInt(jQuery('#currentP').val());show_img(current);}
function prev_img()
{jQuery('#currentP').val(parseInt(jQuery('#currentP').val())-1);var current=parseInt(jQuery('#currentP').val());show_img(current);}
function show_img(current)
{if(current>0&&current<=jQuery('#maxP').val())
{jQuery('#currentP').val(current);var currentpP=parseInt(jQuery('#currentpP').val());var currentpag=(currentpP*4)+1;var currentpagMin=(currentpP*4)-3;if(current>=currentpag)
{jQuery('#currentpP').val(parseInt(jQuery('#currentpP').val())+1);jQuery('#pini').html((parseInt(jQuery('#currentpP').val()-1)*4)+1);jQuery('#pfin').html((parseInt(jQuery('#currentpP').val()-1)*4)+4);var lis='';var a=0;for(i=currentpag-1;i<currentpag+3;i++)
{if(data1[i])
{if(a==3)
lis+='<li class="last">';else
lis+='<li>';lis+='<a href="javascript:void(0);" onclick="show_img('+(i+1)+');">';var class_video_span='';if(data10[i]&&data10[i]=='video')
class_video_span='span_video';if(i==current)
lis+='<span class="'+class_video_span+' act" id="span_img'+(i+1)+'"></span>';else
lis+='<span class="'+class_video_span+'" id="span_img'+(i+1)+'"></span>';if(data10[i]&&data10[i]=='video')
lis+='<img src="'+CDN_DIR+table_picture_videos+'/'+data2[i]+'/original/'+data1[i]+'.jpg?size=65x65c" />';else
lis+='<img src="'+CDN_DIR+table_pictures+'/'+data2[i]+'/original/'+data1[i]+'.jpg?size=65x65t" />';lis+='</a></li>';a++;}}
jQuery('#list_tp').html(lis);}
else if(current<currentpagMin)
{currentpagMin=currentpagMin-4;jQuery('#currentpP').val(parseInt(jQuery('#currentpP').val())-1);jQuery('#pini').html((parseInt(jQuery('#currentpP').val()-1)*4)+1);jQuery('#pfin').html((parseInt(jQuery('#currentpP').val()-1)*4)+4);var lis='';var a=0;for(i=(currentpagMin-1);i<currentpagMin+3;i++)
{if(data1[i])
{if(a==3)
lis+='<li class="last">';else
lis+='<li>';lis+='<a href="javascript:void(0);" onclick="show_img('+(i+1)+');">';var class_video_span='';if(data10[i]&&data10[i]=='video')
class_video_span='span_video';if(i==current)
lis+='<span class="'+class_video_span+' act" id="span_img'+(i+1)+'"></span>';else
lis+='<span class="'+class_video_span+'" id="span_img'+(i+1)+'"></span>';if(data10[i]&&data10[i]=='video')
lis+='<img src="'+CDN_DIR+table_picture_videos+'/'+data2[i]+'/original/'+data1[i]+'.jpg?size=65x65c" />';else
lis+='<img src="'+CDN_DIR+table_pictures+'/'+data2[i]+'/original/'+data1[i]+'.jpg?size=65x65t" />';lis+='</a></li>';a++;}}
jQuery('#list_tp').html(lis);}
for(ia=-3;ia<4;ia++)
if(jQuery('#span_img'+(current+ia)).length>0)
jQuery('#span_img'+(current+ia)).removeClass("act");jQuery('#span_img'+current).addClass("act");current--;if(data10[current]&&data10[current]=='video')
var mainimg='<div class="capaimg"><a href="'+data4[current]+'" title="'+data3[current]+'"><b class="dotlink dotlinkv"></b><img src="'+CDN_DIR+table_picture_videos+'/'+data2[current]+'/original/'+data1[current]+'.jpg?size=282x192c" alt="'+data3[current]+'" title="'+data3[current]+'" /></a></div>';else
var mainimg='<div class="capaimg"><a href="'+data4[current]+'" title="'+data3[current]+'"><img src="'+CDN_DIR+table_pictures+'/'+data2[current]+'/original/'+data1[current]+'.jpg?size=282x192s" alt="'+data3[current]+'" title="'+data3[current]+'" /></a></div>';if(data8&&data8[current])
{mainimg+='<span class="titlenotg"><a href="'+data4[current]+'">'+data8[current]+'</a></span>';}
if(data5[current]>0)
{mainimg+='<span class="autor"><a href="'+data4[current]+'#comentarios_link">'+data5[current]+' '+lcomments+'</a> | ';}
else
{mainimg+='<span class="autor"><a href="'+data4[current]+'#comentarios_link">'+comment_image+'</a> | ';}
mainimg+='Subida '+data7[current]+'</span>';jQuery('#mainimg').html(mainimg);}
else
{if(current<=1)
jQuery('#currentP').val(1);if(current>=jQuery('#maxP').val())
jQuery('#currentP').val(jQuery('#maxP').val());}}
function show_video(current)
{if(current>0&&current<=document.getElementById('maxV').value)
{document.getElementById('currentV').value=current;var currentpP=parseInt(document.getElementById('currentvV').value);var currentpag=(currentpP*4)+1;var currentpagMin=(currentpP*4)-3;if(current>=currentpag)
{document.getElementById('currentvV').value=parseInt(document.getElementById('currentvV').value)+1;document.getElementById('vini').innerHTML=(parseInt(document.getElementById('currentvV').value-1)*4)+1;document.getElementById('vfin').innerHTML=(parseInt(document.getElementById('currentvV').value-1)*4)+4;var lis='';var a=0;for(i=currentpag-1;i<currentpag+3;i++)
{if(dataV1[i])
{lis+='<li';if(a==3)
lis+=' class="last"';lis+='><span';if(i==current)
lis+=' class="act"';lis+=' id="span_vid'+(i+1)+'"></span><a href="javascript:void(0);" onclick="show_video('+(i+1)+');"><img src="'+CDN_DIR+table_picture_videos+'/'+dataV2[i]+'/thumbnail/'+dataV1[i]+'.jpg"></a></li>';a++;}}
document.getElementById('list_tv').innerHTML=lis;}
else if(current<currentpagMin)
{currentpagMin=currentpagMin-4;document.getElementById('currentvV').value=parseInt(document.getElementById('currentvV').value)-1;document.getElementById('vini').innerHTML=(parseInt(document.getElementById('currentvV').value-1)*4)+1;document.getElementById('vfin').innerHTML=(parseInt(document.getElementById('currentvV').value-1)*4)+4;var lis='';var a=0;for(i=(currentpagMin-1);i<currentpagMin+3;i++)
{if(dataV1[i])
{lis+='<li';if(a==3)
lis+=' class="last"';lis+='><span';if(i==current)
lis+=' class="act"';lis+=' id="span_vid'+(i+1)+'"></span><a href="javascript:void(0);" onclick="show_video('+(i+1)+');"><img src="'+CDN_DIR+table_picture_videos+'/'+dataV2[i]+'/thumbnail/'+dataV1[i]+'.jpg"></a></li>';a++;}}
document.getElementById('list_tv').innerHTML=lis;}
for(ia=-3;ia<4;ia++)
if(document.getElementById('span_vid'+(current+ia)))
document.getElementById('span_vid'+(current+ia)).className="";document.getElementById('span_vid'+current).className="act";current--;var mainimg='<div class="capaimg"><img height="192px" src="'+CDN_DIR+table_picture_videos+'/'+dataV2[current]+'/original/'+dataV1[current]+'.jpg?size=282x192c" alt="'+dataV3[current]+'" title="'+dataV3[current]+'" /><a href="javascript:void(0);" onclick="playYoutube('+current+');" title="'+dataV3[current]+'"><img class="playimg"  src="'+CDN_DIR+'media/img/play1.png" alt="Reproducir"></a></div><span class="autor">';if(dataV5[current]>0)
{mainimg+='<a href="'+dataV4[current]+'#comentarios_link">'+dataV5[current]+' '+lcomments+'</a> | ';}
else
{mainimg+='<a href="'+dataV4[current]+'#comentarios_link">'+comment_video+'</a> | ';}
mainimg+=uploaded+' '+dataV7[current]+'</span>';document.getElementById('mainvid').innerHTML=mainimg;}
else
{if(current<=1)
document.getElementById('currentV').value=1;if(current>=document.getElementById('maxV').value)
document.getElementById('currentV').value=document.getElementById('maxV').value;}}
function playYoutube(current)
{var mainimg='<object width= "280" height="192"><param name="movie" value="http://www.youtube.com/v/'+dataV8[current]+'&feature&autoplay=1&rel=0&fs=1&color1=0x3a3a3a&color2=0x999999&border=0&loop=0"></param><param name="allowFullScreen" value="true"></param><embed src="http://www.youtube.com/v/'+dataV8[current]+'&feature&autoplay=1&rel=0&fs=1&color1=0x3a3a3a&color2=0x999999&border=0&loop=0" type="application/x-shockwave-flash" allowfullscreen="false" width="280" height="192"></embed></object><span class="autor">';if(dataV5[current]>0)
{mainimg+='<a href="'+dataV4[current]+'#comentarios_link">'+dataV5[current]+' '+lcomments+'</a> | ';}
else
{mainimg+='<a href="'+dataV4[current]+'#comentarios_link">'+comment_video+'</a> | ';}
mainimg+=uploaded+' '+dataV7[current]+'</span>';document.getElementById('mainvid').innerHTML=mainimg;}
function next_vid()
{document.getElementById('currentV').value=parseInt(document.getElementById('currentV').value)+1;var current=parseInt(document.getElementById('currentV').value);show_video(current);}
function prev_vid()
{document.getElementById('currentV').value=parseInt(document.getElementById('currentV').value)-1;var current=parseInt(document.getElementById('currentV').value);show_video(current);}
function clearSitioM()
{if(jQuery('#ulsitios').length>0)
{jQuery('#ulsitios').addClass('hidden');jQuery('#despsitios').removeClass('desp').addClass('despi');}}
function despgames()
{if(jQuery('#ulgames').length>0)
{if(jQuery('#ulgames').hasClass('hidden'))
{jQuery('#ulgames').removeClass('hidden');jQuery('#despgame').addClass('desp').removeClass('despi');clearSitioM();}
else
{clearGameM();}}}
function clearGameM()
{if(jQuery('#ulgames').length>0)
{jQuery('#ulgames').addClass('hidden');jQuery('#despgame').removeClass('desp').addClass('despi');}}
function add_bug()
{jQuery('#bugbox').addClass('hidden');var text_bug=jQuery('#text_bug').val();var type_bug=jQuery('#type_bug').val();var contact_email=jQuery('#contact_email').val();var browser=navigator.appName;var version=navigator.appVersion;var width=screen.width;var height=screen.height;var userId=0;var urlError=document.URL;if(jQuery('#userIdLogged')&&jQuery('#userIdLogged').val()!=0)
userId=jQuery('#userIdLogged').val();var url=APP_DIR+'ajax/send_bug.php';var pars={userId:userId,text_bug:text_bug,type_bug:type_bug,contact_email:contact_email,urlError:urlError,browser:browser,version:version,width:width,height:height};var myAjax=jQuery.ajax({type:"POST",url:url,data:pars}).success(function(transport){if(transport=="1")
{alert("Muchas gracias, tu petición sido registrado en nuestros sistemas.");}
else
{alert("Ha habido un error, por favor contáctanos en resultadosfutbol@gmail.com");}});}
function doSearch(cadena,type)
{var url=APP_DIR+'ajax/doSearch.php';var pars={cadena:cadena};var myAjax=jQuery.ajax({type:"GET",url:url,data:pars}).success(function(transport){var texto=transport;if(type==0)
window.location.href=APP_DIR+search_url+'/'+texto;if(type==1)
window.location.href=APP_DIR+search_url+'/'+team_url+'/'+texto;if(type==2)
window.location.href=APP_DIR+search_url+'/'+leagues_url+'/'+texto;if(type==3)
window.location.href=APP_DIR+search_url+'/'+matches_url+'/'+texto;if(type==4)
window.location.href=APP_DIR+photos_url+'/'+texto;if(type==5)
window.location.href=APP_DIR+videos_url+'/'+texto;if(type==6)
window.location.href=APP_DIR+search_url+'/'+players_url+'/'+texto;if(type==7)
window.location.href=APP_DIR+videos_url+'/'+texto;});}
function sleep(ms)
{var dt=new Date();dt.setTime(dt.getTime()+ms);while(new Date().getTime()<dt.getTime());}
function getKeywords(cadena,type,e,type_bis)
{var num_char=cadena.length;var block=0;var tecla=e.keyCode;switch(tecla)
{case 13:doSearch(cadena,type_bis);break;case 37:block=1;break;case 38:block=1;if(selected>1)
{if(jQuery('#searchr'+selected).attr('class')=='misbus select')
{jQuery('#searchr'+selected).attr('class','misbus');selected=selected-1;if(jQuery('#searchr'+selected).attr('class')=='misbus'||jQuery('#searchr'+selected).attr('class')=='misbus ')
jQuery('#searchr'+selected).attr('class','misbus select');else
jQuery('#searchr'+selected).attr('class','select');}
else
{jQuery('#searchr'+selected).attr('class','');selected=selected-1;if(jQuery('#searchr'+selected).attr('class')=='misbus'||jQuery('#searchr'+selected).attr('class')=='misbus ')
jQuery('#searchr'+selected).attr('class','misbus select');else
jQuery('#searchr'+selected).attr('class','select');}}
break;case 39:block=1;break;case 40:block=1;var selectedn=selected+1;if(jQuery('#searchr'+selectedn).length>0)
{if(jQuery('#searchr'+selected).attr('class')=='misbus select')
{jQuery('#searchr'+selected).attr('class','misbus');selected=selected+1;if(jQuery('#searchr'+selected).attr('class')=='misbus'||jQuery('#searchr'+selected).attr('class')=='misbus ')
jQuery('#searchr'+selected).attr('class','misbus select');else if(jQuery('#searchr'+selected))
jQuery('#searchr'+selected).attr('class','select');}
else
{jQuery('#searchr'+selected).attr('class','');selected=selected+1;if(jQuery('#searchr'+selected).attr('class')=='misbus'||jQuery('#searchr'+selected).attr('class')=='misbus ')
jQuery('#searchr'+selected).attr('class','misbus select');else if(jQuery('#searchr'+selected))
jQuery('#searchr'+selected).attr('class','select');}}
break;}
if(num_char>0&&block==0)
{selected=1;var userId=0;if(jQuery('#userIdLogged')&&jQuery('#userIdLogged').val()!=0&&type==1)
userId=jQuery('#userIdLogged').val();var url=APP_DIR+'ajax/doKeywords.php';var pars={cadena:cadena,userId:userId};var myAjax=jQuery.ajax({type:"GET",url:url,data:pars}).success(function(transport){var texto=transport;if(texto!='0')
{jQuery('#sugerencias'+type).attr('class',"sugerencias");jQuery('#sugerencias'+type).html(texto);doenter=1;}
else
{jQuery('#sugerencias'+type).attr('class',"hidden");jQuery('#sugerencias'+type).html('');doenter=0;}});}
else if(block==0)
{jQuery('#sugerencias'+type).attr('class',"hidden");jQuery('#sugerencias'+type).html('');}}
function despligas()
{ocultmenu(7);if(jQuery('#subligas').length>0)
{if(jQuery('#subligas_a').length>0)
{jQuery('#subligas_a').attr('class','hidden');jQuery('#menua1_a').attr('class','btndespl');}
if(jQuery('#subligas').hasClass('hidden'))
{var classes=jQuery('#menua1').attr('class');if(classes.search('act')>-1)
{jQuery('#menua1').attr('class','despl btndespl actt');}
else
{jQuery('#menua1').attr('class','btndespl despl');}
jQuery('#subligas').attr('class','');}
else
{ocultligas();}}}
function ocultligas()
{if(!jQuery('#subligas').hasClass('hidden')){if(jQuery('#menua1').hasClass('act'))
jQuery('#menua1').addClass('act').removeClass('despl');else
jQuery('#menua1').removeClass('act').removeClass('despl');jQuery('#subligas').addClass('hidden');}}
function despligas2(type)
{var filter='';if(type&&typeof(type)!='undefined'&&type!=''){filter='[data-type="'+type+'"]';}
ocultmenu(7);if(jQuery('#subligas'+filter).length>0)
{jQuery('div[id="subligas"]').not(filter).each(function(){jQuery(this).addClass('hidden');jQuery(this).parent('li').removeClass('despl');});if(jQuery('#subligas'+filter).hasClass('hidden'))
{elem_menu=filter!=''?jQuery('#subligas'+filter).parent('li'):jQuery('#menua1');var classes=jQuery(elem_menu).toggleClass('despl');jQuery('#subligas'+filter).attr('class','');}else{jQuery('#subligas'+filter).addClass('hidden');jQuery('#subligas'+filter).parent('li').removeClass('despl');}}}
function despligas_paises()
{ocultmenu(7);if(jQuery('#subligas_paises').length>0)
{if(jQuery('#subligas_a').length>0)
{jQuery('#subligas_a').attr('class','hidden');jQuery('#menua30_a').attr('class','btndespl');}
if(jQuery('#subligas_paises').hasClass('hidden'))
{var classes=jQuery('#menua30').attr('class');if(classes.search('act')>-1)
{jQuery('#menua30').attr('class','despl btndespl actt');}
else
{jQuery('#menua30').attr('class','btndespl despl');}
jQuery('#subligas_paises').attr('class','');}
else
{ocultligas_paises();}}}
function ocultligas_paises()
{if(!jQuery('#subligas_paises').hasClass('hidden')){if(jQuery('#menua30').hasClass('act'))
jQuery('#menua30').addClass('act').removeClass('despl');else
jQuery('#menua30').removeClass('act').removeClass('despl');jQuery('#subligas_paises').addClass('hidden');}}
function despmenu(submenu)
{ocultligas();ocultligas_paises();if(jQuery('#submenu'+submenu).length>0)
{if(jQuery('#submenu'+submenu).attr('class')=='submenu hidden')
{jQuery('#menua'+submenu).attr('class','btndespl btncomunidad despl');jQuery('#submenu'+submenu).attr('class','submenu');}
else
{ocultmenu(submenu);}}}
function ocultmenu(submenu)
{if(jQuery('#submenu'+submenu).attr('class')!='submenu hidden')
{jQuery('#menua'+submenu).attr('class','btndespl btncomunidad');jQuery('#submenu'+submenu).attr('class','submenu hidden');}}
function switchStatus()
{jQuery("#status_container").toggleClass("hidden");}
function viewsStatus()
{if(jQuery("#status_noviewed_ids").val()&&jQuery('#userIdLogged').val())
{var url=APP_DIR+'status/view/'+jQuery('#userIdLogged').val()+'/'+jQuery("#status_noviewed_ids").val()+'/'+Math.floor(Math.random()*1000000000);var pars={};var myAjax=jQuery.ajax({type:"GET",url:url,data:pars}).success(function(transport){if(jQuery("#statusnum_div")&&jQuery("#statusnum")&&jQuery("#status_noviewed_ids").length>0)
{jQuery("#statusnum").html("");jQuery("#statusnum_div").addClass("hidden");jQuery("#status_noviewed_ids").val("");}});}}
var username;var connected=0;var lastchecked;function mklogin()
{if(jQuery('#login_rf').length>0)
{jQuery('#login_rf').attr('class','generic_dialog');switchbody(1);if(jQuery('#user_nameL').length>0)
jQuery('#user_nameL').focus();}
else
{if(document.domain!='undefined'&&document.domain=='movil.resultados-futbol.com')
location.href=APP_DIR+'auth/login';}}
function loginKeyEnter(event)
{if(event.which)
{if(event.which==13)
login_user();}
else if(window.event&&window.event.keyCode)
{if(window.event.keyCode==13)
login_user();}}
function mkregister()
{if(jQuery('#login_rf').length>0)
{jQuery('#login_rf').attr('class','generic_dialog');switchbody(2);}}
function mklogout()
{var url=APP_DIR+'ajax/dologout.php';var pars={};var myAjax=jQuery.ajax({type:"POST",url:url,data:pars}).success(function(transport){document.location.reload();});}
function switchbody(body)
{if(body==1)
{jQuery('#form_login').attr('class','dialog_content');jQuery('#form_reg').attr('class','hidden');jQuery('#form_remember').attr('class','hidden');if(jQuery('#user_nameL').length>0)
jQuery('#user_nameL').focus();}
if(body==2)
{jQuery('#form_login').attr('class','hidden');jQuery('#form_reg').attr('class','dialog_content');jQuery('#form_remember').attr('class','hidden');}
if(body==3)
{jQuery('#form_login').attr('class','hidden');jQuery('#form_reg').attr('class','hidden');jQuery('#form_remember').attr('class','dialog_content');if(jQuery('#forgotten_email').length>0)
jQuery('#forgotten_email').focus();}}
function validate(e,inputtext)
{var url=APP_DIR+'registerCheck/'+e;var pars={input1:jQuery('#user_name').val(),input2:jQuery('#email').val(),input3:jQuery('#password').val(),input4:jQuery('#password_confirm').val()};var myAjax=jQuery.ajax({type:"POST",url:url,data:pars}).success(function(transport){if(transport!='')
{jQuery('#input'+e).attr('class','error');jQuery('#inputtext2_1').attr('class','hidden');jQuery('#inputtext2_2').attr('class','hidden');jQuery('#inputtext1_1').attr('class','hidden');jQuery('#inputtext1_2').attr('class','hidden');jQuery('#inputtext1_3').attr('class','hidden');jQuery('#inputtext1_4').attr('class','hidden');jQuery('#inputtext'+transport+"_"+e).attr('class','rer_error');jQuery('#titleref').attr('class','hidden');}
else
{jQuery('#input'+e).attr('class','noerror');if(jQuery('#inputtext1_'+e).length>0)
jQuery('#inputtext1_'+e).attr('class','hidden');if(jQuery('#inputtext2_'+e).length>0)
jQuery('#inputtext2_'+e).attr('class','hidden');if(checkvalidation()==1)
{jQuery('#titleref').attr('class','');}}});}
function login_user()
{jQuery('#iniciosesion').val('cargando');if(jQuery('#userIdLogged').val()!=0)
{alert("Logado previamente");return 0;}
var url=APP_DIR+'ajax/dologin.php';var pars={username:jQuery('#user_nameL').val(),password:jQuery('#passwordL').val()};var myAjax=jQuery.ajax({type:"POST",url:url,data:pars}).success(function(transport){var text=transport;var textParts=text.split('|');var message=textParts[1];if(textParts[0]=="0")
{jQuery('#inputtexterrorlogin').html(message);jQuery('#inputtexterrorlogin').attr('class','rer_error');}
else if(textParts[0]=="1")
{jQuery('#userIdLogged').val(message);jQuery('#login_rf').attr('class','hidden');load_login_events();}
jQuery('#iniciosesion').val("Iniciar sesión");});}
function simple_login_user()
{var url=APP_DIR+'ajax/dologin.php';var pars={username:jQuery('#user_nameL').val(),password:jQuery('#passwordL').val()};var myAjax=jQuery.ajax({type:"POST",url:url,data:pars}).success(function(transport){var text=transport;var textParts=text.split('|');var message=textParts[1];if(textParts[0]=="0")
{jQuery('#inputtexterrorlogin').html(message);jQuery('#inputtexterrorlogin').attr('class','rer_error');}
else if(textParts[0]=="1")
{var url=APP_DIR+'ajax/bebroker_join.php';var pars={userId:textParts[1]};var myAjax=jQuery.ajax({type:"POST",url:url,data:pars}).success(function(transport){var text=transport;var textParts=text.split('|');var message=textParts[1];window.location.reload();});}});}
function checkvalidation()
{if(!jQuery('#inputtext1_1').hasClass('hidden')||!jQuery('#inputtext1_2').hasClass('hidden')||!jQuery('#inputtext2_1').hasClass('hidden')||!jQuery('#inputtext2_2').hasClass('hidden')||!jQuery('#inputtext1_3').hasClass('hidden')||!jQuery('#inputtext1_4').hasClass('hidden'))
return(0);if(jQuery('#user_name').val()==''||jQuery('#email').val()==''||jQuery('#password').val()==''||jQuery('#password_confirm').val()=='')
return(0);return(1);}
function create_user()
{if(jQuery('#userIdLogged').val()!=0)
{alert("Logado previamente");return 0;}
if(checkvalidation()==1)
{jQuery('#login_rf').attr('class','hidden');var url=APP_DIR+'ajax/doregister.php';var pars={username:jQuery('#user_name').val(),email:jQuery('#email').val(),password:jQuery('#password').val(),password_confirm:jQuery('#password_confirm').val(),src:'popup'};var myAjax=jQuery.ajax({type:"POST",url:url,data:pars}).success(function(transport){var text=transport;var textParts=text.split('|');var message=textParts[1];if(textParts[0]=="0")
{jQuery('#login_rf').attr('class','generic_dialog');jQuery('#inputtexterrorregister').html(message);jQuery('#inputtexterrorregister').attr('class','rer_error');}
else if(textParts[0]=="1")
{if(textParts[2])
{load_login_events();var close_message_link='<a href="javascript:void(0);" onclick="document.getElementById(\'login_rf\').className=\'hidden\';" class="form_message_exit">Aceptar <b>»</b></a>';jQuery('#form_reg').attr('class','hidden');jQuery('#form_message_text').html(''+textParts[2]+'<br>'+close_message_link);jQuery('#form_message').attr('class','dialog_content');jQuery('#login_rf').attr('class','generic_dialog');}
else
{jQuery('#userIdLogged').val(message);jQuery('#login_rf').attr('class','hidden');load_login_events();}}});}
else
{alert("Faltan datos para completar el registro");}}
function humanized_time_span(date,ref_date,date_formats,time_units){date_formats=date_formats||{past:[{ceiling:60,text:"Hace $seconds segundos"},{ceiling:3600,text:"Hace $minutes minutos"},{ceiling:86400,text:"Hace $hours horas"},{ceiling:2629744,text:"Hace $days días"},{ceiling:31556926,text:"Hace $months meses"},{ceiling:null,text:"Hace $years años"}],future:[{ceiling:60,text:"en $seconds segundos"},{ceiling:3600,text:"en $minutes minutos"},{ceiling:86400,text:"en $hours horas"},{ceiling:2629744,text:"en $days días"},{ceiling:31556926,text:"en $months meses"},{ceiling:null,text:"en $years años"}]};time_units=time_units||[[31556926,'years'],[2629744,'months'],[86400,'days'],[3600,'hours'],[60,'minutes'],[1,'seconds']];m=date.match(/(\d+)-(\d+)-(\d+) (\d+):(\d+):(\d+)/);ndate=new Date(+m[1],m[2]-1,+m[3],+m[4],+m[5],+m[6]);ref_date=ref_date?new Date(ref_date):new Date();var seconds_difference=(ref_date-ndate)/1000;var tense='past';if(seconds_difference<0){tense='future';seconds_difference=0-seconds_difference;}
function get_format(){for(var i=0;i<date_formats[tense].length;i++){if(date_formats[tense][i].ceiling==null||seconds_difference<=date_formats[tense][i].ceiling){return date_formats[tense][i];}}
return null;}
function get_time_breakdown(){var seconds=seconds_difference;var breakdown={};for(var i=0;i<time_units.length;i++){var occurences_of_unit=Math.floor(seconds/time_units[i][0]);seconds=seconds-(time_units[i][0]*occurences_of_unit);breakdown[time_units[i][1]]=occurences_of_unit;}
return breakdown;}
function render_date(date_format){var breakdown=get_time_breakdown();var time_ago_text=date_format.text.replace(/\$(\w+)/g,function(){return breakdown[arguments[1]];});return depluralize_time_ago_text(time_ago_text,breakdown);}
function depluralize_time_ago_text(time_ago_text,breakdown){for(var i in breakdown){if(breakdown[i]==1){var regexp=new RegExp("\\b"+i+"\\b");time_ago_text=time_ago_text.replace(regexp,function(){return arguments[0].replace(/s\b/g,'');});}}
return time_ago_text;}
return render_date(get_format());}
function swithSessWindow()
{jQuery("#tabSessWindow").toggleClass('hidden');jQuery("#swithSessWindow").toggleClass('act');}
function swithAddContent()
{jQuery("#tabAddContent").toggleClass('hidden');jQuery("#swithAddContent").toggleClass('act');}
var save_button=true;function showact(idc)
{if(jQuery('#response'+idc).attr('class')!='hidden')
{jQuery('#response'+idc).attr('class','hidden');jQuery('#view'+idc).attr('class','');jQuery('#ocu'+idc).attr('class','hidden');jQuery('#li'+idc).attr('class','paddingBottomCm');}
else
{jQuery('#response'+idc).attr('class','');jQuery('#view'+idc).attr('class','hidden');jQuery('#ocu'+idc).attr('class','');jQuery('#li'+idc).attr('class','');}}
function reply(idc)
{var form_list=document.getElementsByClassName('form_contestar');for(var i=0;i<form_list.length;i++)
{var randomnumber=Math.floor(Math.random()*1000001)
form_list[i].action=form_list[i].action+randomnumber+"#comentar";}
if(document.getElementById('formCommentsResponse'+idc).className!='hidden')
{document.getElementById('formCommentsResponse'+idc).className='hidden';document.getElementById('viewR'+idc).className='';document.getElementById('ocuR'+idc).className='hidden';}
else
{document.getElementById('formCommentsResponse'+idc).className='paddingBottomCm';document.getElementById('viewR'+idc).className='hidden';document.getElementById('ocuR'+idc).className='';}}
function save_comment(comment_id)
{if(document.getElementById('userIdLogged').value==0)
{mklogin();return false;}
if(!save_button)
return false;save_button=false;if(comment_id)
{if(document.getElementById('comment_msg_load_'+comment_id))
document.getElementById('comment_msg_load_'+comment_id).className='comment_msg comment_msg_load hidden';if(document.getElementById('comment_msg_error_'+comment_id))
document.getElementById('comment_msg_error_'+comment_id).className='comment_msg comment_msg_error hidden';if(document.getElementById('comment_msg_ok_'+comment_id))
document.getElementById('comment_msg_ok_'+comment_id).className='comment_msg comment_msg_ok hidden';if(document.getElementById('comment_msg_badword_'+comment_id))
document.getElementById('comment_msg_badword_'+comment_id).className='comment_msg comment_msg_error hidden';if(document.getElementById('comment_msg_not_confirmed_'+comment_id))
document.getElementById('comment_msg_not_confirmed_'+comment_id).className='comment_msg comment_msg_error hidden';}
else
{if(document.getElementById('comment_msg_load'))
document.getElementById('comment_msg_load').className='comment_msg comment_msg_load hidden';if(document.getElementById('comment_msg_error'))
document.getElementById('comment_msg_error').className='comment_msg comment_msg_error hidden';if(document.getElementById('comment_msg_ok'))
document.getElementById('comment_msg_ok').className='comment_msg comment_msg_ok hidden';if(document.getElementById('comment_msg_badword'))
document.getElementById('comment_msg_badword').className='comment_msg comment_msg_error hidden';if(document.getElementById('comment_msg_badword'))
document.getElementById('comment_msg_not_confirmed').className='comment_msg comment_msg_error hidden';}
var comment_field='comment';if(comment_id)
comment_field='comment_'+comment_id;if(!document.getElementById(comment_field)||!document.getElementById(comment_field).value)
{if(comment_id)
document.getElementById('comment_msg_error_'+comment_id).className='comment_msg comment_msg_error';else
document.getElementById('comment_msg_error').className='comment_msg comment_msg_error';save_button=true;return false;}
if(comment_id)
document.getElementById('comment_msg_load_'+comment_id).className='comment_msg comment_msg_load';else
{if(document.getElementById('comment_msg_load'))
document.getElementById('comment_msg_load').className='comment_msg rcomment_msg_load';}
var content_type='';var pars={"comment_id":comment_id,"comment":document.getElementById(comment_field).value};var commentslist_pars={};if(document.getElementById('new_content_id')&&document.getElementById('new_content_id').value)
{pars.new_content_id=document.getElementById('new_content_id').value;content_type='new';commentslist_pars.content_id=pars.new_content_id;}
if(document.getElementById('picture_content_id')&&document.getElementById('picture_content_id').value)
{pars.picture_content_id=document.getElementById('picture_content_id').value;content_type='picture';commentslist_pars.content_id=pars.picture_content_id;}
if(document.getElementById('post_content_id')&&document.getElementById('post_content_id').value)
{pars.post_content_id=document.getElementById('post_content_id').value;content_type='post';commentslist_pars.content_id=pars.post_content_id;}
if(document.getElementById('video_content_id')&&document.getElementById('video_content_id').value)
{pars.video_content_id=document.getElementById('video_content_id').value;content_type='video';commentslist_pars.content_id=pars.video_content_id;}
if(document.getElementById('playerId')&&document.getElementById('playerId').value)
{pars.playerId=document.getElementById('playerId').value;content_type='player';commentslist_pars.content_id=pars.playerId;if(document.getElementById('player'))
pars.player=document.getElementById('player').value;if(document.getElementById('player_alias'))
pars.player_alias=document.getElementById('player_alias').value;if(document.getElementById('league_id'))
pars.league_id=document.getElementById('league_id').value;if(document.getElementById('team1'))
pars.team1=document.getElementById('team1').value;if(document.getElementById('team1_alias'))
pars.team1_alias=document.getElementById('team1_alias').value;}
if(document.getElementById('team1')&&document.getElementById('team1').value&&document.getElementById('team2')&&document.getElementById('team2').value)
{content_type='match';if(document.getElementById('team1'))
pars.team1=document.getElementById('team1').value;if(document.getElementById('team2'))
pars.team2=document.getElementById('team2').value;if(document.getElementById('round'))
pars.round=document.getElementById('round').value;if(document.getElementById('league_id'))
pars.league_id=document.getElementById('league_id').value;if(document.getElementById('match_id'))
pars.match_id=document.getElementById('match_id').value;if(document.getElementById('season'))
pars.season=document.getElementById('season').value;commentslist_pars=pars;}
var url=APP_DIR+"comments_common/save";var myAjax=jQuery.ajax({type:"POST",url:url,data:pars}).success(function(transport){if(transport.split("|")[0]==1)
{var mobile_filter=(jQuery('#tab_comment_mobile').hasClass('selected'))?'mobile':'';document.getElementById("comment").value="";reload_commentslist(content_type,commentslist_pars,1,mobile_filter,false,comment_id,true);save_button=true;if(comment_id)
{document.getElementById('comment_msg_load_'+comment_id).className='comment_msg comment_msg_load hidden';document.getElementById('comment_msg_ok_'+comment_id).className='comment_msg comment_msg_ok';}
else
{document.getElementById('comment_msg_load').className='comment_msg comment_msg_load hidden';document.getElementById('comment_msg_ok').className='comment_msg comment_msg_ok';}}
else
{if(transport.split("|")[1]=='bad-words')
{save_button=true;document.getElementById('comment_msg_load').className='comment_msg comment_msg_load hidden';document.getElementById('comment_msg_badword').className='comment_msg comment_msg_error comment_msg_ok';}
else if(transport.split("|")[1]=='not_confirmed')
{save_button=true;document.getElementById('comment_msg_load').className='comment_msg comment_msg_load hidden';document.getElementById('comment_msg_not_confirmed').className='comment_msg comment_msg_error';}}});}
function reload_commentslist(content_type,content_params,page,filter,filter_pars,comment_id,up)
{if(!page)page="1";if(!filter)filter="all";if(!filter_pars)filter_pars="";var url=APP_DIR+"comments_common/reload_commentslist/"+page;var pars={};switch(content_type)
{case'new':case'post':case'picture':case'video':case'player':pars={content_type:content_type,content_params:content_params.content_id};break;case'match':pars.team1=content_params.team1;pars.team2=content_params.team2;pars.league_id=content_params.league_id;pars.round=content_params.round;pars.content_type=content_type;pars.match_id=content_params.match_id;break;default:break;}
pars.filter=filter;pars.filter_pars=filter_pars;pars.page=page;var myAjax=jQuery.ajax({type:"POST",url:url,data:pars}).success(function(transport){document.getElementById("capa-comentarios").innerHTML=transport;load_comments_events();var total_comments=0;var total_reponses=0;if(document.getElementById("total_comments")&&document.getElementById("span_total_comments"))
document.getElementById("span_total_comments").innerHTML=document.getElementById("total_comments").value;if(document.getElementById("total_responses")&&document.getElementById("span_total_responses"))
document.getElementById("span_total_responses").innerHTML=document.getElementById("total_responses").value;var tab_selected='all';if(document.getElementById('comment_filter').value)
tab_selected=document.getElementById('comment_filter').value;document.getElementById('comment_filter').value=filter;jQuery("#tab_comment_"+tab_selected).removeClass('selected');jQuery("#tab_comment_"+filter).addClass('selected');if(up)
document.location.href='#info-comentarios-tips';if(comment_id)
showact(comment_id);});}
function load_responses(comment_id,init,total_responses,filter)
{var url=APP_DIR+"comments_common/load_responses";var pars={comment_id:comment_id,init:init,total_responses:total_responses,filter:filter};var myAjax=jQuery.ajax({type:"POST",url:url,data:pars}).success(function(transport){jQuery('li[class*="respuesta'+comment_id+' ver-mas"]').remove();var old_responses=document.getElementById("response"+comment_id).innerHTML;var new_responses=old_responses+transport;document.getElementById("response"+comment_id).innerHTML=new_responses;});}
function comment_filter_tab(content_type,page,filter)
{if(filter=="mynetwork"||filter=="answerme")
{if(!document.getElementById("userIdLogged").value||(document.getElementById("userIdLogged").value<1))
{mklogin();return true;}}
var content_params={};var filter_pars="";switch(content_type)
{case"new":case"picture":case"video":case"post":content_params.content_id=document.getElementById(content_type+"_content_id").value;break;case"player":content_params.content_id=document.getElementById("playerId").value;break;case"match":if(document.getElementById("team1"))
content_params.team1=document.getElementById("team1").value;if(document.getElementById("team2"))
content_params.team2=document.getElementById("team2").value;if(document.getElementById("league_id"))
content_params.league_id=document.getElementById("league_id").value;if(document.getElementById("round"))
content_params.round=document.getElementById("round").value;if(document.getElementById("match_id"))
{content_params.match_id=document.getElementById("match_id").value;}
break;default:break;}
reload_commentslist(content_type,content_params,page,filter,filter_pars);}
function pagination_action(id)
{var content_type="";var content_params={};var page=id;var filter="all";var filter_pars="";if(document.getElementById("new_content_id")&&document.getElementById("new_content_id").value)
{content_type="new";content_params.content_id=document.getElementById("new_content_id").value;}
if(document.getElementById("post_content_id")&&document.getElementById("post_content_id").value)
{content_type="post";content_params.content_id=document.getElementById("post_content_id").value;}
if(document.getElementById("picture_content_id")&&document.getElementById("picture_content_id").value)
{content_type="picture";content_params.content_id=document.getElementById("picture_content_id").value;}
if(document.getElementById("video_content_id")&&document.getElementById("video_content_id").value)
{content_type="video";content_params.content_id=document.getElementById("video_content_id").value;}
if(document.getElementById("playerId")&&document.getElementById("playerId").value)
{content_type="player";content_params.content_id=document.getElementById("playerId").value;}
if(document.getElementById("team1")&&document.getElementById("team1").value&&document.getElementById("team2")&&document.getElementById("team2").value&&document.getElementById("league_id")&&document.getElementById("league_id").value&&document.getElementById("round")&&document.getElementById("round").value)
{content_type="match";content_params.team1=document.getElementById("team1").value;content_params.team2=document.getElementById("team2").value;content_params.league_id=document.getElementById("league_id").value;content_params.round=document.getElementById("round").value;content_params.match_id=document.getElementById("match_id").value;}
if(document.getElementById("comment_filter")&&document.getElementById("comment_filter").value)
filter=document.getElementById("comment_filter").value;reload_commentslist(content_type,content_params,page,filter,filter_pars,false,true);}
function voteCnt(value_vote,type,content_id)
{if(jQuery('#userIdLogged').val()==0)
{mklogin();}
else
{var iduser=jQuery('#userIdLogged').val();var url=APP_DIR+'ajax/vote.php';var pars={iduser:iduser,value_vote:value_vote,content_type:type,content_id:content_id};var idnum=jQuery('#up'+content_id).html();jQuery('#up'+content_id).parent().width(jQuery('#up'+content_id).parent().width()+'px');jQuery('#up'+content_id).html('-');jQuery('#linkmola'+content_id).addClass('votado').html("Votando");if(jQuery('#voteDiv'+content_id).length>0)
{jQuery('#voteDiv'+content_id).attr('class','hidden');jQuery('#loadingVote'+content_id).attr('class','dmola');}
var myAjax=jQuery.ajax({type:"POST",url:url,data:pars}).success(function(transport){if(transport)
{var text=transport;var text=text.split("|");if(text[0]=="0")
{jQuery('#up'+content_id).html(idnum);alert(text[1]);}
else
{jQuery('#up'+content_id).html(text[1]);}
jQuery('#linkmola'+content_id).html("Votado").parent().width('auto');if(jQuery('#voteDiv'+content_id).length>0)
{jQuery('#loadingVote'+content_id).attr('class','hidden');jQuery('#voteDiv'+content_id).attr('class','dmola');}}});}}
function load_comments_events()
{jQuery('.pagination_link').click(function(){pagination_action(jQuery(this).attr('id'));});if(document.getElementById('userIdLogged').value>=1)
{var link_list=document.getElementsByClassName('nameResponseInput');var totalLink=link_list.length;for(var i=0;i<totalLink;i++)
document.getElementById('nameResponseInput'+i).className='hidden';var link_list2=document.getElementsByClassName('cmtResponseInput hidden');var totalLink2=link_list2.length;for(var i=0;i<totalLink2;i++)
document.getElementById('cmtResponseInput'+i).className='';}}
function window_report_abuse(content_type,content_id)
{document.getElementById("report_content_type").value=content_type;document.getElementById("report_content_id").value=content_id;var options=jQuery(".report_abuse_option");for(i=0;i<options.length;i++)
{if(options[i].value==0)
options[i].checked=true;}
document.getElementById("report_rules").value="";document.getElementById("report_observations").values="";document.getElementById("report_rules").value=0;document.getElementById("window_report_abuse").className="generic_dialog";}
function window_video_disclaimer(content_type,content_id)
{jQuery('#window_video_disclaimer').removeClass('hidden');}
function report_abuse()
{var content_type=document.getElementById("report_content_type").value;var content_id=document.getElementById("report_content_id").value;var report_reason=false;var options=jQuery(".report_abuse_option");for(i=0;i<options.length;i++)
{if(options[i].checked==true)
report_reason=options[i].value;}
var rule="";var observations="";switch(report_reason)
{case'no_rules':var rule=document.getElementById("report_rules").value;break;case'other_reason':observations=document.getElementById("report_observations").value;break;default:jQuery("choice_option").css("color","red");return false;break;}
var url="/ajax/report_abuse.php";var pars={content_type:content_type,content_id:content_id,report_reason:report_reason,rule:rule,observations:observations};var myAjax=jQuery.ajax({type:"POST",url:url,data:pars}).success(function(transport){document.getElementById("window_report_abuse").className="generic_dialog hidden";});}
function closemsg(idfriend)
{jQuery('#status'+idfriend).attr('class','hidden');jQuery('#send_message'+idfriend).attr('class','');}
function add_groupList(idfriend)
{var iduser=jQuery('#userIdLogged').val();jQuery('#txt_per'+idfriend).attr('class','dejargrupos');jQuery('#txt_per'+idfriend).html("cargando");var url=APP_DIR+'ajax/add_group.php';var pars={iduser:iduser,idfriend:idfriend};var myAjax=jQuery.ajax({type:"POST",url:url,data:pars}).success(function(transport){var text=transport;var text=text.split("|");jQuery('#txt_per'+idfriend).html(text[1]);setTimeout("closemsg('"+idfriend+"')",4000);});}
function add_friend(idfriend)
{var iduser=document.getElementById('userIdLogged').value;var url=APP_DIR+'ajax/add_friend.php';var pars={iduser:iduser,idfriend:idfriend};document.getElementById('txt_per'+idfriend).className='dejargrupos';document.getElementById('txt_per'+idfriend).innerHTML='cargando...';var myAjax=jQuery.ajax({type:"POST",url:url,data:pars}).success(function(transport){var text=transport;var text=text.split("|");document.getElementById('txt_per'+idfriend).innerHTML=text[1];setTimeout("closemsgF('"+idfriend+"')",4000);});}
function closemsgF(idfriend)
{document.getElementById('txt_per'+idfriend).className='hidden';}
function report_select_reason(value)
{var options=jQuery(".report_abuse_option");for(i=0;i<options.length;i++)
{if(options[i].value==value)
options[i].checked=true;else
options[i].checked=false;}}
function includeb(arr,obj){for(var i=0;i<arr.length;i++){if(arr[i]==obj)return true;}
return false;}
var status_windows=0;var milliseconds=1000;function close_window()
{if(status_windows==0)jQuery("#user_box").hide();}
var loading_div=0;function user_windows(parent)
{var selector=".userlink";if(parent)selector=parent+" .userlink";jQuery(selector).each(function(){var userId=jQuery(this).attr("rel");jQuery(this).hover(function(e){if(loading_div==0&&jQuery('#userIdLogged').length>0&&jQuery('#userIdLogged').val()>0)
{caller=jQuery(this);loading_div=1;var url="/ajax/userwindow.php";var pars={userId:userId};var myAjax=jQuery.ajax({type:"POST",url:url,data:pars}).success(function(transport){loading_div=0;status_windows=1;if(transport.split("|")[0]!="1")
return true;var html=transport.split("|")[1];jQuery("#user_box").html(html);var lista_friends=false;if(jQuery('#list_friends').length>0&&jQuery('#list_friends').val())
var lista_friends=jQuery('#list_friends').val();if(lista_friends)
{var list_friendsb=lista_friends.split('.');if(jQuery('#userIdLogged').length>0&&jQuery('#userIdLogged').val())
{var aset=includeb(list_friendsb,userId);if(aset)
{jQuery('#ln_user_window1').attr('class',"ui-msg");jQuery('#ln_user_window2').attr('class',"hidden");jQuery('#ln_user_window3').attr('class',"hidden");}
else
{jQuery('#ln_user_window1').attr('class',"hidden");jQuery('#ln_user_window2').attr('class',"ui-friend");jQuery('#ln_user_window3').attr('class',"hidden");}}
else
{jQuery('#ln_user_window2').attr('class',"hidden");jQuery('#ln_user_window3').attr('class',"hidden");}}
else
{jQuery('#ln_user_window2').attr('class',"hidden");jQuery('#ln_user_window3').attr('class',"hidden");}
var curleft=(caller!='undefined'&&caller.offset()!='undefined')?caller.offset()['left']:0;var curtop=(caller!='undefined'&&caller.offset()!='undefined')?caller.offset()['top']:0;jQuery("#user_box").css({display:"block",left:curleft+"px",top:curtop+"px"});jQuery("#user_box").hover(function(e3){status_windows=1;jQuery("#user_box").css({display:"block"});},function(e2){setTimeout("close_window();",milliseconds);status_windows=0;});});}else{}},function(e){setTimeout("close_window();",milliseconds);loading_div=0;status_windows=0;});});}
function common_openmsgbox(userId,userName)
{jQuery("#common_sendmsgbox_to").val(userId);jQuery("#common_sendmsgbox_toField").html(userName);jQuery("#common_sendmsgbox").removeClass("hidden");}
function open_commonbox(title,message)
{jQuery("#commonbox_title").html(title);jQuery("#commonbox_message").html(message);jQuery("#commonbox").removeClass("hidden");}
function common_sendmsg()
{var to=jQuery("#common_sendmsgbox_to").val();var subject=jQuery("#common_sendmsgbox_subject").val();var message=jQuery("#common_sendmsgbox_message").val();if(!to||!message)
{jQuery("#common_sendmsgbox_error_message").html("Los datos introducidos no son correctos.");return true;}
var url="/ajax/common_sendmsg.php";var pars={to:to,subject:subject,message:message};var myAjax=jQuery.ajax({type:"POST",url:url,data:pars}).success(function(transport){if(transport.split("|")[1])
{jQuery("#common_sendmsgbox").addClass("hidden");open_commonbox("Enviar mensaje",transport.split("|")[1]);}
else
jQuery("#common_sendmsgbox_error_message").html(transport.split("|")[1]);});}
function common_addFriend(idfriend)
{var url="/ajax/add_friend.php";var pars={idfriend:idfriend};var myAjax=jQuery.ajax({type:"POST",url:url,data:pars}).success(function(transport){open_commonbox("Agregar amigo",transport.split("|")[1]);});}
function common_report(userId)
{jQuery("#common_report_content_type").val("fa_user");jQuery("#common_report_content_id").val(userId);jQuery("#common_report_abuse").removeClass("hidden");}
function send_common_report()
{var userId=false;}
function common_send_report()
{var content_type=jQuery("#common_report_content_type").val();var content_id=jQuery("#common_report_content_id").val();var report_reason="fa_user";var rule=jQuery("#common_report_rules").val();var observations=jQuery("#common_report_observations").val();var url="/ajax/report_abuse.php";var pars={content_type:content_type,content_id:content_id,report_reason:report_reason,rule:rule,observations:observations};var myAjax=jQuery.ajax({type:"POST",url:url,data:pars}).success(function(transport){if(transport.split("|")[0]=="1")
{jQuery("#common_report_abuse").attr('class',"generic_dialog hidden");open_commonbox("Usuario denunciado","Tu denuncia nos ha llegado correctamente y la revisaremos lo antes posible. Muchas gracias.");var content_type=jQuery("#common_report_content_type").val(0);var content_id=jQuery("#common_report_content_id").val();var rule=jQuery("#common_report_rules").val();var observations=jQuery("#common_report_observations").val();}});}
function bet_events(){if(jQuery('.betlink').length>0){var bet_idx=0;jQuery('.betlink').each(function(){var bet_id=jQuery(this).attr("data-bet");if(jQuery('#bet_'+bet_id).length>0)
{jQuery(this).unbind("click");jQuery(this).click(function(){if(jQuery('#bet_'+bet_id).hasClass('hidden')){jQuery('.league-match-events').addClass('hidden');jQuery('tr[id^="bet_"]').addClass('hidden');jQuery('tr[id^="channels_"]').addClass('hidden');jQuery('#bet_'+bet_id).removeClass('hidden');jQuery('tr .more-box').removeClass('active');jQuery(this).addClass('active');}else{jQuery('#bet_'+bet_id).addClass('hidden');jQuery('tr .more-box').removeClass('active');}});}});bet_id=jQuery('.betlink:not(.partidos-destacados .betlink)').first().attr('data-bet');jQuery('#bet_'+bet_id).toggleClass('hidden');}}
function channel_events(){if(jQuery('.channelslink').length>0){var bet_idx=0;jQuery('.channelslink').each(function(){var bet_id=jQuery(this).attr("data-channels");if(jQuery('#channels_'+bet_id).length>0)
{jQuery(this).unbind("click");jQuery(this).click(function(){if(jQuery('#channels_'+bet_id).hasClass('hidden')){jQuery('.league-match-events').addClass('hidden');jQuery('tr[id^="bet_"]').addClass('hidden');jQuery('tr[id^="channels_"]').addClass('hidden');jQuery('#channels_'+bet_id).removeClass('hidden');jQuery('tr .more-box').removeClass('active');jQuery(this).addClass('active');}else{jQuery('#channels_'+bet_id).addClass('hidden');jQuery('tr .more-box').removeClass('active');}});}});}}
function match_events(){if(jQuery('.eventslink').length>0){var match_idx=0;jQuery('.eventslink').each(function(){var match_id=jQuery(this).attr("data-events");if(jQuery('.league-match-events[data-match="'+match_id+'"]').length>0)
{jQuery(this).unbind("click");jQuery(this).click(function(){if(jQuery('.league-match-events[data-match="'+match_id+'"]').hasClass('hidden')){jQuery('.league-match-events').addClass('hidden');jQuery('tr[id^="bet_"]').addClass('hidden');jQuery('tr[id^="channels_"]').addClass('hidden');jQuery('.league-match-events[data-match="'+match_id+'"]').removeClass('hidden');jQuery('tr .more-box').removeClass('active');jQuery(this).addClass('active');}else{jQuery('.league-match-events[data-match="'+match_id+'"]').addClass('hidden');jQuery('tr .more-box').removeClass('active');}});}});}}
function check_time_zone()
{var date_month_labels=new Array("Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic");var date_month_labels_long=new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");var date_days_labels_long=new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");var link_list=document.getElementsByClassName('chk_hour');var length_array=link_list.length;var rightNow=new Date();var minuteDifference=(-1)*(rightNow.getTimezoneOffset()+60);var hours_time=Math.ceil(minuteDifference/60);var hour_diff=minuteDifference%60;var minutes_time=0;if(hour_diff>0)
minutes_time=minuteDifference-(60*hours_time);for(var i=0;i<length_array;i++)
{var last_time=link_list[i].innerHTML;if(last_time!="-"){last_time=last_time.split(':');var new_hour=parseInt(last_time[0])+hours_time;var new_minute=parseInt(last_time[1])+minutes_time;if(new_minute>60){new_minute=new_minute-60;new_hour++;}
if(new_hour<0){new_hour=24-Math.abs(new_hour);if(jQuery(link_list[i])){var matchid=jQuery(link_list[i]).attr('data-matchid');if(matchid&&jQuery('#date-match-'+matchid)){var date_match=jQuery('#date-match-'+matchid).attr('data-date');var new_date=new Date(date_match);var new_date_day=new_date.getDate();var new_date_month=new_date.getMonth();new_date_month=new_date_month&&date_month_labels[new_date_month]?date_month_labels[new_date_month]:"";var new_date_year=String(new_date.getFullYear()).substr(2,2);jQuery('#date-match-'+matchid).html(new_date_day+' '+new_date_month+' '+new_date_year);}
if(matchid&&jQuery('#date-match-complete-'+matchid)){var dateMatch=jQuery('#date-match-complete-'+matchid).attr("content");if(dateMatch){var newDate=new Date(dateMatch);var newDay=newDate.getDate();var newMonth=newDate.getMonth();newMonth=newMonth&&date_month_labels_long[newMonth]?date_month_labels_long[newMonth]:"";var newWeekDay=newDate.getDay();newWeekDay=newWeekDay&&date_days_labels_long[newWeekDay]?date_days_labels_long[newWeekDay]:"";var newYear=newDate.getFullYear();jQuery('#date-match-complete-'+matchid).html(newWeekDay+", "+newDay+" "+newMonth+" "+newYear);}}}}
if(new_hour>23)
new_hour=new_hour-23;if(new_hour<10)
new_hour="0"+new_hour;if(new_minute<10)
new_minute="0"+new_minute;var new_time=new_hour+":"+new_minute;link_list[i].className=link_list[i].className+' chk_hour';link_list[i].innerHTML=new_time;}}}
function mod_calendar_events(){jQuery(".next").on('click',function(){var next_month=jQuery("#mod-calendar-next").attr("data-month");var next_year=jQuery("#mod-calendar-next").attr("data-year");jQuery.get(APP_DIR+"xhr/calendar/"+next_year+"/"+next_month,{},function(response){jQuery("#mod-calendar").html(response);mod_calendar_events();});});jQuery(".prev").on('click',function(){var prev_month=jQuery("#mod-calendar-prev").attr("data-month");var prev_year=jQuery("#mod-calendar-prev").attr("data-year");jQuery.get(APP_DIR+"xhr/calendar/"+prev_year+"/"+prev_month,{},function(response){jQuery("#mod-calendar").html(response);mod_calendar_events();});});}
jQuery(window).load(function(){if(jQuery('body').hasClass('body_cortes')&&document.domain=='cortes.res.com'){var urlprod=document.URL.replace('cortes.res.com','www.resultados-futbol.com');jQuery('body').append('<a href="'+urlprod+'" target="_blank" style="position: fixed;left: 0;bottom: 20px;z-index: 999;background: red;color: white;font-size: 11px;padding: 5px;">VER EN PRODUCCIÓN</a>');}else if(jQuery('body').hasClass('body_cortes')&&document.domain=='cortes.res.es'){var urlprod=document.URL.replace('cortes.res.es','www.resultados-futbol.com');jQuery('body').append('<a href="'+urlprod+'" target="_blank" style="position: fixed;left: 0;bottom: 20px;z-index: 999;background: red;color: white;font-size: 11px;padding: 5px;">VER EN PRODUCCIÓN</a>');}
var browser=get_browser_info();ffx_closed=getCookie('ffx_closed');if(browser!='undefined'&&(jQuery('body').hasClass('body_cortes')||jQuery('body').hasClass('jobs-template'))&&browser.name&&browser.name=='Firefox'&&browser.version&&browser.version>23&&!(ffx_closed=="true")){jQuery('#web >.web-width').first().prepend('<div class="ffx-sidebar" style="display: none;"><div class="ffxs-content"><h6>Instala la nueva barra lateral de <b>Resultados de Fútbol</b> en tu Firefox</h6><p>No te pierdas los partidos más importantes, y sigue navegando como siempre.</p><a class="button" href="http://www.resultados-futbol.com/static/mobile/firefox.php" title="Activa la sidebar de Firefox" data-description="No te pierdas los partidos más importantes, y sigue navegando como siempre.">Activar ahora</a><i class="note">sólo para Firefox</i></div><div class="background-ffxs"></div><a href="javascript:;" class="ffx-close" onclick="ffx_close();"><span class="flaticon-close"></span></a></div>');ffx_position();}});jQuery(window).resize(function(){ffx_position();});function ffx_close(){jQuery('.ffx-sidebar').remove();ffx_setCookie('ffx_closed','true',30);}
function get_browser_info(){var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[];if(/trident/i.test(M[1])){tem=/\brv[ :]+(\d+)/g.exec(ua)||[];return{name:'IE ',version:(tem[1]||'')};}
if(M[1]==='Chrome'){tem=ua.match(/\bOPR\/(\d+)/)
if(tem!=null){return{name:'Opera',version:tem[1]};}}
M=M[2]?[M[1],M[2]]:[navigator.appName,navigator.appVersion,'-?'];if((tem=ua.match(/version\/(\d+)/i))!=null){M.splice(1,1,tem[1]);}
return{name:M[0],version:M[1]};}
function ffx_position(){var ffx_left=jQuery('#web > .web-width').first().offset().left+jQuery('#web > .web-width').width()+10;if(ffx_left>0&&(jQuery(window).width()>(jQuery('#web > .web-width').first().width()+jQuery('.ffx-sidebar').width()*2))){jQuery('.ffx-sidebar').removeClass('ffx-sidebar-right').css({'left':ffx_left,'right':'auto'}).show();}else{jQuery('.ffx-sidebar').addClass('ffx-sidebar-right').show();}}
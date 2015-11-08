/**
 *  Facebook Copy Link View
 *  @Author Ping-Win (c) Performgroup
 *
 */
 
 TS.Modules.facebookLink  = {
  moduleName: 'facebookLink',
  // CONFIG
  config: {},
  autoInit: true,
  layout: $('.fb-link'),
  closeBtn: $('.fb-close-button'),
  
  init: function()
  {
    E.bindEvent(E.SET_FACEBOOKBAR_POS, TS.Modules.facebookLink.moduleName, this.setPosition, this);
    E.bindEvent(E.SHOW_FACEBOOKBAR, TS.Modules.facebookLink.moduleName, this.showFacebookLink, this);
    E.bindEvent(E.HIDE_FACEBOOKBAR_POS, TS.Modules.facebookLink.moduleName, this.hideFacebookLink, this);
    E.bindEvent(E.EVENT_LOCALE_FILE_LOADED  , this.moduleName, this.onLocaleFileLoaded, this);
    E.bindEvent( E.EVENT_SET_VIDEOSRC	, this.moduleName, this.setURL	, this );

    this.closeBtn.click( this.hideFacebookLink );
  },
  
  onLocaleFileLoaded : function(source, eventData)
  {
     var closeText = TS.Modules.localizationService.getLocaleText("close");
    
     $("#fb-close-button").text(closeText);
  },
  
  showFacebookLink: function()
  {
    TS.Modules.facebookLink.layout.show();
  },
  
  hideFacebookLink: function()
  {
    TS.Modules.facebookLink.layout.hide();
  },
  
  setPosition: function()
  {
    this.layout.css('bottom', $('#videoControls').height()+'px');
  },
  
  setURL: function( event, data )
  {
    var video = TS.Modules.PlaylistModel;

    var url = TS.Modules.CustomRulesModel.getFacebookAppURL ( video.id, video.title );
    $('.fb-input-field').val( url );
  }
  

};
 
function FacebookCopyLink()
{
    var fbLayout = '<div class="fb-link">' +
      '  <div class="fb-link-bg">' +
      '     <div class="fb-close-button">Close</div>'+
      '     <input type="text" class="fb-input-field" />'+
      '   </div>'+
      '</div>';
    
    this.init( fbLayout );
}


FacebookCopyLink.prototype.setChannelID = function( _channel )
{
    this.currentChannelID = _channel;
};

FacebookCopyLink.prototype.init = function( _layout ) {
    var layout = $(_layout);  
    this.dom = layout;

    layout.find('.fb-input-field').click(function() {
      $(this).focus();
      $(this)[0].setSelectionRange(0, 9999);
    }).keypress(function(event) {
      event.preventDefault();
    });

    

    layout.find('.fb-close-button').click(function() {
      new EventDispatcher().trigger(EVENT_COPY_LINK_OFF);
    });
};

FacebookCopyLink.prototype.updateLink = function( videoID, videoTitle ) {    
    var channelID = GLOBAL_CONFIG_MODEL.currentChannelID;
    
    videoTitle = StringUtils.replaceSlashes(videoTitle);
    
    var updateLink = CUSTOM_RULES.getFacebookAppURL(videoID, videoTitle);
    
    $(".fb-input-field").val(updateLink);
    
    
    var isShareEnabled = CUSTOM_RULES.isFacebookShareEnabled();
    
    if(isShareEnabled)
    {
      getGoogleURL(updateLink, 
      function( _url ){
          $(".fb-input-field").val(_url.id);
      });

    	$("#copyLink").css("opacity", "1");
  		$("#copyLink").css("cursor", "pointer");
    }
    else
    {
    	$("#copyLink").css("opacity", "0.5");
  		$("#copyLink").css("cursor", "default");
    }
};


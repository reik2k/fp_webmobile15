TS.Modules.closeAdView  = {
  moduleName: 'closeAdView',
  // CONFIG
  config: {},
  autoInit: false,
  smallControls: false,
  closeButton: $('#ad_close'),
  
  init: function() {
 
    if(TS.Modules.CustomRulesModel.getRule("isAdClosingEnabled")){
      if(typeof this.closeButton == "undefined") this.closeButton = $('#ad_close');  
      E.bindEvent( E.EVENT_AD_REQUEST   , this.moduleName, this.adStarted , this );
      E.bindEvent( E.EVENT_AD_ENDED   , this.moduleName, this.adEnded , this );

      this.closeButton.on('click',this.onCloseClick)   
    }
  },
  adCloseTimer:{},
  adStarted: function(){
      var delay = TS.Modules.CustomRulesModel.getRule("adCloseDelay"); 
      this.adCloseTimer = setTimeout(this.onAdCloseTime,delay); 
  },
  onAdCloseTime: function(){
     clearTimeout(this.adCloseTimer);
     if(typeof this.closeButton == "undefined") 
      {
        this.closeButton = $('#ad_close');
      }  
     this.closeButton.css('display','block');
  },
  adEnded: function(){
    clearTimeout(this.adCloseTimer);
    this.closeButton.css('display','none');
  },
  onCloseClick: function(){
    clearTimeout(this.adCloseTimer);
    TS.Modules.closeAdView.closeButton.css('display','none');
    try{
      TS.Modules.videoView.player.currentTime = TS.Modules.videoView.player.duration;
    }
    catch(e)
    {
      console.log("Skipping ad failed:" + e);
    }

  }
  
 };
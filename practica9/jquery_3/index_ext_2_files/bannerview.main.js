TS.Modules.bannerview  = {
  moduleName: 'bannerview',
  
  config: {},
  autoInit: false,
  
  callback: null,
  flashVars: null,

  banners:[],
  bannerObject:null,
  
  defaultBannerImage:"http://images.eplayer.performgroup.com/namedImage/151/Premier_League_News_CENTRE_380x60_correct.jpg",
  defaultBannerLink: "",
  adtechBannerLink : "",

  init : function()
  {
    this.bannerHeight   = TS.Modules.initialize.getBannerViewHeight();
    this.videoWidth    	= TS.Modules.initialize.config.videoWidth;
    this.videoHeight  	= TS.Modules.initialize.config.videoHeight;

    $("#bannerDIV").append('<div id="adtechDiv"><img id="adtechBanner" src="" alt=""/><div id="adtechFlashContent"></div></div>');
    $("#bannerDIV").width(this.videoWidth);
    $("#bannerDIV").height(this.bannerHeight);
    $("#bannerView").height(this.bannerHeight);
    $("#bannerView")  .on   ("click touchstart"  , this.onClick);
    $("#adtechBanner").on   ("click touchstart"  , this.onAdtechClick);
    $("#adtechBanner").on   ("load"              , this.onAdtechBannerLoaded);
    $("#bannerDIV").css("cursor", "pointer");

    $("#adtechDiv").hide();
    $("#adtechDiv").css("position"      , "absolute");
    $("#adtechDiv").css("top"           , "0");
    $("#adtechDiv").css("width"         , "100%");
    $("#adtechFlashContent").css("position"      , "absolute");
    $("#adtechFlashContent").css("top"           , "0");
    $("#adtechFlashContent").css("width"         , "100%");
    $("#adtechFlashContent").css("height"        , this.bannerHeight + "px");

    E.bindEvent(E.SET_BANNER                        , this.moduleName   , this.onPlaylistLoaded , this );
    E.bindEvent(E.EVENT_WINDOW_RESIZED	            , this.moduleName   , this.onWindowResized	, this);
    E.bindEvent(E.EVENT_FULLSIZE_ON	                , this.moduleName   , this.onFullSizeOn	    , this);
    E.bindEvent(E.EVENT_FULLSIZE_OFF	            , this.moduleName   , this.onFullSizeOff	, this);
    E.bindEvent(E.EVENT_HELIOS_LOAD_OK	            , this.moduleName   , this.onHeliosLoadOK	, this);
    E.bindEvent(E.EVENT_HELIOS_LOAD_NO_VALID_DATA	, this.moduleName   , this.onHeliosLoadError, this);
    E.bindEvent(E.EVENT_HELIOS_LOAD_NO_DATA	        , this.moduleName   , this.onHeliosLoadError, this);

    this.setBanner();
  },

  onHeliosLoadOK : function (source, eventData)
  {
      $("#adtechDiv").hide();

      if(TS.Modules.AdtechModel.image.indexOf(".swf") > -1)
      {
          $("#adtechDiv").show();
          $("#adtechBanner").hide();
          $("#adtechBanner").attr("src", "");
          $("#adtechFlashContent").empty();
          $("#adtechFlashContent").show();
          $("#adtechFlashContent").flash(TS.Modules.AdtechModel.image);
          $("#adtechFlashContent object").width("100%");
          $("#adtechFlashContent object").height("100%");
          $("#adtechFlashContent embed").width("100%");
          $("#adtechFlashContent embed").height("100%");
      }
      else
      {
          $("#adtechDiv").show();
          $("#adtechBanner").show();
          $("#adtechFlashContent").hide();
          $("#adtechFlashContent").empty();
          $("#adtechBanner").attr("src", this.getImageWithTimeStamp());
      }
  },

  getImageWithTimeStamp: function ()
  {
     var ret = TS.Modules.AdtechModel.image;

    if(ret.indexOf("?") > -1)
    {
        ret += "&" + "" + (new Date()).getTime();
    }
    else
    {
        ret += "?" + "" + (new Date()).getTime();
    }

    return ret;
  },

  onAdtechBannerLoaded : function ()
  {
      TS.Modules.bannerview.setAdtechStyle();
  },

  setAdtechStyle : function ()
  {
      $("#adtechDiv").show();
      this.setAdtechHorizontalAlignment();
      this.setAdtechVerticalAlignment();
      this.setAdtechBackground();

  },

  setAdtechVerticalAlignment: function ()
  {
        switch (TS.Modules.AdtechModel.verticalAlignment.toLowerCase())
        {
            case "middle" :
                $("#adtechBanner").css("margin-top", this.getAdtechMiddlePosition() + "px");
                break;
            case "bottom" :
                $("#adtechBanner").css("margin-top", this.getAdtechBottomPosition() + "px");
                break;
            default       :
                $("#adtechBanner").css("margin-top", "0");
                break;
        }
  },

  setAdtechHorizontalAlignment : function ()
  {
    switch (TS.Modules.AdtechModel.horizontalAlignment.toLowerCase())
    {
        case "right"  :
            $("#adtechDiv").css("text-align", "right");
            break;
        case "center" :
            $("#adtechDiv").css("text-align", "center");
            break;
        default       :
            $("#adtechDiv").css("text-align", "left");
            break;
    }
  },

  setAdtechBackground: function ()
  {
        if (TS.Modules.AdtechModel.fillBackground.toLowerCase() === "true")
        {
            $("#adtechDiv").css("background", "");

            var style = $("#adtechDiv").attr("style");
            var colors = TS.Modules.AdtechModel.backgroundColor.split(",");

            if (colors.length >= 2)
            {
                var startColor  = "#" + colors[0].trim();
                var endColor    = "#" + colors[1].trim();

                switch (TS.Modules.AdtechModel.gradientOrientation.toLowerCase()) {
                    case "topbottom" :
                        $("#adtechDiv").attr("style", style + ";" + this.getVerticalGradient(startColor, endColor));
                        break;
                    case "bottomtop" :
                        $("#adtechDiv").attr("style", style + ";" + this.getVerticalGradient(endColor, startColor));
                        break;
                    case "leftright" :
                        $("#adtechDiv").attr("style", style + ";" + this.getHorizontalGradient(startColor, endColor));
                        break;
                    case "rightleft" :
                        $("#adtechDiv").attr("style", style + ";" + this.getHorizontalGradient(endColor, startColor));
                        break;
                }
            }
            else if (colors.length == 1)
            {
                var startColor = "#" + colors[0].trim();

                $("#adtechDiv").css("background-color", startColor);
            }
            else
            {
                $("#adtechDiv").css("background", "rgba(0,0,0,0)");
            }
        }
        else
        {
            $("#adtechDiv").css("background", "rgba(0,0,0,0)");
        }
  },

  getHorizontalGradient : function (startColor, endColor)
  {
    var ret = "background: -moz-linear-gradient(left,  #000000 0%, #ffffff 100%);" +
        "background: -webkit-gradient(linear, left top, right top, color-stop(0%,#000000), color-stop(100%,#ffffff));" +
        "background: -webkit-linear-gradient(left,  #000000 0%,#ffffff 100%);" +
        "background: -o-linear-gradient(left,  #000000 0%,#ffffff 100%);" +
        "background: -ms-linear-gradient(left,  #000000 0%,#ffffff 100%);" +
        "background: linear-gradient(to right,  #000000 0%,#ffffff 100%);" +
        "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#ffffff',GradientType=1);";

      return this.replaceStarEndColors(ret, startColor, endColor);
  },

  getVerticalGradient : function (startColor, endColor)
  {
      var ret = "background: -moz-linear-gradient(top, #000000 0%, #ffffff 100%);" +
          "background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#000000), color-stop(100%,#ffffff));" +
          "background: -webkit-linear-gradient(top, #000000 0%,#ffffff 100%);      " +
          "background: -o-linear-gradient(top, #000000 0%,#ffffff 100%);      " +
          "background: -ms-linear-gradient(top, #000000 0%,#ffffff 100%);" +
          "background: linear-gradient(to bottom, #000000 0%,#ffffff 100%);" +
          "filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#ffffff',GradientType=0 );";

      return this.replaceStarEndColors(ret, startColor, endColor);
  },

  replaceStarEndColors: function (ret, startColor, endColor)
  {
      ret = ret.replace(new RegExp("#000000", "g"), startColor);
      ret = ret.replace(new RegExp("#ffffff", "g"), endColor);
      return ret;
  },

    getAdtechMiddlePosition: function ()
  {
        return (this.bannerHeight - $("#adtechBanner")[0].height) / 2;
  },

  getAdtechBottomPosition: function ()
  {
        return this.bannerHeight - $("#adtechBanner")[0].height;
  },

  onHeliosLoadError : function ()
  {
      $("#adtechDiv").hide();
      $("#adtechBanner").attr("src", "");
  },

  onFullSizeOn : function ()
  {
      $("#bannerDIV").css("display", "none");
  },

  onFullSizeOff : function ()
  {
      $("#bannerDIV").css("display", "");
  },

  onWindowResized : function (source, eventData)
  {
    this.videoWidth    	= TS.Modules.initialize.config.videoWidth;
    this.videoHeight  	= TS.Modules.initialize.config.videoHeight;

    $("#bannerDIV").width(this.videoWidth);
    
    this.setBanner();
  },
  
  onPlaylistLoaded : function (source, eventData)
  {
    this.banners = [];
    
    if(eventData.banners instanceof Array)
      this.banners = eventData.banners;
    else
      this.banners[0] = eventData.banners;
    
    this.setBanner();
  },
  onClick : function ()
  {
  		window.open(this.bannerLink);
  },

  onAdtechClick : function ()
  {
        window.open(TS.Modules.AdtechModel.link);
  },

  setBanner:function()
  {
  
    //set default bannerObject if there is only 1 banner then it will be the 1st element of the banners array
    // if there is only 1 banner it is passed over as the 1st element of the array
    this.bannerObject = {};
    this.bannerObject.image = (this.banners && this.banners[0] && this.banners[0].image) ? this.banners[0].image : this.defaultBannerImage;
    this.bannerObject.link = (this.banners && this.banners[0] && this.banners[0].link) ? this.banners[0].link : this.defaultBannerLink;
    this.selectedBannerIndex = 0;
    
    //select bannerObject according to size
    if(TS.Modules.initialize.config.videoWidth < 260 && this.banners && this.banners[0] && this.banners[0].image){
       this.bannerObject = this.banners[0];
       this.updateBannerView();
       return; 
    }
    if(TS.Modules.initialize.config.videoWidth < 340 && this.banners && this.banners[1] && this.banners[1].image){
       this.bannerObject = this.banners[1];
       this.updateBannerView();
       return; 
    }
    if(TS.Modules.initialize.config.videoWidth < 500 && this.banners && this.banners[2] && this.banners[2].image){
       this.bannerObject = this.banners[2];
       this.updateBannerView();
       return; 
    }
    if(TS.Modules.initialize.config.videoWidth < 620 && this.banners && this.banners[3] && this.banners[3].image){
       this.bannerObject = this.banners[3];
       this.updateBannerView();
       return; 
    }
    if(TS.Modules.initialize.config.videoWidth >= 790 && this.banners && this.banners[4] && this.banners[4].image){
       this.bannerObject = this.banners[4];console.log(this.banners);
       this.updateBannerView();
       return; 
    }
    this.updateBannerView();
  },
  updateBannerView:function(){
    //update view
    $("#bannerView")[0].bannerLink = this.bannerObject.link;
    $("#bannerView").attr("src", this.bannerObject.image);
    
    //strech the banner only if there are more banner sizes
    if(this.banners.length > 1)
       $("#bannerView").css("width",TS.Modules.initialize.config.videoWidth);
    else  
       $("#bannerView").css("width","");
  },
  onNavBarStartVideo : function (source, eventData)
  {
	  var style = GLOBAL_CONFIG_MODEL.styles;
	  
	  this.bannerImage   = style.bannerImage;
	  this.bannerLink   = style.bannerLink;
	  
	  this.setBannerSource();
  }
}
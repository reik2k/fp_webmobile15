TS.Modules.carouselview  = {
  moduleName: 'carouselview',
  // CONFIG
  config: {},
  autoInit: false,
  structureModel: {},
  isVideoPlaying : false,
  
  init: function( )
  {
    this.arabicMode = false;
    this.carousel = $("#navBar");
    this.dom = this.carousel;
    this.tabHolder = $("#navigationBar div.tabHolder");
    this.navBarEnabled = true;
    
    this.navigationBar = $('#navigationBar');
    this.mainCarousel = $('#carousel');
    this.carouselContainer = $('#carousel-container');
    this.carouselCanvas = $('#carousel-canvas');
    this.carouselHolder = $('#carousel-holder');
    this.videoWidth = TS.Modules.initialize.config.videoWidth;
    this.videoHeight = TS.Modules.initialize.config.videoHeight;
    
    this.backButton = $("#backButton");
    this.leftButton = $("#carousel .leftArrow");
    this.rightButton = $("#carousel .rightArrow");
    this.thumbMask = $("#navBarView .thumbs");
    this.thumbHolder = $("#carousel-canvas");
    this.pageText = $("#carousel .pageText");
    this.infoText = $("#carousel span.infoText");
    this.toggleViewBtn = $("#carousel a.toggleViewButton");
    
    this.defaultThumbHolderWidth = (TS.Modules.initialize.config.videoWidth - 44);
    this.thumbsDefaultItemPerPage = 3;
    this.listDefaultItemPerPage = 3;
    this.videoThumbCount = 0;
    this.thumbWidth = 0;
    this.carouselHolderHeight;
    this.defaultChannelID = TS.Modules.initialize.config.configObject.defaultChannel;
    this.structureModel = {};
    this.topicIndex = 0;
    this.categoryIndex = 0;
    this.channelIndex = 0;
    this.videoIndex = 0;
    this.level = 3;
    this.listView = TS.Modules.CustomRulesModel.getRule("startWithTextState");
    this.totalThumbs = 0;
    this.miniType = false;
    this.miniCutLength = 0;
    this.overlayOpened = false;
    this.LIST_ITEM_WIDTH = 400;
    this.LIST_ROW_COUNT = 3;
    this.lastLoadedChannelInfo = {};
    this.isPagingEnabled = true;

    this.colors = {
      dark: '#02529b',
      middle: '#048ccb',
      light: '#49c5d9',
      thumbNailColor: '#49c5d9',
      arrowColor: '#49c5d9',
      bottomLineColor:'#49c5d9'
    };

    this.resources ={
      selectVideo: "Select a video:",
      genreSelectText: "Select a topic:",
      categorySelectText: "Select a category:",
      channelSelectText: "Select a channel:",
      formattedPosition: "{0}-{1} OF {2}"
    }
    
    this.height;
    this.arrowWidth = 22;
    this.thumbHeight;
    this.thumbWidth;
    this.thumbElemWidth;
    this.thumbElemHeight;
    this.thumbElemMargin;
    this.listElemWidth;
    this.listCollumCount;
    this.top = this.getVideoBrowserTopPosition();
    this.carouselOpenPosition;
    

    this.pageCount = 0;
    this.pageIndex = 0;
    
    
    this.leftButton.click( this.onLeftClicked );
    this.rightButton.click( this.onRightClicked );
    this.backButton.click(this.onBackCklick);

    this.playerType = TS.Modules.initialize.config.flashVars.playerType;
    
    
    //ePlayer1
    if(this.playerType == "eplayer1"){
      this.thumbsDefaultItemPerPage = 2;
      this.listDefaultItemPerPage = 3;
      this.listCollumCount = 2;
      
      this.height = 120;
      this.arrowWidth = 22;
      this.thumbHeight = this.height - 20;
      this.thumbWidth = parseInt(this.videoWidth) - 2 * this.arrowWidth;
      this.thumbElemWidth = 60;
      this.thumbElemHeight = 56;
      this.carouselHolderHeight = 62;
      this.carouselHolder.css('height',this.carouselHolderHeight);

      this.carouselOpenPosition = this.videoHeight - 78;
    }
    //ePlayer2
    else if( this.playerType == "eplayer2" ) {
      
      this.thumbsDefaultItemPerPage = 3;
      this.listDefaultItemPerPage = 3;
      this.listCollumCount = 2;
      
      this.height = 120;
      this.arrowWidth = 22;
      this.thumbHeight = this.height - 20;
      this.thumbWidth = parseInt(this.videoWidth) - 2 * this.arrowWidth;
      this.thumbElemWidth = 72;
      this.thumbElemHeight = 66;
      this.carouselHolderHeight = 62;
    }
    //ePlayer3
    else if( this.playerType == "eplayer3" ) {
      this.thumbsDefaultItemPerPage = 3;
      this.listDefaultItemPerPage = 3;
      this.listCollumCount = 2;
      
      this.height = 120;
      this.arrowWidth = 22;
      this.thumbHeight = this.height - 20;
      this.thumbWidth = parseInt(this.videoWidth) - 2 * this.arrowWidth;
      this.thumbElemWidth = 99;
      this.thumbElemHeight = 55;
      this.carouselHolderHeight = 62;
    }
    //ePlayer4
    else if( this.playerType == "eplayer4" ) {
      this.thumbsDefaultItemPerPage = 5;
      this.listDefaultItemPerPage = 3;
      this.listCollumCount = 2;
      
      this.height = 120;
      this.arrowWidth = 22;
      this.thumbHeight = this.height - 20;
      this.thumbWidth = parseInt(this.videoWidth) - 2 * this.arrowWidth;
      this.thumbElemWidth = 99;
      this.thumbElemHeight = 55;
      this.carouselHolderHeight = 62;
    }
    //ePlayer5 OVERLAY
    else if( this.playerType == "eplayer5" ) {
      this.thumbsDefaultItemPerPage = 3
      this.listDefaultItemPerPage = 3;
      this.listCollumCount = 2;
      
      this.height = 130;
      this.arrowWidth = 22;
      this.thumbHeight = this.height - 20;
      this.thumbWidth = parseInt(this.videoWidth) - 2 * this.arrowWidth;
      this.thumbElemWidth = 76;
      this.thumbElemHeight = 75;

      this.carouselOpenPosition = this.videoHeight - 78;
    }
    //ePlayer6 MINI!!!
    else if( this.playerType == "eplayer6" ) {
      this.thumbsDefaultItemPerPage = 2;
      this.listDefaultItemPerPage = 3;
      this.listCollumCount = 2;
      
      this.height = 120;
      this.arrowWidth = 22;
      this.thumbHeight = this.height - 20;
      this.thumbWidth = parseInt(this.videoWidth) - 2 * this.arrowWidth;
      this.thumbElemWidth = 60;
      this.thumbElemHeight = 56;
      
      var newWidth = parseInt(this.videoWidth);
      this.navigationBar.css('width',newWidth);
      
      $("#navBar .view-btn").css("display","none");
      this.miniType = true;
      this.miniCutLength = 14;
    }
    //ePlayer7
    else if( this.playerType == "eplayer7" ) {
      this.thumbsDefaultItemPerPage = 4;
      this.listDefaultItemPerPage = 3;
      this.listCollumCount = 2;
      
      this.height = 120;
      this.arrowWidth = 22;
      this.thumbHeight = this.height - 20;
      this.thumbWidth = parseInt(this.videoWidth) - 2 * this.arrowWidth;
      this.thumbElemWidth = 99;
      this.thumbElemHeight = 55;
    }
    //ePlayer8
    else if( this.playerType == "eplayer8" ) 
    {
      this.thumbsDefaultItemPerPage = 3
      this.listDefaultItemPerPage = 3;
      this.listCollumCount = 2;
      
      this.height = 130;
      this.arrowWidth = 22;
      this.thumbHeight = this.height - 20;
      this.thumbWidth = parseInt(this.videoWidth) - 2 * this.arrowWidth;
      this.thumbElemWidth = 76;
      this.thumbElemHeight = 75;
    }
    //ePlayer9
    else if( this.playerType == "eplayer9" ){
      this.hideNavbar();
    }
    //ePlayer10 MINI!!!
    else if( this.playerType == "eplayer10" ) {
      this.thumbsDefaultItemPerPage = 2;
      this.listDefaultItemPerPage = 3;
      this.listCollumCount = 2;
      
      this.height = 100;
      this.arrowWidth = 22;
      this.thumbHeight = this.height - 20;
      this.thumbWidth = parseInt(this.videoWidth) - 2 * this.arrowWidth;
      this.thumbElemWidth = 60;
      this.thumbElemHeight = 56;
      
      var newWidth = parseInt(this.videoWidth)+44;
      this.navigationBar.css('width',"225px");
      
      $("#navBar .view-btn").css("display","none");
      $("#navBar .head").css("height",18);
      $("#navBar .infoText").css("font-size","9px");
      $("#navBar .infoText").css("position","relative");
      $("#navBar .infoText").css("top","-3px");
      $("#carousel").css("overflow","hidden");
      this.rightButton.css("position","relative");
      this.rightButton.css("top","-8px");
      this.rightButton.css("z-index","-1");
      this.leftButton.css("position","relative");
      this.leftButton.css("top","-8px");
      this.rightButton.css("z-index","0");
      this.miniType = true;
      this.miniCutLength = 25;
      this.carouselOpenPosition = this.videoHeight - 78;
    }
    //ePlayer11
    else if( this.playerType == "eplayer11" ) {
      this.thumbsDefaultItemPerPage = 2;
      this.listDefaultItemPerPage = 3;
      
      this.height = 120;
      this.arrowWidth = 22;
      this.thumbHeight = this.height - 20;
      this.thumbWidth = parseInt(this.videoWidth) - 2 * this.arrowWidth;
      this.thumbElemWidth = 56;
      this.thumbElemHeight = 56;
      this.listCollumCount = 1;
      this.carouselOpenPosition = this.videoHeight - 78;
    }
    //ePlayer12
    else if( this.playerType == "eplayer12" ) {
      this.thumbsDefaultItemPerPage = 3;
      this.listDefaultItemPerPage = 3;
      
      this.height = 120;
      this.arrowWidth = 22;
      this.thumbHeight = this.height - 20;
      this.thumbWidth = parseInt(this.videoWidth) - 2 * this.arrowWidth;
      this.thumbElemWidth = 60;
      this.thumbElemHeight = 56;
      this.listCollumCount = 1;
      
    }
    //ePlayer13
    else if( this.playerType == "eplayer13" ) {
      this.thumbsDefaultItemPerPage = 3;
      this.listDefaultItemPerPage = 3;
      
      this.height = 120;
      this.arrowWidth = 22;
      this.thumbHeight = this.height - 20;
      this.thumbWidth = parseInt(this.videoWidth) - 2 * this.arrowWidth;
      this.thumbElemWidth = 60;
      this.thumbElemHeight = 56;
      this.listCollumCount = 1;
      this.carouselOpenPosition = this.videoHeight - 78;
    }
    //ePlayer14
    else if( this.playerType == "eplayer14" ||  this.playerType == "eplayer40" ||  this.playerType == "eplayer45") {
      this.thumbsDefaultItemPerPage = 3;
      this.listDefaultItemPerPage = 3;

      this.height = 120;
      this.arrowWidth = 22;
      this.thumbHeight = this.height - 20;
      this.thumbWidth = parseInt(this.videoWidth) - 2 * this.arrowWidth;
      this.thumbElemWidth = 81;
      this.thumbElemHeight = 70;
      this.listCollumCount = 2;
    }
    //ePlayer15
    else if( this.playerType == "eplayer15" ||  this.playerType == "eplayer41" || this.playerType == "eplayer46" || this.playerType == "eplayer50" || this.playerType == "eplayer48") {
      this.thumbsDefaultItemPerPage = 3;
      this.listDefaultItemPerPage = 3;
      
      this.height = 120;
      this.arrowWidth = 22;
      this.thumbHeight = this.height - 20;
      this.thumbWidth = parseInt(this.videoWidth) - 2 * this.arrowWidth;
      this.thumbElemWidth = 80;
      this.thumbElemHeight = 56;
      this.listCollumCount = 2;
      this.carouselOpenPosition = this.videoHeight - 78;
    }
    //ePlayer16
    else if( this.playerType == "eplayer16" ) {
      this.thumbsDefaultItemPerPage = 5;
      this.listDefaultItemPerPage = 3;
      
      this.height = 120;
      this.arrowWidth = 22;
      this.thumbHeight = this.height - 20;
      this.thumbWidth = parseInt(this.videoWidth) - 2 * this.arrowWidth;
      this.thumbElemWidth = 89;
      this.thumbElemHeight = 74;
      this.listCollumCount = 1;
    }
    //ePlayer17
    else if( this.playerType == "eplayer17" ) {
      this.thumbsDefaultItemPerPage = 5;
      this.listDefaultItemPerPage = 3;
      
      this.height = 120;
      this.arrowWidth = 22;
      this.thumbHeight = this.height - 20;
      this.thumbWidth = parseInt(this.videoWidth) - 2 * this.arrowWidth;
      this.thumbElemWidth = 80;
      this.thumbElemHeight = 56;
      this.listCollumCount = 1;
      this.carouselOpenPosition = this.videoHeight - 78;
    }
    //ePlayer20
    else if( this.playerType == "eplayer20" ) {
      this.thumbsDefaultItemPerPage = 4;
      this.listDefaultItemPerPage = 3;
      
      this.height = 120;
      this.arrowWidth = 22;
      this.thumbHeight = this.height - 20;
      this.thumbWidth = parseInt(this.videoWidth) - 2 * this.arrowWidth;
      this.thumbElemWidth = 85;
      this.thumbElemHeight = 56;
      this.listCollumCount = 1;
      this.carouselOpenPosition = this.videoHeight - 78;
    }
    //ePlayer21
    else if( this.playerType == "eplayer21" || this.playerType == "eplayer31")
    {
      this.thumbsDefaultItemPerPage = 4;
      this.listDefaultItemPerPage = 3;
      
      this.height = 120;
      this.arrowWidth = 22;
      this.thumbHeight = this.height - 20;
      this.thumbWidth = parseInt(this.videoWidth) - (2 * this.arrowWidth);
      this.thumbElemWidth = 91;
      this.thumbElemHeight = 55;
      this.listCollumCount = 1;
    }
    //ePlayer22
    else if( this.playerType == "eplayer22" ) {
      this.hideNavbar();
    }
    //ePlayer23
    else if( this.playerType == "eplayer23" ) {
      this.hideNavbar();
    }
    //ePlayer24
    else if( this.playerType == "eplayer24" ) {
      this.hideNavbar();
    }
    //ePlayer25
    else if( this.playerType == "eplayer25" ) {
      this.hideNavbar();
    }
    //ePlayer26
    else if( this.playerType == "eplayer26" ) {
      this.hideNavbar();
    }
    //ePlayer27
    else if( this.playerType == "eplayer27" ) {
      this.hideNavbar();
    }
    //ePlayer28
    else if( this.playerType == "eplayer28"  ||  this.playerType == "eplayer42") {
      this.hideNavbar();
    }
    //ePlayer29
    else if( this.playerType == "eplayer29"  ||  this.playerType == "eplayer43"  ||  this.playerType == "eplayer47") {
      this.thumbsDefaultItemPerPage = 3;
      this.listDefaultItemPerPage = 3;
      
      this.height = 120;
      this.arrowWidth = 22;
      this.thumbHeight = this.height - 20;
      this.thumbWidth = parseInt(this.videoWidth) - 2 * this.arrowWidth;
      this.thumbElemWidth = 91;
      this.thumbElemHeight = 55;
      this.listCollumCount = 2;
      this.carouselOpenPosition = 91;
    }
    //ePlayer30
    else if(this.playerType == "eplayer30"  ||  this.playerType == "eplayer44")
    { 
      this.hideNavbar();
    }

    this.listElemWidth      = this.thumbWidth / this.listCollumCount;
    this.thumbElemMargin    = Math.floor((this.defaultThumbHolderWidth - this.thumbsDefaultItemPerPage * (this.thumbElemWidth + 2)) / (this.thumbsDefaultItemPerPage+1));

    this.setStyles();

    E.bindEvent(E.EVENT_LOCALE_FILE_LOADED  , this.moduleName, this.onLocaleFileLoaded  , this);
    E.bindEvent(E.EVENT_STRUCTURE_LOADED    , this.moduleName, this.onStructureLoaded   , this );
    E.bindEvent(E.EVENT_WINDOW_RESIZED      , this.moduleName, this.onWindowResized     , this );
    E.bindEvent(E.EVENT_FULLSIZE_ON	        , this.moduleName, this.onFullSizeOn	    , this);
    E.bindEvent(E.EVENT_FULLSIZE_OFF	    , this.moduleName, this.onFullSizeOff	    , this);
    E.bindEvent(E.EVENT_START_VIDEO	        , this.moduleName, this.onVideoStarted		, this);
    E.bindEvent(E.EVENT_VIDEO_END	        , this.moduleName, this.onVideoEnded		, this);
    E.bindEvent(E.SHOW_VIDEO_OVERLAY	    , this.moduleName, this.onShowOverlay		, this);
    E.bindEvent(E.HIDE_VIDEO_OVERLAY	    , this.moduleName, this.onHideOverlay		, this);
    E.bindEvent(E.EVENT_FULLSCREEN_CHANGED  , this.moduleName, this.onFullscreenChanged , this);

    TS.Modules.ClickTouchHelper.addClickListener($("#browser"), this.onVideoBrowserClick);

    this.initLocaleTexts();
    this.initArabicMode();
    this.calculateSizes();
    this.setVideoBrowserImage();
    this.setVideoBrowserButtonDisplay();
  }, // INIT END

  setStyles : function()
  {
      this.carousel .css("position" ,'absolute');
      this.carousel .css("width"    ,this.videoWidth    + "px");
      this.carousel .css("height"   ,this.height        + "px");
      this.thumbMask.css("width"    ,this.thumbWidth    + "px");
      this.thumbMask.css("height"   ,this.thumbHeight   + "px");
  },

  onShowOverlay : function ()
  {
    this.refreshBrowserButton();
  },

  onHideOverlay : function ()
  {
    this.refreshBrowserButton();
  },

  onVideoStarted : function ()
  {
    this.isVideoPlaying = true;
    this.refreshBrowserButton();
  },

  onVideoEnded : function ()
  {
    this.isVideoPlaying = false;
  },

  calculateSizes : function()
  {
      if(TS.Modules.ConfigModel.isResponsivePlayer() && this.thumbElemWidth)
      {
          this.videoWidth    	        = TS.Modules.initialize.config.videoWidth;
          this.videoHeight  	        = TS.Modules.initialize.config.videoHeight;
          this.defaultThumbHolderWidth  = this.videoWidth - 44;
          this.top                      = this.getVideoBrowserTopPosition();
          this.thumbWidth               = parseInt(this.videoWidth) - 2 * this.arrowWidth;
          this.carouselOpenPosition     = this.getVideoBrowserOpenTopPosition();
          this.listElemWidth            = this.thumbWidth / this.listCollumCount;
          this.thumbsDefaultItemPerPage = Math.floor(this.defaultThumbHolderWidth / (this.thumbElemWidth * 1.5));
          this.thumbsDefaultItemPerPage = this.thumbsDefaultItemPerPage > 6 ? 6 : this.thumbsDefaultItemPerPage;
          this.thumbElemMargin          = Math.floor((this.defaultThumbHolderWidth - this.thumbsDefaultItemPerPage * (this.thumbElemWidth + 2)) / (this.thumbsDefaultItemPerPage+1));
          //this.listCollumCount          = Math.floor(this.defaultThumbHolderWidth / this.LIST_ITEM_WIDTH)
          //this.listDefaultItemPerPage   = this.LIST_ROW_COUNT * this.listCollumCount;
      }
  },

  getVideoBrowserTopPosition : function ()
  {
      var ret = this.videoHeight + TS.Modules.ConfigModel.controlBarHeight;

      if(TS.Modules.ConfigModel.isOverlayPlayer())
      {
          ret = this.videoHeight;
      }

      return ret;
  },

  getVideoBrowserOpenTopPosition : function ()
  {
    var carBarHeight = parseInt($("#navigationBar").outerHeight(true, true)) + parseInt($("#carousel").outerHeight(true, true));
    var ret          = this.videoHeight - carBarHeight;

    if(TS.Modules.ConfigModel.isResponsivePlayer())
    {
      ret = this.videoHeight - carBarHeight;
    }

    if(TS.Modules.carouselview.playerType == "eplayer47")
    {
        ret -= TS.Modules.ConfigModel.getControlBarHeight();
    }

    return ret;
  },

  onWindowResized : function (source, eventData)
  {
      this.calculateSizes();

      if(this.overlayOpened)
      {
          this.carousel.css('top', this.carouselOpenPosition);
      }
      else
      {
          this.carousel.css("top", this.top);
      }

      this.setStyles();
      this.drawContent();
      this.refreshBrowserButton();
  },

    onFullSizeOn : function ()
    {
        this.isFullSizeOn = true;

        if(this.navBarEnabled)
        {
            $("#navBar").css("display", "none");
        }

        this.refreshBrowserButton();
    },

    onFullSizeOff : function ()
    {
        this.isFullSizeOn = false;

        if(this.navBarEnabled)
        {
            $("#navBar").css("display", "");
        }

        this.refreshBrowserButton();
    },

  refreshBrowserButton : function()
  {
      if(TS.Modules.ConfigModel.isVideoBrowserPlayer() && this.isFullScreen())
      {
          $("#browser").css("display", "none");
          $("#browser").css("opacity", "0");
          $("#browser").css("cursor", "default");
      }
      else if(TS.Modules.ConfigModel.isVideoBrowserPlayer() && !this.isFullScreen())
      {
          $("#browser").css("display", "block");
          $("#browser").css("opacity", "1");
          $("#browser").css("cursor", "pointer");
      }
  },

  isFullScreen : function()
  {
    return this.isFullSizeOn || TS.Modules.FullscreenService.isFullscreenOn();
  },
  
  initArabicMode : function()
  {
    if(TS.Modules.countryChecker.isArabic())
    {
        this.tabHolder .css("float", "right");
        this.backButton.css("float", "left");
        
        this.arabicMode = true;
    }
  },
  
  initLocaleTexts : function()
  {
    var service = TS.Modules.localizationService;
        
    this.resources.selectVideo          = service.getLocaleText("selectVideo");
    this.resources.genreSelectText      = service.getLocaleText("genreSelectText");
    this.resources.categorySelectText   = service.getLocaleText("categorySelectText");
    this.resources.channelSelectText    = service.getLocaleText("channelSelectText");
    this.resources.formattedPosition    = service.getLocaleText("formattedPosition");

    var info = this.resources.genreSelectText;

    if (this.level == 1)
    {
      info = this.resources.categorySelectText;
    }
    else if (this.level == 2)
    {
      info = this.resources.channelSelectText;
    }
    else if (this.level == 3)
    {
      info = this.resources.selectVideo;
    }

    this.infoText.text(info);

    if ($(".ver1 span:first-child").length > 0)
    {
        $(".ver1 span:first-child").text(service.getLocaleText("Guide"));
    }

    try
    {
        this.drawTabs();
    }
    catch(error)
    {
        //nothing to do
    }
  },
  
  onLocaleFileLoaded : function(source, eventData)
  {
     this.initLocaleTexts();
  },

  
  hideNavbar: function(){
    this.carousel.hide();
    this.navBarEnabled = false;
  },

  
  onStructureLoaded: function(event, data)
  {
    TS.Modules.carouselview.structureModel = data.structure;
    TS.Modules.carouselview.setStartIndexes();
    TS.Modules.carouselview.initialize();
  },
   
  setStartIndexes: function() {
    structure = this.structureModel
    if(this.defaultChannelID != -1) {
      for(var i = 0; i < structure.length; i++)
      {
        var genres = structure[i];
        
        if (!$.isArray(genres.category))
        {
          genres.category = [genres.category];
        }
          
        for(var j = 0; j < genres.category.length; j++)
        {
          var category = genres.category[j];
          
          if (!$.isArray(category.channel))
          {
            category.channel = [category.channel];
          }
          
          for(var k = 0; k < category.channel.length; k++)
          {
            var channel = category.channel[k];
            if(channel.id.toLowerCase() == this.defaultChannelID.toLowerCase())
            {
              this.topicIndex = i;
              this.categoryIndex = j;
              this.channelIndex = k;
            }
          }
        }
      }  
    }
  },

  saveLastLoadedChannelInfo : function()
  {
      this.lastLoadedChannelInfo.topicIndex      = this.topicIndex;
      this.lastLoadedChannelInfo.categoryIndex   = this.categoryIndex;
      this.lastLoadedChannelInfo.channelIndex    = this.channelIndex;
  },

  initialize: function(  )
  {
    this.saveLastLoadedChannelInfo();
    this.drawTabs();
    TS.Modules.mrssService.init(
      this.structureModel[this.topicIndex].category[this.categoryIndex].channel[this.channelIndex],
      this.thumbsDefaultItemPerPage,
      0,
      this.drawContent,
      true
    );
    if( this.navBarEnabled )
      this.carousel.show();
    // drawContent();
  },
  
  drawTabs: function()
  {
    if(!this.structureModel)
    {
      $.trace.error("Carousel::DrawingTabs::Wrong StructureModel");
      return;
    }
    this.tabHolder.empty();
    var tabElem = '<a class="ver1 tabElem"' + this.getArabicStyle() +  '><span style="background-color:'+this.colors.dark+';">' + this.getLocaleTextNavbar('Guide') + '</span><span class="tri" style="border-color:transparent transparent transparent '+this.colors.dark+';"></span></a>';
    // var tabElem = '<div class="tabElem"><p>Guide</p></div>';
    this.tabHolder.append(tabElem);
    var info = this.resources.genreSelectText;
    for( var l = 1; l <= this.level; l++ ){
      var title = "";
      
      if(l == 1)
      {
        title = this.getLocaleTextNavbar(this.structureModel[this.topicIndex].name);
        info  = this.resources.categorySelectText;
      }
      else if(l == 2)
      {
        title = this.getLocaleTextNavbar(this.structureModel[this.topicIndex].category[this.categoryIndex].name);
        info  = this.resources.channelSelectText;
      }
      else if(l == 3)
      {
        title = this.structureModel[this.topicIndex].category[this.categoryIndex].channel[this.channelIndex].name;
        //mini
        if(this.miniType) title = title.substring(0,this.miniCutLength) + "..." 
        
        title = this.getLocaleTextNavbar(title);
        
        info = this.resources.selectVideo;
      }
      var tabElemCount = $('.tabElem').length;
      if(l == 1){
        tabElem = '<a class="ver'+(tabElemCount+1)+' tabElem"' + this.getArabicStyle() +  '><span class="tri-white" style="background-color:'+this.colors.middle+';"></span><span style="background-color:'+this.colors.middle+';">'+title+'</span><span class="tri" style="border-color:transparent transparent transparent '+this.colors.middle+';"></span></a>';
      }
      else if(l == 2){
        tabElem = '<a class="ver'+(tabElemCount+1)+' tabElem"' + this.getArabicStyle() +  '><span class="tri-white" style="background-color:'+this.colors.light+';"></span><span style="background-color:'+this.colors.light+';">'+title+'</span><span class="tri" style="border-color:transparent transparent transparent '+this.colors.light+';"></span></a>';
      }
      
      else if(l == 3){
        tabElem = '<span class="selected">'+title+'</span>';
      }
      
      this.tabHolder.append(tabElem);
    }
    
    if(this.arabicMode)
    {
        $(".tri").remove();
        $(".tri-white").remove();
       
        $(".ver1").css("background-color", $(".ver1 span").css("background-color"));
        $(".ver2").css("background-color", $(".ver2 span").css("background-color"));
        $(".ver3").css("background-color", $(".ver3 span").css("background-color"));
       
        $(".ver3")      .css("margin-right", "5px");
        $(".selected") .css("margin-right", "10px");
        
        if(this.level == 0)
        {
            $(".ver1 span").before("<img src='i/Eplayer/arrow_arabic2.png' style='float:left;position:relative;left:-2px'/>");
        }
        else if(this.level == 1)
        {
            $(".ver1 span").before("<img src='i/Eplayer/arrow_arabic.png' style='float:left;position:relative;left:-2px'/>");
            $(".ver2 span").before("<img src='i/Eplayer/arrow_arabic2.png' style='float:left;position:relative;left:-2px'/>");
        }
        else
        {
            $(".ver1 span").before("<img src='i/Eplayer/arrow_arabic.png' style='float:left;position:relative;left:-2px'/>");
            $(".ver2 span").before("<img src='i/Eplayer/arrow_arabic.png' style='float:left;position:relative;left:-2px'/>");
            $(".ver3 span").before("<img src='i/Eplayer/arrow_arabic2.png' style='float:left;position:relative;left:-2px'/>");
        }
        
    }
    
    $(".tabElem").click(this.tabClick);
    this.infoText.text(info);
    
    if(this.level == 3){
      this.backButton.css("display","none");
    }
    else {
      this.backButton.css("display","block");
    }
  },
    
  getLocaleTextNavbar : function(text)
  {
  	var ret = TS.Modules.localizationService.getLocaleText(text);
  	
  	return ret;
  },
  
  getArabicStyle : function()
  {
      var ret = "";
      
      if(this.arabicMode)
      {
          ret = " style='float:right'";
      }
      
      return ret;
  },
  
  toggleOverlay: function()
  {
    var modul = TS.Modules.carouselview;
    if( modul.overlayOpened ){
        modul.overlayOpened = false;
        modul.carousel.css("top",modul.top);

      if( !TS.Modules.navigation.isAdvertisement && modul.isVideoPlaying)
      {
        TS.Modules.videoView.play();
      }

      E.trigger(E.HIDE_VIDEO_OVERLAY, TS.Modules.videoView.moduleName, {});
    }
    else
    {
      modul.overlayOpened           = true;
      modul.carouselOpenPosition    = modul.getVideoBrowserOpenTopPosition();

      modul.carousel.css('top', modul.carouselOpenPosition);

      if( !TS.Modules.navigation.isAdvertisement && modul.isVideoPlaying)
      {
        TS.Modules.videoView.pause();
      }

      E.trigger(E.SHOW_VIDEO_OVERLAY, TS.Modules.videoView.moduleName, {});
    }

    modul.setVideoBrowserImage();
  },

  onVideoBrowserClick : function()
  {
      if(!TS.Modules.carouselview.isFullScreen())
      {
          TS.Modules.carouselview.toggleOverlay();
      }
  },

  onFullscreenChanged : function()
  {
    if(TS.Modules.carouselview.overlayOpened)
    {
        TS.Modules.carouselview.toggleOverlay();
    }
  },

  setVideoBrowserImage : function ()
  {
      if(TS.Modules.carouselview.overlayOpened)
      {
          $("#browserIcon").attr("class", "browserIconClose");
      }
      else
      {
          $("#browserIcon").attr("class", "browserIconOpen");
      }
  },

  setVideoBrowserButtonDisplay : function ()
  {
    if(TS.Modules.ConfigModel.isVideoBrowserPlayer())
    {
        $("#browser").css("opacity", "1");
    }
    else
    {
        $("#browser").remove();
    }
  },

  tabClick: function() {
    var index = $(this).index();
    TS.Modules.carouselview.level = parseInt(index);
    
    if(index < 2)
      TS.Modules.carouselview.listView = true;
      
    TS.Modules.carouselview.drawTabs();
    TS.Modules.carouselview.drawContent();
    $.trace.log("tabClick "+index);
  },

  drawContent: function()
  {
    TS.Modules.carouselview.thumbHolder.empty();
    TS.Modules.carouselview.thumbHolder.css('left','0px');

    this.pageIndex = 0;

    if( TS.Modules.carouselview.level == 0 )
    {
        TS.Modules.carouselview.listView = true;
        TS.Modules.carouselview.videoIndex = -1;
        TS.Modules.carouselview.drawTopicList();
    }
    else if( TS.Modules.carouselview.level == 1 )
    {
        TS.Modules.carouselview.listView = true;
        TS.Modules.carouselview.videoIndex = -1;
        TS.Modules.carouselview.drawCategoryList();
    }
    else if( TS.Modules.carouselview.level == 2 )
    {
        TS.Modules.carouselview.listView = false;
        TS.Modules.carouselview.videoIndex = -1;
        TS.Modules.carouselview.drawChannelThumbs();
    }
    else if( TS.Modules.carouselview.level == 3 )
    {
        TS.Modules.carouselview.listView = false;
        TS.Modules.carouselview.drawVideoThumbs();
    }

    TS.Modules.carouselview.setListElemsToArabic();
    TS.Modules.carouselview.setSelectedThumb();

    if(TS.Modules.carouselview.colors && TS.Modules.carouselview.colors.light){
      $(".postClipTime").css("background-color", TS.Modules.carouselview.colors.light);
    }

    TS.Modules.carouselview.disableTouchControls();
  },
  
  onBackCklick: function()
  {
    var view = TS.Modules.carouselview;

    view.topicIndex      = view.lastLoadedChannelInfo.topicIndex;
    view.categoryIndex   = view.lastLoadedChannelInfo.categoryIndex;
    view.channelIndex    = view.lastLoadedChannelInfo.channelIndex;
    view.level           = 3;
    view.listView        = false;

    view.thumbHolder.stop(true,true);
    view.thumbHolder.css("left", "0");
    view.drawTabs();
    view.drawContent();
  },
  
  drawTopicList: function() 
  {
    // removeInsertedLists();
    $(this.thumbHolder).html('<ul class="list-view" style="width:'+this.defaultThumbHolderWidth+'px !important">');
    var structure = this.structureModel;
    var structureModelLength = structure.length;
    for(var i = 0;i < structureModelLength;i++) {
      var listElem = '<li><a class="listElem" rel="'+i+'"><span style="color:'+this.colors.light+'">'+(i+1)+'</span> '+structure[i].name+'</a></li>';
      this.thumbHolder.find('ul').append(listElem);
      // END UL
      var ulRestart = '</ul><ul class="list-view" style="width:'+this.defaultThumbHolderWidth+'px !important">';
      if((i+1)%this.listDefaultItemPerPage===0 && i<structureModelLength)this.thumbHolder.append(ulRestart);
    }
    $(".listElem").css("width",this.thumbWidth + "px");
    // END UL
    var ulEnd = '</ul>';
    this.totalThumbs = this.thumbHolder.find('li').length;
    this.pageCount = Math.floor((i -1)/this.listDefaultItemPerPage);
    $(".listElem").off("click").on("click",this.elemClickHandler);

    TS.Modules.carouselview.setListElemsToArabic();
  },
  
  drawCategoryList: function() {
    // removeInsertedLists();
    $(this.thumbHolder).html('<ul class="list-view" id="insert" style="width:'+this.defaultThumbHolderWidth+'px !important">');
    var collumn = 0;
    var row = 0;
    var structure = this.structureModel[this.topicIndex];

    var categoryLength = structure.category.length;
    for(var i = 0;i<categoryLength;i++){
      var listElem = '<li><a class="listElem" rel="'+i+'"><span style="color:'+this.colors.light+'">'+(i+1)+'</span> '+structure.category[i].name+'</a></li>';
      this.thumbHolder.find('ul:last').append(listElem);
      // END UL
      var ulRestart = '</ul><ul class="list-view" style="width:'+this.defaultThumbHolderWidth+'px !important">';
      if((i+1)%this.listDefaultItemPerPage===0 && i<categoryLength)this.thumbHolder.append(ulRestart);
    }
    var ulEnd = '</ul>';
    this.thumbHolder.find('ul').append(ulEnd);
    $(".listElem").css("width",this.thumbWidth + "px");
    $(".listElem").off("click").on("click",this.elemClickHandler);
    this.totalThumbs = this.thumbHolder.find('li').length;
    this.pageCount = Math.ceil(i / this.listDefaultItemPerPage);

    var newWidth = (this.pageCount + 1) * TS.Modules.ConfigModel.width;
    this.thumbHolder.css('width', newWidth);
    
    TS.Modules.carouselview.setListElemsToArabic();
  },
  
  drawChannelList: function(){
    // removeInsertedLists();
    this.thumbHolder.html('<ul class="list-view" id="insert" style="width:'+this.defaultThumbHolderWidth+'px !important">');
    var collumn = 0;
    var row = 0;
    var structure = this.structureModel[this.topicIndex].category[this.categoryIndex];
    var chanellLength = structure.channel.length;
    for(var i = 0;i<chanellLength;i++){
      var listElem = '<li><a class="listElem" rel="'+i+'"><div style="color:'+this.colors.light+'">'+(i+1)+'</div> '+structure.channel[i].name+'</a></li>';
      this.thumbHolder.find('ul:last').append(listElem);
      // END UL
      var ulRestart = '</ul><ul class="list-view" style="width:'+this.defaultThumbHolderWidth+'px !important">';
      if((i+1)%this.listDefaultItemPerPage===0 && i<chanellLength)this.thumbHolder.append(ulRestart);
    }
    var ulEnd = '</ul>';
    this.thumbHolder.find('ul:last').append(ulEnd);
    $(".listElem").css("width",this.thumbWidth + "px");
    $(".listElem").off("click").on("click",this.elemClickHandler);
    this.totalThumbs = this.thumbHolder.find('li').length;
    this.pageCount = Math.ceil(i / this.listDefaultItemPerPage);

    var newWidth = (this.pageCount + 1) * TS.Modules.ConfigModel.width;

    this.thumbHolder.css('width', newWidth);
    
    TS.Modules.carouselview.setListElemsToArabic();
  },
  
  drawChannelThumbs: function()
  {
    // removeInsertedLists();
    var currWidth = this.defaultThumbHolderWidth;
    var structure = this.structureModel[this.topicIndex].category[this.categoryIndex];
    this.thumbHolder.html('<ul class="thumb-view" id="insert" style="width:'+this.defaultThumbHolderWidth+'px !important">');
    var chanellLength = structure.channel.length;
    for(var i = 0;i<chanellLength;i++){
      var listElem = '<li style="border-color:'+this.colors.light+'">'+
      '<a class="listElem" rel="'+i+'">'+
        '<img src="'+structure.channel[i].thumbnail+'" alt="'+structure.channel[i].name+'" style="height:'+this.thumbElemHeight+'px; width:100%" />'+
        '<div><label>'+structure.channel[i].name+'</label></div>'+
      '</a></li>';
      this.thumbHolder.find('ul:last').append(listElem);
      // END UL
      var ulRestart = '</ul><ul class="thumb-view" style="width:'+this.defaultThumbHolderWidth+'px !important">';
      if((i+1)%this.thumbsDefaultItemPerPage===0 && i<chanellLength)this.thumbHolder.append(ulRestart);
      //thumbHolder.append(thumbElem);
    }
    this.pageCount = Math.ceil(i / this.thumbsDefaultItemPerPage);
    var ulEnd = '</ul>';
    this.thumbHolder.find('ul').append(ulEnd);
    
    $('#carousel-canvas li').css('width',this.thumbElemWidth+'px');
    $('#carousel-canvas li img').css('width',this.thumbElemWidth+'px');
    
    $('#carousel-canvas li').css('margin','0 0 0 '+(this.thumbElemMargin)+'px');
    $('#carousel-canvas li:last-of-type').css('margin','0 0 0 '+(this.thumbElemMargin)+'px');
    
    
    this.totalThumbs = this.thumbHolder.find('li').length;
    var newWidth = (this.pageCount + 1) * TS.Modules.ConfigModel.width;
    this.thumbHolder.css('width', newWidth);
    $(".listElem").off("click touchend").on("click touchend",this.elemClickHandler);
    
    TS.Modules.carouselview.setListElemsToArabic();
  },

  drawVideoThumbs: function()
  {
    var currWidth = this.thumbHolder.width();
    this.thumbHolder.html('<ul class="thumb-view" id="insert" style="width:'+this.defaultThumbHolderWidth+'px !important">');
    
    var structure       = this.structureModel[this.topicIndex].category[this.categoryIndex].channel[this.channelIndex];
    var rowsLength      = structure.list.length;
    var rows            = structure.list;
    var videoThumbCount = 0;

    for(var i = 0;i<rowsLength;i++)
    {
      var thumbnailURL = "";
      var duration = "00:00";
      
      if(rows[i] && rows[i].thumbnail && rows[i].thumbnail.url)
      {
        thumbnailURL = rows[i].thumbnail.url;
      }

      var listElem = '<li style="border-color:'+ TS.Modules.carouselview.colors.thumbNailColor +'" class="videoThumb">'+
      '<a class="listElem" rel="'+i+'">'+
          '<img src="'+thumbnailURL+'" alt="'+rows[i].title+'" style="height:'+this.thumbElemHeight+'px !important; width:100%" />'+
          '<div class="thumbLabel" style="width:100%"><label>'+rows[i].title+'</label>' +
          '<span class="postClipTime" >' + TS.Modules.carouselview.getDuration(rows[i]) + '</span>' +
          '<img class="postClipLittlePlay" src="i/Eplayer/play.png">';
          '</div>'+
        '</a></li>';
      this.thumbHolder.find('ul:last').append(listElem);

      videoThumbCount = $('li.videoThumb').length;

      // END UL
      var ulRestart = '</ul><ul data-count="'+ i + '" class="thumb-view" style="width:'+this.defaultThumbHolderWidth+'px !important">';
      if((i+1)%this.thumbsDefaultItemPerPage===0 && i<rowsLength)this.thumbHolder.append(ulRestart);
    }
    this.totalThumbs = structure.count ? structure.count : structure.items;
    structure.count = this.totalThumbs;

    this.pageCount = Math.ceil(this.totalThumbs / this.thumbsDefaultItemPerPage);

    var ulEnd = '</ul>';
    this.thumbHolder.find('ul').append(ulEnd);

    $('#carousel-canvas li').css('width',this.thumbElemWidth+'px');
    $('#carousel-canvas li').css('margin','0 0 0 '+(this.thumbElemMargin)+'px');
    $('#carousel-canvas li:last-of-type').css('margin','0 0 0 '+(this.thumbElemMargin)+'px');

    var newWidth = (this.pageCount + 1) * TS.Modules.ConfigModel.width;
    this.thumbHolder.css('width', newWidth);

    $(".listElem").off("click touchend").on("click touchend",this.elemClickHandler);

	TS.Modules.carouselview.setListElemsToArabic();
  },

  getDuration : function(videoItem){
    try
    {
      var duration = 0;

      duration =  Number(videoItem.group.content["0"].duration);

      return TS.Modules.carouselview.formatTime(duration);
    }
    catch(error){
      return "00:00";
    }
  },

  formatTime: function (totalSeconds) {
    var minutes = (Math.floor(totalSeconds / 60));
    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    var seconds = (Math.floor(totalSeconds % 60));
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    return minutes + ':' + seconds;
  },
  
  elemClickHandler: function(e) {
    e.preventDefault();

    var index = $(this).attr("rel");
    if(TS.Modules.carouselview.level == 0){
      TS.Modules.carouselview.topicIndex = index;
      TS.Modules.carouselview.level = 1;
      TS.Modules.carouselview.pageIndex=0;
      TS.Modules.carouselview.drawContent();
    }
    else if(TS.Modules.carouselview.level == 1){
      TS.Modules.carouselview.categoryIndex = index;
      TS.Modules.carouselview.level = 2;
      TS.Modules.carouselview.pageIndex=0;
      TS.Modules.carouselview.drawContent();
    }
    else if(TS.Modules.carouselview.level == 2){
      TS.Modules.carouselview.channelIndex = index;
      TS.Modules.carouselview.level = 3;
      TS.Modules.carouselview.pageIndex=0;


      TS.Modules.carouselview.saveLastLoadedChannelInfo();

      var exists = TS.Modules.mrssService.init(
        TS.Modules.carouselview.structureModel[TS.Modules.carouselview.topicIndex].category[TS.Modules.carouselview.categoryIndex].channel[index],
        TS.Modules.carouselview.thumbsDefaultItemPerPage,
        TS.Modules.carouselview.pageIndex,
        TS.Modules.carouselview.drawContent 
      );
      
      
      if(exists)
      {
        TS.Modules.carouselview.drawContent();
      }
    }
    else if(TS.Modules.carouselview.level == 3){
      TS.Modules.carouselview.videoIndex = index;
      TS.Modules.carouselview.level = 3;
      
      var videoItem = TS.Modules.carouselview.structureModel[TS.Modules.carouselview.topicIndex].category[TS.Modules.carouselview.categoryIndex].channel[TS.Modules.carouselview.channelIndex].list[index];

      videoItem.index = index;
      if( TS.Modules.carouselview.overlayOpened )
      {
        TS.Modules.carouselview.overlayOpened = false;
        TS.Modules.carouselview.carousel.css("top",TS.Modules.carouselview.top);
        TS.Modules.carouselview.setVideoBrowserImage();
      }
      TS.Modules.PlaylistModel.initFromVideoItem(videoItem);
      var model = TS.Modules.PlaylistModel;
      var url   = TS.Modules.PlaylistModel.transformUrl( model.url );
      TS.Modules.videoView.show();


        TS.Modules.PlaylistModel.lastClickedVideoId = TS.Modules.PlaylistModel.id;

        E.trigger( E.UPDATE_STYLE, TS.Modules.carouselview.moduleName, videoItem.style);
        E.trigger( E.EVENT_SET_VIDEOSRC, TS.Modules.carouselview.moduleName, videoItem);

      TS.Modules.initialize.postInfOnlineReport();
      TS.Modules.carouselview.setSelectedThumb();
    }
    
    TS.Modules.carouselview.drawTabs();
    TS.Modules.carouselview.setListElemsToArabic(); 
  },

  setSelectedThumb: function()
  {
    try
    {
        var index       = parseInt(TS.Modules.carouselview.videoIndex);

        if(index > -1)
        {
          var ulIndex     = (TS.Modules.carouselview.listView) ? Math.floor(index / TS.Modules.carouselview.listDefaultItemPerPage) : Math.floor(index / TS.Modules.carouselview.thumbsDefaultItemPerPage);
          var ul          = TS.Modules.carouselview.carouselCanvas.find("ul")[ulIndex];
          var liIndex     = (TS.Modules.carouselview.listView) ? index - ulIndex * TS.Modules.carouselview.listDefaultItemPerPage : index - ulIndex * TS.Modules.carouselview.thumbsDefaultItemPerPage;

          if(ul)
          {
            var li = ul.childNodes[liIndex];

            if(!TS.Modules.carouselview.listView)
            {
              $('#carousel-canvas li div').css('background','');
              $('#carousel-canvas li div').css('color','');
              $('#carousel-canvas li div').css('top','');

              if(TS.Modules.carouselview.level == 3){
                /*$(li).find('a').find('div').css('background',TS.Modules.carouselview.colors.thumbNailColor );
                $(li).find('a').find('div').css('color',"#fff" );
                $(li).find('a').find('div').css('top',"100%" );*/
              }
            }
            else
            {
              /*$('#carousel-canvas li a').css('background','#FFF');
              $('#carousel-canvas li a').css('color','#655F5F');
              $('#carousel-canvas li a div').css('color',TS.Modules.carouselview.colors.thumbNailColor);

              $(li).find('a').css('background',TS.Modules.carouselview.colors.thumbNailColor);
              $(li).find('a').css('color','#FFF');
              $(li).find('a').find('div').css('color','#FFF');*/
            }
          }
        }
    }
    catch(error)
    {
        E.triggerError(TS.Modules.carouselview, error);
    }
  },

  getSpan: function(text )
  {
  	return "<span>" + text + "</span>";
  },
  
  appendVideoHolder: function( _listLength )
  {
    var carousel = TS.Modules.carouselview;
    var structure = carousel.structureModel[carousel.topicIndex].category[carousel.categoryIndex].channel[carousel.channelIndex];
    var rowsLength = structure.list.length;
    var rows = structure.list;

    if( carousel.listView )
    {
      for(var i = _listLength; i < rowsLength;i++) {
        var listElem = '<li style="border-color:'+carousel.colors.light+'"><a class="listElem" rel="'+i+'"><span>'+(i+1)+'</span> '+rows[i].title+'</a></li>';
        carousel.thumbHolder.find('ul:last').append(listElem);
        
        var ulRestart = '</ul><ul class="list-view" style="width:'+carousel.defaultThumbHolderWidth+'px !important">';
        if((i+1)%carousel.listDefaultItemPerPage===0 && i<rowsLength)carousel.thumbHolder.append(ulRestart);
      }
          
      var ulEnd = '</ul>';
      carousel.thumbHolder.find('ul').append(ulEnd);
      $(".listElem").css("width",carousel.thumbWidth + "px");
      var cols = carousel.thumbHolder.find('ul').length;
      var newWidth = carousel.defaultThumbHolderWidth*cols;
      carousel.thumbHolder.css('width' , newWidth);
    }
    else
    {
      var itemCount = 0;
          
      for(var i = _listLength;i<rowsLength;i++){
        var listElem = '<li style="border-color:'+carousel.colors.light+'" class="videoThumb" title="rowsLength: '+rowsLength+'">'+
        '<a class="listElem" rel="'+i+'">'+
          '<img src="'+rows[i].group.thumbnail.url+'" alt="'+rows[i].title+'" style="height:'+carousel.thumbElemHeight+'px; width:100%;" />'+
          '<div class="thumbLabel" style="width:100%"><label>'+rows[i].title+'</label>' +
          '<span class="postClipTime" >' + TS.Modules.carouselview.getDuration(rows[i]) + '</span>' +
          '<img class="postClipLittlePlay" src="i/Eplayer/play.png">';
          '</div>'+
          '</a></li>';
        
        carousel.thumbHolder.find('ul:last').append(listElem);
        
        // END UL
        var ulRestart = '</ul><ul class="thumb-view" style="width:'+carousel.defaultThumbHolderWidth+'px !important">';
        if((i+1)%carousel.thumbsDefaultItemPerPage===0 && i<rowsLength)carousel.thumbHolder.append(ulRestart);

      }
          
      $(".thumbElem").off("click touchend").on("click touchend",carousel.elemClickHandler);
      var ulEnd = '</ul>';
          
      $('#carousel-canvas li').css('width',carousel.thumbElemWidth+'px');      
      $('#carousel-canvas li').css('margin','0 0 0 '+(carousel.thumbElemMargin)+'px');
      $('#carousel-canvas li:last-of-type').css('margin','0 0 0 '+(carousel.thumbElemMargin)+'px');
          
      var newWidth = carousel.thumbHolder.find('ul').length*carousel.defaultThumbHolderWidth + carousel.thumbElemMargin;
      carousel.thumbHolder.find('ul').append(ulEnd);
      carousel.thumbHolder.css('width' , newWidth);
    }
    $(".listElem").off("click").on('click', carousel.elemClickHandler);

    if(TS.Modules.carouselview.colors && TS.Modules.carouselview.colors.light){
      $(".postClipTime").css("background-color", TS.Modules.carouselview.colors.light);
    }


    TS.Modules.carouselview.disableTouchControls();
    TS.Modules.carouselview.setListElemsToArabic();
  },

  disableTouchControls : function(){
    /*if (!Modernizr.touch)
    {
      $(".thumbLabel").css("top", "100%");
      $("div#carousel-canvas ul.thumb-view li a div").css("top", "100%");
      $("div#carousel-canvas ul.thumb-view li a div").css("color", "#fff");
    }*/
  },
  
  turnPage: function()
  {
    if(this.level == 3)
    {
      if(TS.Modules.mrssService.init(
        this.structureModel[this.topicIndex].category[this.categoryIndex].channel[this.channelIndex],
        this.thumbsDefaultItemPerPage,
        this.pageIndex,
        this.onStructureInitialized,
        true
      ))
      {
          this.animatePage();
      }
      else
      {
          TS.Modules.carouselview.isPagingEnabled = false;
      }
    }
    else
    {
        this.animatePage();
    }
  },

  onStructureInitialized : function ( p_listLength)
  {
      var view  = TS.Modules.carouselview;

      view.isPagingEnabled = true;

      view.appendVideoHolder(p_listLength);
      view.animatePage();
      view.setListElemsToArabic();
  },

  animatePage : function()
  {
      var view  = TS.Modules.carouselview;
      var to    = view.pageIndex * (view.defaultThumbHolderWidth );

      if (!view.thumbHolder.closest('#videoOverlay').length)
      {
          view.thumbHolder.stop(true, true);
          view.thumbHolder.animate({left:'-'+to+'px'}, view.getAnimDuration());
      } else
      {
          view.thumbHolder.css('left', '-'+to+'px');
      }
  },
  
  
  prevPage: function() 
  {
    var carousel = TS.Modules.carouselview;

    if(carousel.isPagingEnabled)
    {
        if( carousel.pageCount > 0 )
        {
            if(carousel.pageIndex > 0)
            {
                carousel.pageIndex--;

                carousel.turnPage();
            }
        }
    }
  },
  
  nextPage: function() 
  {
  	var carousel = TS.Modules.carouselview;

    if(carousel.isPagingEnabled)
    {
        if( carousel.pageCount > 0 )
        {
          if( carousel.pageIndex < carousel.pageCount - 1)
          {
              carousel.pageIndex++;

              carousel.turnPage();
          }
        }
    }
  },
  
  onLeftClicked: function() 
  {
    if(TS.Modules.carouselview.arabicMode)
    {
    	TS.Modules.carouselview.nextPage();
    }
    else
    {
    	TS.Modules.carouselview.prevPage();
    }
  },
  
  onRightClicked: function() 
  {
    if(TS.Modules.carouselview.arabicMode)
    {
    	TS.Modules.carouselview.prevPage();
    }
    else
    {
    	TS.Modules.carouselview.nextPage();
    }
  },
  
  setListElemsToArabic : function()
  {
  	if(this.arabicMode)
    {
    	$(".listElem")		.css("text-align"	, "right");
    	$(".listElem span")	.css("float"		, "right");
    	$(".infoText")      .css("float"        , "right"); 
    	$(".view-btn")      .css("float"        , "left"); 
    	$(".listElem img")  .css("width"        , "100%");
    	
    	for(var i = 0; i < $(".listElem span").length; i++)
    	{
    		var span = $(".listElem span")[i];
    		
    		$(span).css("margin-right", "3px");
    		$(span).css("margin-left" , "3px");
    	}
    	
    	$(".videoThumb .listElem span").attr  ("style"        , "width:100%"); 
    	$(".videoThumb .listElem span").css   ("text-align"   , "right"); 
    	$(".videoThumb .listElem span").css   ("margin-right" , "3px"); 
     }
  },
  
 getAnimDuration : function()
 {
 	if(this.arabicMode)
    {
    	return 0;
    }
    
    return 500;
 }

};



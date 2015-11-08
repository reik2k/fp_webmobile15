TS.Modules.updateStyle  = {
  moduleName: 'updateStyle',
  autoInit: true,
  
  init: function()
  {
    E.bindEvent( E.UPDATE_STYLE, this.moduleName, this.updateStyle, this );
  },
  
  
  updateStyle: function( e, data )
  {
    if(data)
    {
        var bannerObject = {banners:data.banner};
        E.trigger( E.SET_BANNER, TS.Modules.updateStyle.moduleName, bannerObject);
        
        var dark 	= '#'+ data.spot1.value;
        var middle 	= '#'+ data.spot2.value;
        var light 	= '#'+ data.spot3.value;
        var light   = '#'+ data.spot3.value;
        var thumbNailColor = '#' + data.spot4.value;
        var arrowColor = '#' + data.spot5.value;
        var bottomLineColor = '#' + data.spot6.value;
        
        TS.Modules.carouselview.colors.dark = dark;
        TS.Modules.carouselview.colors.middle = middle;
        TS.Modules.carouselview.colors.light = light;     
        TS.Modules.carouselview.colors.thumbNailColor = thumbNailColor;
        TS.Modules.carouselview.colors.arrowColor = arrowColor;
        TS.Modules.carouselview.colors.bottomLineColor = bottomLineColor;
        
        TS.Modules.ConfigModel.colors = {
          dark: dark,
          middle: middle,
          light: light,
          thumbNailColor: thumbNailColor,
          arrowColor: arrowColor,
          bottomLineColor: bottomLineColor
        };
        
        // alert(light);
        $('.progress').children('div').css('backgroundColor', light);
        $("#carousel").css("border-color", bottomLineColor);
        $(".thumb-view > li").css("border-color", thumbNailColor);
        $(".list-view").find('span').css("border-color", light);
        $("#backButton").css("backgroundColor", dark);
        
        $('.ver1 > span').css('backgroundColor', dark);
        
        if(TS.Modules.ConfigModel.playerType == "eplayer10")
      	{
      		$('#arrNext').css("background", "url('i/Eplayer/next.png')");
        	$('#arrPrev').css("background", "url('i/Eplayer/prev.png')");
      	}
      	else
      	{
      		$('#arrNext').css('backgroundColor', arrowColor);
        	$('#arrPrev').css('backgroundColor', arrowColor);
      	}
        
        
        $('#videoControls .time.elapsed').css('color', light);
        
        
        $('#videoControlsColorOverride').remove();
    
        var css = $('<style></style>').attr('id', 'videoControlsColorOverride');
        
        // update background colors
        css.append(
          '#videoControls .play-button :active { ' +
          '  background-color: ' + light + ' !important; ' +
          '} ');
        css.append(
          '#videoControls .play-button :hover { ' +
          '  background-color: ' + light + ' !important; ' +
          '} ');

        if (!Modernizr.touch)
        {
            if(TS.Modules.carouselview.colors && TS.Modules.carouselview.colors.thumbNailColor){
                css.append(".listElem:hover{background:" + TS.Modules.carouselview.colors.thumbNailColor + "; color:#fff}");
            }

            css.append("div#carousel-canvas ul.thumb-view li a:hover div{" +
            "top: 21px;" +
            "line-height: 10px;" +
            "color:#000;" +
            "background-color: #fff;");
        }

        $(".postClipTime").css("background-color", light);
    
        $('head').append(css);
        TS.Modules.carouselview.drawTabs();
        TS.Modules.carouselview.setSelectedThumb();
        
        TS.Modules.initialize.setCustomStyles();
        
        //border of the thumbs
        
     }
  }
  
}




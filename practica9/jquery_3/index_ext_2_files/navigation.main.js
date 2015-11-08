TS.Modules.navigation = {
    moduleName: 'navigation',
    // CONFIG
    config: {},
    autoInit: false,
    smallControls: false,
    VIDEO_SEEK_HEIGHT : 3,
    touchScreen: true,

    isAdvertisement: false,
    isFacebookEnabled: false,

    playButton: $("#videoOverlay .play"),
    pauseButton: $("#videoOverlay .pause"),
    fullscreenButton: $("#videoOverlay .toggle-fullscreen"),

    init: function () {

        if ('ontouchstart' in document.documentElement) {
            this.touchScreen = true;
        }

        $('#videoControls').css('display', 'block');

        if (this.touchScreen) {
            $('.play-button, .right-button').
                attr('ontouchstart', true);
        }

        TS.Modules.ClickTouchHelper.addClickListener($(".play-button")          , this.playBtn);
        TS.Modules.ClickTouchHelper.addClickListener($(".play")                 , this.onPlayAd);
        TS.Modules.ClickTouchHelper.addClickListener($(".pause")                , this.onPauseAd);
        TS.Modules.ClickTouchHelper.addClickListener($(".toggle-fullSize")      , this.onToggleFullSize);
        TS.Modules.ClickTouchHelper.addClickListener($("#progressOverlay")      , this.seekByClick);
        TS.Modules.ClickTouchHelper.addClickListener($(".progress")             , this.seekByClick);

        $(".play" )[0].navigation = this;
        $(".pause")[0].navigation = this;

        this.setOverlaySize();
        E.bindEvent(E.SET_VIDEO_TITLE               , this.moduleName, this.setVideoTitle);
        E.bindEvent(E.SHOW_VIDEO_OVERLAY            , TS.Modules.navigation.moduleName, this.showNavigation, this);
        E.bindEvent(E.HIDE_VIDEO_OVERLAY            , TS.Modules.navigation.moduleName, this.hideNavigation, this);
        E.bindEvent(E.EVENT_AD_REQUEST              , TS.Modules.navigation.moduleName, this.setAdControls, this);
        E.bindEvent(E.EVENT_AD_ENDED                , TS.Modules.navigation.moduleName, this.setVideoControls, this);
        E.bindEvent(E.EVENT_AD_CLICKTHRU            , TS.Modules.navigation.moduleName, this.onAdClick, this);
        E.bindEvent(E.EVENT_CUSTOM_RULES_LOADED     , TS.Modules.navigation.moduleName, this.onCustomRulesLoaded, this);
        E.bindEvent(E.EVENT_POSTROLL_END            , TS.Modules.navigation.moduleName, this.onPostrollEnded, this);

        $('#copyLink').off('click').on('click', function ()
        {
            E.trigger(E.SHOW_FACEBOOKBAR, TS.Modules.facebookLink.moduleName)
        });

        $('#copyLink').off('touchend').on('touchend', function ()
        {
            E.trigger(E.SHOW_FACEBOOKBAR, TS.Modules.facebookLink.moduleName)
        });

        this.isFacebookEnabled = TS.Modules.CustomRulesModel.getRule("isFacebookEnabled", false);
        if (!this.isFacebookEnabled) {
            $('#copyLink').remove();
        }

        if(TS.Modules.ConfigModel.isOverlayPlayer())
        {
            this.initOverlayVideoControls();
            $("#videoControls").hide();
        }

        this.setFullSizeDisplayState();
        this.showNavigation();
    },

    onCustomRulesLoaded : function()
    {
        this.setFullSizeDisplayState();
    },

    setFullSizeDisplayState : function()
    {
        if(TS.Modules.ConfigModel.isFullSizeAvailable)
        {
            $("#fullSize").css("display", "");
        }
        else
        {
            $("#fullSize").css("display", "none");
        }
    },

    onToggleFullSize: function ()
    {
        var text = '{ "toggleFullSize" : "true", "eplayerID" : "' + TS.Modules.ConfigModel.eplayerID + '"}';

        window.parent.postMessage(text,'*');
    },

    showNavigation: function ()
    {
        var controlBarHeight    = TS.Modules.initialize.fullSizeOn ? TS.Modules.ConfigModel.getFullControlBarHeight() : TS.Modules.ConfigModel.controlBarHeight;
        var height              = controlBarHeight + 'px';
        var buttonsHeight       = (controlBarHeight - this.VIDEO_SEEK_HEIGHT) + "px";

        $('.clip').find('div:not(.progress)').show();
        $('.progress').css('height', this.VIDEO_SEEK_HEIGHT + 'px');
        $('#videoControls').css('height', height);
        $('.clip').css('height', height);

        if ($('.play-button').hasClass('playing')) {
            $('.play').hide();
            $('.pause').show();
        }
        else {
            $('.pause').hide();
            $('.play').show();
        }

        if(TS.Modules.ConfigModel.isOverlayPlayer())
        {
            TS.Modules.videoView.show();
        }

        if(controlBarHeight < 32)
        {
            this.smallControls = true;
            $('#videoControls').addClass('small-controls');

            $("#copyLinkIcon")  .css("background-size", "80%");
            $("#fullscreenIcon").css("background-size", "80%");
            $("#fullSizeIcon")  .css("background-size", "80%");
            $("#browserIcon")   .css("background-size", "80%");
        }

        $(".play-button")   .css('width'        , buttonsHeight);
        $(".play-button")   .css('height'       , buttonsHeight);
        $(".time")          .css('line-height'  , buttonsHeight);
        $(".time")          .css('height'       , buttonsHeight);
        $("#copyLink")      .css('width'        , buttonsHeight);
        $("#copyLink")      .css('height'       , buttonsHeight);
        $(".button")        .css('width'        , buttonsHeight);
        $(".button")        .css('height'       , buttonsHeight);
        $(".right-button")  .css('width'        , buttonsHeight);
        $(".right-button")  .css('height'       , buttonsHeight);

        E.trigger(E.SET_FACEBOOKBAR_POS, TS.Modules.navigation.moduleName);

        this.initOverlayVideoControls();
        this.setFullSizeDisplayState();
        TS.Modules.videoView.setAdInfoSizes();
    },

    initOverlayVideoControls : function ()
    {
        if(TS.Modules.ConfigModel.isOverlayPlayer())
        {
            if(TS.Modules.initialize.fullSizeOn)
            {
                $('#videoControls .clip').css("background-color", "rgba(0, 0, 0, 1)");

                $('#videoControls').css('position'  , "absolute");
                $('#videoControls').css('width'     , "100%"    );
                $('#videoControls').css('bottom'    , ""        );
            }
            else
            {
                $('#videoControls .clip').css("background-color", "rgba(0, 0, 0, 0.7)");

                $('#videoControls').css('position'  , "absolute");
                $('#videoControls').css('bottom'    , "0px"     );
                $('#videoControls').css('width'     , "100%"    );
            }
       }
    },

    hideNavigation: function ()
    {
        if(TS.Modules.navigation.isHideVideoControlsEnabled())
        {
             $("#videoControls").hide();
        }

        E.trigger(E.SET_FACEBOOKBAR_POS, TS.Modules.navigation.moduleName);
    },

    isHideVideoControlsEnabled : function()
    {
        return TS.Modules.ConfigModel.isOverlayPlayer() && !TS.Modules.initialize.fullSizeOn && !TS.Modules.carouselview.overlayOpened && !TS.Modules.FullscreenService.isFullscreenOn();
    },

    setAdControls: function () {
        $.trace.info(" ******************** AD ********************* ");
        TS.Modules.navigation.isAdvertisement = true;
    },

    setVideoControls: function () {
        $.trace.info(" ******************** NOT AD ********************* ");
        TS.Modules.navigation.isAdvertisement = false;
    },


    setOverlaySize: function () {
        var videoWidth = TS.Modules.initialize.config.videoWidth;
        var videoHeight = TS.Modules.initialize.config.videoHeight;
        var overlayHeight = 45;

        $("#videoOverlay").width(videoWidth);

        // $("#videoOverlay").css("top", videoHeight - overlayHeight);
    },

    onPostrollEnded : function()
    {
        TS.Modules.navigation.isAdvertisement = false;
    },

    playBtn: function ()
    {
        if (TS.Modules.navigation.isAdvertisement)
            return true;

        TS.Modules.videoView.togglePlay();
    },

    onPlayAd: function () {
        if (TS.Modules.navigation.isAdvertisement) {
            E.trigger(E.EVENT_AD_RESUME, TS.Modules.navigation.moduleName);
            TS.Modules.navigation.showPauseButton();
        }
    },

    onPauseAd: function () {
        if (TS.Modules.navigation.isAdvertisement)
        {
            E.trigger(E.EVENT_AD_PAUSE, TS.Modules.navigation.moduleName);
            TS.Modules.navigation.showPlayButton();
        }
    },

    onAdClick: function ()
    {
        if (TS.Modules.navigation.isAdvertisement) {
            TS.Modules.navigation.showPlayButton();
        }
    },

    showPauseButton: function()
    {
        if (TS.Modules.navigation.isAdvertisement)
        {
            $('.play-button').addClass('playing');
            $('.play-button > .play').css('display', 'none');
            $('.play-button > .pause').css('display', 'block');
        }
    },

    showPlayButton: function()
    {
        if (TS.Modules.navigation.isAdvertisement)
        {
        $('.play-button').removeClass('playing');
        $('.play-button > .play').css('display', 'block');
        $('.play-button > .pause').css('display', 'none');
        }
    },

    updateTime: function (data)
    {
        var time        = data.currentTime;
        var duration    = data.duration;

        if (!duration) {
            duration = 0;
        }

        $('#videoControls .elapsed').html(this.formatTime(time));
        $('#videoControls .total').html(this.formatTime(duration));

        var percentage = (time / duration) * 100;
        $('#videoControls .progress > div').css('width', percentage + '%');

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

    getOffsetX: function (e)
    {
        var offsetX = 0;

        try
        {
            if (typeof e.originalEvent.touches != 'undefined') {
                offsetX = e.originalEvent.touches[0].pageX;
            }
            else {
                offsetX = e.offsetX;

                if (!offsetX) {
                    offsetX = e.clientX;
                }
            }
        }
        catch(error)
        {
            //nothing to do
        }

        return offsetX;
    },

    seekByClick: function (e)
    {
        if (TS.Modules.navigation.isAdvertisement)
            return true;

        var offsetX = TS.Modules.navigation.getOffsetX(e);
        TS.Modules.videoView.seeking(offsetX, $(".progress").width(), e);
    },

    setVideoTitle: function (event, data) {
        $("#videoOverlayTitle").html(data);
    }


};
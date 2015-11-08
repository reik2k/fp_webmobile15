TS.Modules.configService = {
    // CONFIG
    config: {},
    autoInit: false,

    callback: null,
    flashVars: null,

    load: function (url, flashVars, cb) {

        TS.Modules.configService.callback = cb;
        TS.Modules.configService.flashVars = flashVars;

        /*if (window.location.host!='localhost')
         url = url.replace(/^.*\/\/[^\/]+/, '');*/

        url = url + '?_fmt=jsonp&_clbk=?'

        $.trace.info("ConfigService::loading");

        $.ajax({
            url: url,
            type: "GET",
            cache: false,
            dataType: "jsonp",
            jsonp: '_clbk',
            jsonpCallback: "jsonpCallback",
            success: TS.Modules.configService.onSuccess,
            error: TS.Modules.configService.onError,
            data: {_ref: flashVars.referrer || window.location.hostname}
        });

    },

    getDeviceType: function () {
        if (this.isIPad() || this.isIPod()) {
            return "TabletiOS";
        }
        else if (this.isIPhone()) {
            return "MobilePhoneiOS";
        }
        else if (this.isAndroid() && this.isTablet()) {
            return "TabletAndroid";
        }
        else if (this.isAndroid() && !this.isTablet()) {
            return "MobilePhoneAndroid";
        }
        else if (this.isDesktop()) {
            return "Desktop";
        }
        else if (this.isTablet()) {
            return "TabletOther";
        }
        else {
            return "MobilePhoneOther";
        }

        return "Desktop";
    },

    isIPad: function () {
        return navigator.userAgent.toLowerCase().indexOf("ipad") > -1;
    },

    isIPod: function () {
        return navigator.userAgent.toLowerCase().indexOf("ipod") > -1;
    },

    isIPhone: function () {
        return navigator.userAgent.toLowerCase().indexOf("iphone") > -1;
    },

    isAndroid: function () {
        return navigator.userAgent.toLowerCase().indexOf("android") > -1
    },

    isTablet: function () {
        var width = screen.width > screen.height ? screen.width : screen.height;

        return width > 800;
    },

    isWindows: function () {
        return navigator.userAgent.toLowerCase().indexOf("windows") > -1 && !this.isWindowsPhone();
    },

    isWindowsPhone: function () {
        return navigator.userAgent.toLowerCase().indexOf("windows phone") > -1;
    },

    isMacintosh: function () {
        return navigator.userAgent.toLowerCase().indexOf("macintosh") > -1;
    },

    isLinux: function () {
        return navigator.userAgent.toLowerCase().indexOf("linux") > -1 && !this.isAndroid();
    },

    isDesktop: function () {
        var ret = this.isWindows() || this.isMacintosh() || this.isLinux();

        ret = ret && !(this.isAndroid() || this.isIPad() || this.isIPhone() || this.isIPod() || this.isWindowsPhone());

        return ret;
    },

    onSuccess: function (data) {

        var configObj = TS.Modules.ConfigModel;
        var hashObj = $.getHash();

        configObj.playlistSettings = data.playlistSettings.url;
        configObj.styleSheet = data.styleSheet.url;
        configObj.channelService = data.channelService.url;
        configObj.adService = data.adService.name;
        configObj.language = data.language.id;
        configObj.resourceBundle = data.resourceBundle.url;
        configObj.width = data.width.value;
        configObj.height = data.height.value;
        configObj.autoPlay = data.autoPlay.value;
        configObj.startMute = data.startMute.value;
        configObj.navigation = data.navigation.value;
        configObj.partner = data.partner.id;
        configObj.defaultChannel = data.defaultChannel.id;
        configObj.country = data.country.id;
        configObj.playerId = TS.Modules.configService.flashVars.playerId;
        configObj.playerType = TS.Modules.configService.flashVars.playerType;
        configObj.channelId = TS.Modules.configService.flashVars.channelId;
        configObj.locale = TS.Modules.configService.flashVars.locale;
        configObj.controlBarHeight = TS.Modules.ConfigModel.getControlBarHeight();
        configObj.device = TS.Modules.configService.getDeviceType();
        configObj.eplayerID = TS.Modules.configService.flashVars.eplayerID;
        configObj.isPC = !jQuery.browser.mobile && !(navigator.userAgent.match(/iPad|iPhone|iPod|Android/g));

        if (window.location.protocol == 'https:') {
            configObj.channelService = configObj.channelService.replace("http:", "https:");
        }

        var referrer = document.referrer;
        referrer = referrer.replace('http://', '');
        referrer = referrer.replace(/[^a-zA-Z0-9]/g, '_');

        configObj.windowLocation = referrer;
        configObj.windowLocationFull = document.referrer;

        if (configObj.windowLocation.indexOf("performgroup") > -1) {
            configObj.windowLocation = "www.performgroup.com";
        }

        if (TS.Modules.configService.flashVars.autoPlay != null &&
            TS.Modules.configService.flashVars.autoPlay != "null" &&
            TS.Modules.configService.flashVars.autoPlay != "") {
            try {
                var loweredAutoPlay = TS.Modules.configService.flashVars.autoPlay.toLowerCase();

                if (loweredAutoPlay == "true" || loweredAutoPlay == "false") {
                    configObj.autoPlay = TS.Modules.configService.flashVars.autoPlay;
                }
            }
            catch (error) {
                E.triggerError(TS.Modules.configService, error);
            }
        }

        try {
            var stp = data.scrollInitPlay.toPlay.toLowerCase();

            if (stp == "true" || stp == "false") {
                configObj.scrollToPlay = stp;
            }
        }
        catch (error) {
            E.triggerError(TS.Modules.configService, error);
        }

        try {
            if (data.soundOnClick.value.toLowerCase() === "true") {
                configObj.soundOnClick = true;
            } else if (data.soundOnClick.value.toLowerCase() === "false") {
                configObj.soundOnClick = false;
            }
        }
        catch (error) {
            E.triggerError(TS.Modules.configService, error);
        }

        try {
            if (configObj.isPC) {
                if (data.nextVidPlay.value.toLowerCase() === "true") {
                    configObj.isNextVideoPlay = true;
                } else if (data.nextVidPlay.value.toLowerCase() === "false") {
                    configObj.isNextVideoPlay = false;
                }
            }
            else {
                configObj.isNextVideoPlay = false;
            }
        }
        catch (error) {
            E.triggerError(TS.Modules.configService, error);
        }

        if (TS.Modules.configService.flashVars.startMute != null &&
            TS.Modules.configService.flashVars.startMute != "null" &&
            TS.Modules.configService.flashVars.startMute != "") {
            try {
                var loweredStartMute = TS.Modules.configService.flashVars.startMute.toLowerCase();

                if (loweredStartMute == "true" || loweredStartMute == "false") {
                    configObj.startMute = TS.Modules.configService.flashVars.startMute;
                }
            }
            catch (error) {
                E.triggerError(TS.Modules.configService, error);
            }
        }


        if (TS.Modules.configService.flashVars.partnerId != null
            && TS.Modules.configService.flashVars.partnerId != "null"
            && TS.Modules.configService.flashVars.partnerId != "") {
            configObj.partner = TS.Modules.configService.flashVars.partnerId;
        }

        if (jQuery.browser.mobile || navigator.userAgent.match(/iPad|iPhone|iPod|Android/g)) {
            configObj.autoPlay = "false";
        }

        configObj.videoUUId = TS.Modules.configService.flashVars.videoUUId;

        var eventData = {};

        eventData.ConfigModel = TS.Modules.ConfigModel;
        eventData.configService = TS.Modules.configService;

        E.trigger(E.EVENT_CONFIG_LOADED, TS.Modules.configService, eventData);

        if (TS.Modules.configService.callback) {
            TS.Modules.configService.callback(configObj);
        }
    },

    onError: function (jqXHR, textStatus) {
        $.trace.error("ConfigService::error: " + textStatus)
    },

    getIndexFromPlayerType: function (playerType) {
        var index = 0;

        if (playerType) {
            try {
                index = parseInt(playerType.toLowerCase().replace("eplayer", ""));
                index--;
            }
            catch (error) {
                //nothing to do
            }
        }

        return index;
    }
};

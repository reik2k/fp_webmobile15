var _comscore = _comscore || [];

_comscore.push({c1: 1, c2: 6035584});

(function () {
    var s = document.createElement("script"), el = document.getElementsByTagName("script")[0];

    s.async = true;
    s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";
    el.parentNode.insertBefore(s, el);
})();

TS.Modules.initialize = {
    moduleName: 'initialize',
    // CONFIG
    config: {
        configObject: {},
        structureModel: null,
        videoWidth: 0,
        videoHeight: 0,
        bannerHeight: 0,
        flashVars: null,
        isFBPlayer: false,
        playlistLoaded: false
    },
    autoInit: true,
    videoInfo: {},

    init: function () {


        TS.Modules.initialize.config.flashVars = $.getHash();
        // console.dir( hash );


        TS.Modules.initialize.config.isFBPlayer = TS.Modules.initialize.config.flashVars.playerType == "eplayer8";

        if (TS.Modules.initialize.config.isFBPlayer) {
            TS.Modules.initialize.config.flashVars.configXML = PATH_FACEBOOK_CONFIG;
        }

        // Loads the config object
        TS.Modules.configService.load(
            TS.Modules.initialize.config.flashVars.configXML,
            TS.Modules.initialize.config.flashVars,

            // Loads custom rules
            function (result) {
                TS.Modules.customRulesService.load(function () {
                    TS.Modules.initialize.configResult(result);
                });
            }
        );


    },

    configResult: function (result) {
        TS.Modules.initialize.config.configObject = result;
        TS.Modules.initialize.setOmnitureAccount();
        TS.Modules.initialize.tracePartnerInfo();
        TS.Modules.initialize.setVideoSizeFromFlashVars();
        TS.Modules.initialize.initModules();
        TS.Modules.initialize.loadChannels();
        TS.Modules.initialize.setMainViewsSize();
        TS.Modules.initialize.setCustomStyles();
        TS.Modules.initialize.addListeners();
        TS.Modules.initialize.onWindowResized();

        if (Modernizr.touch) {
            $(".postClipHoverDiv").remove();
            $(".one-edge-shadow").css("visibility", "visible");
        }
    },

    postInitializedMessage: function () {
        var text = '{   "globalConfigLoaded"    : "' + 'true'       + '", ' +
                        '"eplayerID"            : "' + TS.Modules.ConfigModel.eplayerID + '", ' +
                        '"autoPlay"             : "' + TS.Modules.ConfigModel.autoPlay + '", ' +
                        '"scrollToPlay"         : "' + TS.Modules.ConfigModel.scrollToPlay + '"}';

        window.parent.postMessage(text, '*');
    },

    postInfOnlineReport: function () {
        try {
            if (TS.Modules.CustomRulesModel.getRule("InfOnline") && TS.Modules.CustomRulesModel.getRule("InfOnline") !== "") {
                var infOnline = TS.Modules.CustomRulesModel.getRule("InfOnline").split(",");
                var text = '{ "infOnline"   : "' + 'true'       + '", ' +
                              '"site"       : "' + infOnline[0] + '", ' +
                              '"code"       : "' + infOnline[1] + '", ' +
                              '"comment"    : "' + infOnline[2] + '"}';

                window.parent.postMessage(text, '*');
            }
        } catch (error) {
            E.triggerError(TS.Modules.initialize, error, "InfOnline reporting error.");
        }
    },

    addListeners: function () {
        $(window).resize(TS.Modules.initialize.onWindowResized);
        E.bindEvent(E.EVENT_FULLSIZE_ON, TS.Modules.initialize.moduleName, TS.Modules.initialize.onFullSizeOn, this, true);
        E.bindEvent(E.EVENT_FULLSIZE_OFF, TS.Modules.initialize.moduleName, TS.Modules.initialize.onFullSizeOff, this, true);
        E.bindEvent(E.EVENT_OMNITURE_AD_START_SESSION, TS.Modules.initialize.moduleName, TS.Modules.initialize.onAdStarted, this);
        E.bindEvent(E.EVENT_OMNITURE_AD_END_SESSION, TS.Modules.initialize.moduleName, TS.Modules.initialize.onAdEnded, this, true);
        E.bindEvent(E.EVENT_OMNITURE_START_SESSION, TS.Modules.initialize.moduleName, TS.Modules.initialize.onVideoStarted, this);
        E.bindEvent(E.EVENT_OMNITURE_END_SESSION, TS.Modules.initialize.moduleName, TS.Modules.initialize.onVideoEnded, this, true);
    },

    onAdStarted: function (source, eventData) {
        TS.Modules.initialize.updateVideoInfo();
        window.parent.postMessage(TS.Modules.initialize.getAdInfoText("onEplayerAdStarted"), '*');
    },

    onAdEnded: function (source, eventData) {
        window.parent.postMessage(TS.Modules.initialize.getAdInfoText("onEplayerAdEnded"), '*');
    },

    onVideoStarted: function (source, eventData) {
        TS.Modules.initialize.updateVideoInfo();
        window.parent.postMessage(TS.Modules.initialize.getVideoInfoText("onEplayerVideoStarted"), '*');
    },

    onVideoEnded: function (source, eventData) {
        window.parent.postMessage(TS.Modules.initialize.getVideoInfoText("onEplayerVideoEnded"), '*');
    },

    updateVideoInfo: function () {
        TS.Modules.initialize.videoInfo.playerId = TS.Modules.ConfigModel.eplayerID;
        TS.Modules.initialize.videoInfo.videoId = TS.Modules.PlaylistModel.id;
        TS.Modules.initialize.videoInfo.videoTitle = TS.Modules.PlaylistModel.title;
        TS.Modules.initialize.videoInfo.videoDuration = TS.Modules.PlaylistModel.duration;

        var editorsPickItem = TS.Modules.PlaylistModel.getEditorsPickItem();
        var channelId = TS.Modules.ChannellistModel.id;
        var channelName = TS.Modules.ChannellistModel.name;

        if (editorsPickItem) {
            channelId = editorsPickItem.id;
            channelName = editorsPickItem.channelName;
        }

        TS.Modules.initialize.videoInfo.channelId = channelId;
        TS.Modules.initialize.videoInfo.channelName = channelName;
    },

    getVideoInfoText: function (eventName) {
        var text = '{ "eventName" : "' + eventName + '"' +
            ', "channelId" : "' + this.videoInfo.channelId + '"' +
            ', "channelName" : "' + this.videoInfo.channelName + '"' +
            ', "playerId" : "' + this.videoInfo.playerId + '"' +
            ', "videoId" : "' + this.videoInfo.videoId + '"' +
            ', "videoTitle" : "' + this.videoInfo.videoTitle + '"' +
            ', "videoDuration" : "' + this.videoInfo.videoDuration +
            '"}';

        return text;
    },

    getAdInfoText: function (eventName) {
        var text = '{ "eventName" : "' + eventName + '"' +
            ', "channelId" : "' + this.videoInfo.channelId + '"' +
            ', "channelName" : "' + this.videoInfo.channelName + '"' +
            ', "playerId" : "' + this.videoInfo.playerId + '"' +
            ', "videoId" : "' + this.videoInfo.videoId + '"' +
            ', "videoTitle" : "' + this.videoInfo.videoTitle + '"' +
            ', "videoDuration" : "' + this.videoInfo.videoDuration +
            ', "adTitle" : "' + $("#videoControl").attr("src") +
            '"}';

        return text;
    },

    onWindowResized: function () {
        if (TS.Modules.ConfigModel.isResponsivePlayer() || TS.Modules.initialize.fullSizeOn === true) {
            TS.Modules.initialize.config.videoWidth = $(window).width();
            TS.Modules.initialize.config.videoHeight = Math.round($(window).width() * 9 / 16);
            TS.Modules.ConfigModel.width = $(window).width();
            TS.Modules.ConfigModel.height = $(window).height();

            TS.Modules.initialize.setMainViewsSize();

            E.trigger(E.EVENT_WINDOW_RESIZED, TS.Modules.initialize, TS.Modules.initialize.config);
        }
    },

    onFullSizeOn: function () {
        TS.Modules.initialize.fullSizeOn = true;
        TS.Modules.initialize.onWindowResized();
        E.trigger(E.SHOW_VIDEO_OVERLAY, TS.Modules.videoView.moduleName, {});
    },

    onFullSizeOff: function () {
        TS.Modules.initialize.onWindowResized();
        TS.Modules.initialize.fullSizeOn = false;
        E.trigger(E.SHOW_VIDEO_OVERLAY, TS.Modules.videoView.moduleName, {});
    },

    setMainViewsSize: function () {
        var carouselWidth = this.config.videoWidth - 44;

        $("#navBar").css("width", this.config.videoWidth + "px");
        $("#navigationBar").css("width", this.config.videoWidth + "px");
        $("#carousel").css("width", this.config.videoWidth + "px");
        $("#videoDIV").css("width", this.config.videoWidth + "px");
        $("#carousel-container").css("width", carouselWidth + "px");
        $("#carousel-holder").css("width", carouselWidth + "px");

    },

    setCustomStyles: function () {
        if (TS.Modules.ConfigModel.playerType == "eplayer10") {
            $('div.head').css("position", "relative");
            $('div.head').css("top", "-2px");
            $('div.carousel-holder').css("position", "relative");
            $('div.carousel-holder').css("top", "0px");
            $('div.pageText').css("position", "relative");
            $('div.pageText').css("top", "-20px");
            $("#carousel").css("height", "77px");
            $("#navigationBar").css("width", "225px");
            $("#navBar").css("height", "100px");
            $("#navBar").css("background-color", "#000");
            $("#carousel-container").css("background-color", "#000");
            $("#carousel-container").css("background-image", "none");
            $(".infoText").css("color", "white");
            $(".pageText").css("color", "white");
            $("#navigationBar").css("border", "none");
        }
        else if (TS.Modules.ConfigModel.playerType == "eplayer12") {
            $("#videoView").css("margin-top", "-7px");
        }
    },


    setOmnitureAccount: function () {
        TS.Modules.OmnitureService.init();
    },

    tracePartnerInfo: function () {
        this.partnerMap = {
            // test
            '151': 'test',
            '14897': 'Yume test',

            // France
            '13214': 'Football365.fr',
            '13378': 'Francefootball.fr',
            '13629': 'madeinrugby.com|madeinfoot.com',
            '14760': 'sport.fr',
            '13720': 'Foot Mercato',
            '13669': 'Match En Direct',
            '14522': 'Maxifoot.fr',
            '13937': 'Top Mercato',
            '13557': 'sport24.com',
            '13209': 'L\'Equipe',

            // Italian

            '13321': 'http://www.calciomercato.com/',
            '14538': 'http://www.lastampa.it/',
            '13354': 'http://www.fantagazzetta.it/',


            //UK
            //'13360': 'Daily Mail',
            '13320': 'Daily Telepgraph',
            '13285': 'Independent',

            //US

            '13922': 'NY Daily News',
            '13394': 'NY Daily News',
            '13920': 'Chicago Tribune',
            '13512': 'Chicago Tribune',
            '13921': 'La Times ',
            '13515': 'La Times ',


            // Australia
            '12961': 'http://sportal.com.au/'
            //'14725' : 'http://goal.com.au/',
            //'14032' : 'http://setanta.com.au/',

        };
    },

    loadChannels: function () {
        TS.Modules.channelService.load(this.config.configObject.channelService, this.channelResult);
    },

    initModules: function () {
        TS.Modules.navigation.init();
        TS.Modules.videoView.init();
        TS.Modules.videoListener.init();
        TS.Modules.bannerview.init();
        TS.Modules.preclipview.init();
        TS.Modules.postclipview.init();
        TS.Modules.shareview.init();
        TS.Modules.LiveRailVPAIDManager.init();
        TS.Modules.localizationService.init();
        TS.Modules.ConvivaService.init();
        TS.Modules.EffectiveMeasureService.init();
        TS.Modules.LotameService.init();
        TS.Modules.AkamaiService.init();
        TS.Modules.closeAdView.init();
        TS.Modules.AdtechService.init();
        TS.Modules.FullscreenService.init();
        TS.Modules.HistoryService.init();
        TS.Modules.comscoreService.init();
    },

    setVideoSizeFromFlashVars: function () {
        var videoWidth = this.config.flashVars.SWFWidth;
        var videoHeight = Math.round(videoWidth * 9 / 16);
        var bannerHeight = this.getBannerViewHeight();

        TS.Modules.ConfigModel.width = this.config.flashVars.SWFWidth;
        TS.Modules.ConfigModel.height = this.config.flashVars.SWFHeight;

        this.config.videoWidth = videoWidth;
        this.config.videoHeight = videoHeight;
        this.config.bannerHeight = bannerHeight;
    },


    getBannerViewHeight: function () {
        var bannerHeight = 45;

        switch (this.config.flashVars.playerType) {
            case "eplayer21" :
            case "eplayer24" :
            case "eplayer29" :
            case "eplayer30" :
            case "eplayer31" :
            case "eplayer43" :
            case "eplayer44" :
            case "eplayer45" :
            case "eplayer47" :
                bannerHeight = 0;
                break;
            case "eplayer2"  :
            case "eplayer3"  :
            case "eplayer4"  :
            case "eplayer5"  :
            case "eplayer7"  :
            case "eplayer8"  :
            case "eplayer9"  :
            case "eplayer12" :
            case "eplayer13" :
            case "eplayer14" :
            case "eplayer15" :
            case "eplayer16" :
            case "eplayer17" :
            case "eplayer20" :
            case "eplayer22" :
            case "eplayer23" :
            case "eplayer26" :
            case "eplayer27" :
            case "eplayer28" :
            case "eplayer40" :
            case "eplayer41" :
            case "eplayer42" :
            case "eplayer46" :
            case "eplayer48" :
            case "eplayer50" :
                bannerHeight = 60;
                break;
        }

        return bannerHeight;
    },

    channelResult: function (result, genre, category, structureModel) {
        channelArr = result;
        var flashvars = TS.Modules.initialize.config.flashVars;
        var configObj = TS.Modules.initialize.config.configObject;
        var channelId = flashvars.channelId;
        if (!channelId && configObj.defaultChannel)
            channelId = configObj.defaultChannel;
        // GLOBAL_CONFIG_MODEL.currentChannelID = channelId;
        var channelObj = channelArr[0];
        for (var i in channelArr) {
            if (channelArr[i].id == channelId) {
                channelObj = channelArr[i];
            }
        }

        TS.Modules.initialize.config.configObject.defaultChannel = channelObj.id;
        // FB player
        if (TS.Modules.initialize.config.isFBPlayer)
            channelObj = {
                category: '',
                count: 1,
                genre: "Sport",
                id: '847232B6B26E4794801E52E209FA2F41',
                name: '',
                thumbnail: '',
                url: PATH_FACEBOOK + flashvars.partnerId + "/3/" + channelId + "/" + flashvars.videoUUId
            }

        TS.Modules.ChannellistModel = channelObj;
        TS.Modules.initialize.config.structureModel = structureModel;

        var mrssCB = function (channel, data) {
            var videoOBJ = {
                src: channel.list[0].group.content[0].url,
                title: channel.list[0].title
            };

            TS.Modules.videoView.setVideoSrc(videoOBJ);
        }

        TS.Modules.carouselview.init();
        E.trigger(E.EVENT_STRUCTURE_LOADED, TS.Modules.initialize.moduleName, {
            structure: structureModel,
            result: result,
            configModel: configObj,
            flashvars: flashvars
        });

        E.bindEvent(E.EVENT_PLAYLIST_LOADED, TS.Modules.initialize.moduleName, TS.Modules.initialize.onPlayListLoaded);
    },

    onPlayListLoaded: function (source, playlist) {
        if (TS.Modules.initialize.playlistLoaded === true)
            return;

        TS.Modules.loadingAnim.preload('hide');
        var videoItem = TS.Modules.initialize.getVideoItem(playlist.list);

        videoItem.index = 0;
        E.trigger(E.UPDATE_STYLE, this, videoItem.style);
        TS.Modules.PlaylistModel.initFromVideoItem(videoItem);

        if (TS.Modules.initialize.isAutoPlay()) {
            E.trigger(E.EVENT_SET_VIDEOSRC, TS.Modules.initialize.moduleName, videoItem);
        }
        else {
            E.trigger(E.EVENT_SET_VIDEOSRC_PRECLIP, TS.Modules.initialize.moduleName, videoItem);
        }

        TS.Modules.initialize.playlistLoaded = true;
        TS.Modules.initialize.postInitializedMessage();
    },

    getVideoItem: function (playlist) {
        var videoItem = playlist;

        try {
            if (typeof playlist[0] != "undefined" && typeof playlist.length != "undefined") {
                videoItem = playlist[0];
            }

            if (TS.Modules.ConfigModel.videoUUId && TS.Modules.ConfigModel.videoUUId != "") {
                for (var i = 0; i < playlist.length; i++) {
                    var listItem = playlist[i];

                    if (listItem.guid && listItem.guid["#text"] == TS.Modules.ConfigModel.videoUUId) {
                        videoItem = listItem;
                        break;
                    }
                }
            }
        }
        catch (error) {
            E.triggerError(TS.Modules.initialize, error);
        }


        return videoItem;
    },

    isAutoPlay: function () {
        var autoPlay = false;

        if (TS.Modules.ConfigModel.autoPlay && TS.Modules.ConfigModel.autoPlay == "true") {
            autoPlay = true;
        }

        return autoPlay;
    }

};
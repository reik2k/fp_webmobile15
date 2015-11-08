/**
 * Wrapper for the standard Liverail VPAID HTML5/Javascript implementation.
 *
 */

TS.Modules.LiveRailVPAIDManager = {
    autoInit: false,
    moduleName: "LiveRailVPAIDManager",
    adIsPlaying: false,
    lastOpenedVideoTitle: "",
    duration: 0,
    playedOnce: false,
    enabled: true,

    onAdVideoComplete: function () {
        if (TS.Modules.LiveRailVPAIDManager.videoItem != null) {
            TS.Modules.LiveRailVPAIDManager.adIsPlaying = false;
            TS.Modules.LiveRailVPAIDManager.videoItem = null;
            TS.Modules.LiveRailVPAIDManager.endOmnitureSession();
            TS.Modules.LiveRailVPAIDManager.adManager.removeListeners();

            if (TS.Modules.VastModel.postRoll) {
                TS.Modules.LiveRailVPAIDManager.triggerPostrollEnd();
            }
            else {
                TS.Modules.LiveRailVPAIDManager.triggerStartVideo();
            }
        }
    },

    triggerStartVideo: function () {
        E.trigger(E.EVENT_AD_ENDED, TS.Modules.LiveRailVPAIDManager.moduleName, {});
        E.trigger(E.EVENT_START_VIDEO, TS.Modules.LiveRailVPAIDManager.moduleName);
    },

    triggerPostrollEnd: function () {
        TS.Modules.VastModel.postRoll = false;
        E.trigger(E.EVENT_AD_ENDED, TS.Modules.LiveRailVPAIDManager.moduleName, {});
        E.trigger(E.EVENT_POSTROLL_END, TS.Modules.LiveRailVPAIDManager.moduleName);
        var player = $("#videoControl")[0];
        player.pause();
        player.src = '';
        player.removeAttribute("src");
    },

    isNascarLinkExists: function () {
        return TS.Modules.PlaylistModel.videoItem.links && TS.Modules.PlaylistModel.videoItem.links.link && TS.Modules.PlaylistModel.videoItem.links.link.href;
    },

    isResponsivePlayer: function () {
        var ret = false;

        switch (TS.Modules.ConfigModel.playerType) {
            case "eplayer40":
            case "eplayer41":
            case "eplayer42":
            case "eplayer43":
            case "eplayer44":
            case "eplayer45":
            case "eplayer46":
            case "eplayer47":
            case "eplayer48":
            case "eplayer50":
                ret = true;
                break;
        }

        return ret;
    },

    is169Player: function () {
      return TS.Modules.ConfigModel.playerType == "eplayer47";
    },

    getLiverailTags: function () {
        var tags = "";
        var configModel = TS.Modules.ConfigModel;
        var channelModel = TS.Modules.ChannellistModel;
        var autoPlay = configModel.autoPlay;
        var genre = TS.Modules.PlaylistModel.videoItem.genre;
        var category = TS.Modules.PlaylistModel.videoItem.category;
        var videoWidth = TS.Modules.initialize.config.videoWidth;
        var videoHeight = TS.Modules.initialize.config.videoHeight;
        var editorsPickItem = TS.Modules.PlaylistModel.getEditorsPickItem();
        var resize = this.isResponsivePlayer();

        if (editorsPickItem && editorsPickItem.genre && editorsPickItem.category) {
            genre = editorsPickItem.genre;
            category = editorsPickItem.category;
        }

        genre = genre.replace(/[^a-zA-Z0-9]/g, '_');
        category = category.replace(/[^a-zA-Z0-9]/g, '_');

        if (this.isNascarLinkExists()) {
            category = TS.Modules.PlaylistModel.videoItem.links.link.href;
        }

        var referrer = document.referrer;
        referrer = referrer.replace('http://', '');
        referrer = referrer.replace(/[^a-zA-Z0-9]/g, '_');

        tags += "HTML5=" + "true,";
        tags += "resize=" + resize + ",";
        tags += "autoPlay=" + autoPlay + ",";
        tags += "scrollToPlay=" + "false" + ",";
        tags += "startMute=" + configModel.startMute + ",";
        tags += "playerType=eplayer2,";
        tags += "playerSize=" + videoWidth + ",";
        tags += "genre=" + genre + ",";
        tags += "category=" + category + ",";
        tags += "hosturl=" + referrer + ",";
        tags += "169Player=" + this.is169Player() + ",";
        tags += "resize=" + resize + "XXX";
        tags += "autoPlay=" + autoPlay + "XXX";
        tags += "scrollToPlay=" + "false" + "XXX";
        tags += "startMute=" + configModel.startMute + "XXX";
        tags += "playerType=eplayer2XXX";
        tags += "playerSize=" + videoWidth + "XXX";
        tags += "genre=" + genre + "XXX";
        tags += "hosturl=" + referrer + "XXX";
        tags += "169Player=" + this.is169Player() + "XXX";
        tags += "category=" + category + "XXX__EOT";

        return tags;
    },

    init: function () {
        if (TS.Modules.initialize.config.flashVars.disableliverail === "true") {
            TS.Modules.LiveRailVPAIDManager.enabled = false;
        }

        if (TS.Modules.LiveRailVPAIDManager.enabled) {
            var adManager = new LiverailAdManager();

            this.adManager = adManager;
        }
        else {
            $("#videoControl").off("ended");
            $("#videoControl").on("ended", TS.Modules.LiveRailVPAIDManager.onVideoEnd);
            E.bindEvent(E.EVENT_SET_VIDEOSRC, TS.Modules.LiveRailVPAIDManager.moduleName, TS.Modules.LiveRailVPAIDManager.onSetVideoSrc, TS.Modules.LiveRailVPAIDManager);
        }
    },

    onSetVideoSrc: function (source, videoItem) {
        TS.Modules.LiveRailVPAIDManager.triggerStartVideo();
    },

    onVideoEnd: function () {
        E.trigger(E.EVENT_VIDEO_END, TS.Modules.LiveRailVPAIDManager, null);
        TS.Modules.LiveRailVPAIDManager.triggerPostrollEnd();
    },

    trackPlay: function () {
        var eventData = {};

        eventData.lastOpenedVideoTitle = TS.Modules.LiveRailVPAIDManager.lastOpenedVideoTitle;
        eventData.currentTime = TS.Modules.videoView.player.currentTime;

        if (!eventData.currentTime || eventData.currentTime.toString() == "NaN") {
            eventData.currentTime = "NaN";
        }

        E.trigger(E.EVENT_OMNITURE_AD_TRACK_PLAY, TS.Modules.LiveRailVPAIDManager, eventData);

        TS.Modules.OmnitureService.play(TS.Modules.LiveRailVPAIDManager.lastOpenedVideoTitle, TS.Modules.videoView.player.currentTime);
    },

    trackPause: function () {
        var eventData = {};

        eventData.lastOpenedVideoTitle = TS.Modules.LiveRailVPAIDManager.lastOpenedVideoTitle;
        eventData.currentTime = TS.Modules.videoView.player.currentTime;

        if (!eventData.currentTime || eventData.currentTime.toString() == "NaN") {
            eventData.duration = "NaN";
        }

        E.trigger(E.EVENT_OMNITURE_AD_TRACK_PAUSE, TS.Modules.LiveRailVPAIDManager, eventData);

        TS.Modules.OmnitureService.stop(TS.Modules.LiveRailVPAIDManager.lastOpenedVideoTitle, TS.Modules.videoView.player.currentTime);
    },

    endOmnitureSession: function () {
        if (TS.Modules.LiveRailVPAIDManager.lastOpenedVideoTitle != "") {
            var eventData = {};

            eventData.lastOpenedVideoTitle = TS.Modules.LiveRailVPAIDManager.lastOpenedVideoTitle;
            eventData.currentTime = TS.Modules.videoView.player.currentTime;

            if (!eventData.currentTime || eventData.currentTime.toString() == "NaN") {
                eventData.duration = "NaN";
            }

            E.trigger(E.EVENT_OMNITURE_AD_END_SESSION, TS.Modules.LiveRailVPAIDManager, eventData);


            TS.Modules.OmnitureService.stop(TS.Modules.LiveRailVPAIDManager.lastOpenedVideoTitle, TS.Modules.videoView.player.currentTime);
            TS.Modules.OmnitureService.close(TS.Modules.LiveRailVPAIDManager.lastOpenedVideoTitle);

            TS.Modules.LiveRailVPAIDManager.lastOpenedVideoTitle = "";
        }
    },

    startOmnitureSession: function () {
        TS.Modules.LiveRailVPAIDManager.lastOpenedVideoTitle = $("#videoControl").attr("src");

        if (TS.Modules.VastModel.postRoll) {
            TS.Modules.OmnitureService.setVideoType("postroll");
        }
        else {
            TS.Modules.OmnitureService.setVideoType("preroll");
        }

        var eventData = {};

        eventData.lastOpenedVideoTitle = TS.Modules.LiveRailVPAIDManager.lastOpenedVideoTitle;
        eventData.duration = TS.Modules.LiveRailVPAIDManager.duration;
        eventData.partner = "ePlayerHTML5 " + TS.Modules.ConfigModel.partner;

        if (!eventData.duration || eventData.duration.toString() == "NaN") {
            eventData.duration = "NaN";
        }

        E.trigger(E.EVENT_OMNITURE_AD_START_SESSION, TS.Modules.LiveRailVPAIDManager, eventData);

        TS.Modules.OmnitureService.setCustomData(this.getCustomData());
        TS.Modules.OmnitureService.open(TS.Modules.LiveRailVPAIDManager.lastOpenedVideoTitle, TS.Modules.LiveRailVPAIDManager.duration, "ePlayerHTML5 " + TS.Modules.ConfigModel.partner);
    },

    getCustomData: function () {
        var data = {};

        data.channel = TS.Modules.PlaylistModel.videoItem.fullChannelName;
        data.genre = TS.Modules.ChannellistModel.genre;
        data.contentIndex = TS.Modules.PlaylistModel.videoItem.index;
        data.contentKeywords = TS.Modules.PlaylistModel.videoItem.keywords;
        data.contentType = TS.Modules.PlaylistModel.videoItem.contentType;
        data.contentDuration = TS.Modules.PlaylistModel.duration;
        data.videoDuration = TS.Modules.LiveRailVPAIDManager.duration;
        data.windowLocation = document.location.href;

        return data;
    }


}



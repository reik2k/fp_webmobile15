TS.Modules.VolumeController = {
    moduleName: 'volumeController',
    autoInit: true,
    player: $("#videoControl")[0],
    isPC: false,

    init: function () {
        TS.Modules.VolumeController.isPC = !jQuery.browser.mobile && !(navigator.userAgent.match(/iPad|iPhone|iPod|Android/g));
        TS.Modules.VolumeController.player.volume = 1;

        if (!TS.Modules.VolumeController.isPC) {
            $("#volumeControl").remove();
        }

        if (navigator.userAgent.match(/iPad|iPhone|iPod/g)) {
            $("#mute").remove();

            return;
        }

        E.bindEvent(E.EVENT_STRUCTURE_LOADED, this.moduleName, this.onStructureLoaded, this);
        E.bindEvent(E.EVENT_FULLSCREEN_CHANGED, this.moduleName, this.onFullscreenChanged, this);
    },

    onStructureLoaded: function () {

        this.setStartVolume();

        $("#muteIcon").on("click", function () {
            TS.Modules.VolumeController.onMuteClick();
        });

        if (TS.Modules.VolumeController.isPC) {
            $("#volumeControl").on("click", function (event) {
                TS.Modules.VolumeController.onVolumeControlClick(event);
            });

            $("#mute").on("mouseover", function () {
                TS.Modules.VolumeController.onMuteOver();
            });

            $("#mute").on("mouseout", function () {
                TS.Modules.VolumeController.onMuteOut();
            });

            $("#volumeControl").on("mouseover", function () {
                TS.Modules.VolumeController.onMuteOver();
            });

            $("#volumeControl").on("mouseout", function () {
                TS.Modules.VolumeController.onMuteOut();
            });
        }

        if (!TS.Modules.ConfigModel.soundOnClick) {
            $(window).on("mouseover mousemove", function () {

                TS.Modules.VolumeController.setRollOverVolume();
                TS.Modules.ConfigModel.userInterActionHappened = true;
                $(window).off("mouseover mousemove");

            });
        } else {
            $(window).on("click", function () {
                TS.Modules.VolumeController.setRollOverVolume();
                TS.Modules.ConfigModel.userInterActionHappened = true;
                $(window).off("click");
            });
        }
   },

    onFullscreenChanged: function () {
        TS.Modules.ConfigModel.volume = this.player.volume;
        if(TS.Modules.ConfigModel.volume === 0){
            $("#mute").addClass("toggle-mute-on");
            $("#mute").removeClass("toggle-mute-off");
        }
        TS.Modules.VolumeController.updateVolumeSliderVolume();
    },

    onVolumeControlClick: function (event) {
        TS.Modules.ConfigModel.volume = (80 - event.offsetY) / 80;

        if (TS.Modules.ConfigModel.volume <= 0) {
            TS.Modules.ConfigModel.volume = 0;
            this.setMuteOnStyle();
        } else {
            this.setMuteOffStyle();
        }

        this.player.volume = TS.Modules.ConfigModel.volume;
        this.updateVolumeSliderVolume();
    },

    onMuteClick: function () {
        if (TS.Modules.ConfigModel.volume) {
            this.mutePlayer();
        } else {
            this.unMutePlayer();
        }

        $("#mute").addClass("zindex500");
        $("#mute").removeClass("zindex203");
    },

    onMuteOver: function () {
        $("#volumeControl").attr("class", "displayYes");
        $("#mute").addClass("zindex500");
        $("#mute").removeClass("zindex203");
    },

    onMuteOut: function () {
        $("#volumeControl").attr("class", "displayNo");
        $("#mute").removeClass("zindex500");
        $("#mute").addClass("zindex203");
    },

    mutePlayer: function () {
        TS.Modules.ConfigModel.prevVolume = TS.Modules.ConfigModel.volume;
        TS.Modules.ConfigModel.volume = 0;
        this.setMuteOnStyle();
        this.player.volume = TS.Modules.ConfigModel.volume;
        this.updateVolumeSliderVolume();
    },

    setMuteOnStyle : function(){
        $("#mute").addClass("toggle-mute-on");
        $("#mute").removeClass("toggle-mute-off");
    },

    setMuteOffStyle : function(){
        $("#mute").addClass("toggle-mute-off");
        $("#mute").removeClass("toggle-mute-on");
    },

    unMutePlayer: function () {
        TS.Modules.ConfigModel.volume = TS.Modules.ConfigModel.prevVolume;
        this.setMuteOffStyle();

        if(!TS.Modules.VolumeController.isPC){
            TS.Modules.ConfigModel.volume = 1;
        }

        this.player.volume = TS.Modules.ConfigModel.volume;
        this.updateVolumeSliderVolume();
    },

    updateVolumeSliderVolume: function () {
        var volume = TS.Modules.ConfigModel.volume * 100;

        if (volume > 95) {
            volume = 95;
        }

        if (volume <= 0) {
            $("#volumeSlider").css("height", "0%");
        } else {
            $("#volumeSlider").css("height", volume + "%");
        }
    },

    setRollOverVolume: function () {
        if (TS.Modules.ConfigModel.volume == 0 && !TS.Modules.ConfigModel.userInterActionHappened) {
            try
            {
                if(TS.Modules.VolumeController.isPC){
                    TS.Modules.ConfigModel.volume = Number(TS.Modules.CustomRulesModel.getRule("startVolumeForRollOver")) / 100;
                    TS.Modules.ConfigModel.prevVolume = Number(TS.Modules.CustomRulesModel.getRule("startVolumeForRollOver")) / 100;
                } else {
                    TS.Modules.ConfigModel.volume = 1;
                    TS.Modules.ConfigModel.prevVolume = 1;
                }
               this.unMutePlayer();
            } catch (error) {
                //nothing to do
            }
        }
    },

    setStartVolume: function () {
        try {
            if (TS.Modules.VolumeController.isPC) {
                TS.Modules.ConfigModel.volume = Number(TS.Modules.CustomRulesModel.getRule("startVolume")) / 100;
                TS.Modules.ConfigModel.prevVolume = Number(TS.Modules.CustomRulesModel.getRule("startVolume")) / 100;

                this.player.volume = TS.Modules.ConfigModel.volume;
            }

        } catch (error) {
            //nothing to do
        }

        if (TS.Modules.ConfigModel.startMute === true || TS.Modules.ConfigModel.startMute === "true") {
            this.mutePlayer();
        }
    }
}

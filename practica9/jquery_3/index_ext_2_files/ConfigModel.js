TS.Modules.ConfigModel =
{
    moduleName: 'ConfigModel',
    config: {},
    autoInit: false,
    playerId: "",
    eplayerID : "",
    playerType: "",
    country: "",
    locale: "en-gb",
    adService: "",
    autoPlay: "",
    scrollToPlay: "false",
    soundOnClick : false,
    channelService: "",
    defaultChannel: "",
    height: "",
    language: "",
    navigation: "",
    partner: "",
    playlistSettings: "",
    resourceBundle: "",
    startMute: "",
    styleSheet: "",
    width: "",
    device : "",
    videoUUId: "",
    colors: { dark: "116124", middle: "#0c4419", light: "#082f11"},
    styles: null,
    channelId: "",
    FACEBOOK_BASE: PATH_FACEBOOK,
    windowLocation: "",
    windowLocationFull : "",
    isDesktop: false,
    isFullSizeAvailable : false,
    OVERLAY_PLAYERS      : [0, 0, 0, 0, 0, 0, 0, 0, 1 , 1, 0, 0, 0, 0, 0, 0, 0, 0 , 0 , 0, 0, 1 , 1 , 1 , 1 , 1 , 1 , 1 , 0, 1 , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    VIDEOBROWSER_PLAYERS : [1, 0, 0, 0, 1, 0, 0, 1, 0 , 0, 1, 0, 1, 0, 1, 0, 1, 0 , 0 , 1, 0, 0 , 0 , 0 , 0 , 0 , 0 , 0 , 1, 0 , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1],
    HEIGHTS_CONTROL_BAR  : [20 , 30 , 30 , 30 , 20 , 30 , 30 , 20 , 36 , 26 , 20 , 26 , 20 , 30 , 22 , 36 , 20 , 0, 0, 20 , 30 , 36 , 36 , 36 , 26 , 30 , 30 , 36 , 20 , 36 , 30, 0, 0, 0, 0, 0, 0, 0, 0, 36, 36, 36, 36, 36, 36, 36, 36, 36, 0, 36],
    FULL_CONTROL_BAR_HEIGHT : 36,
    isFullscreenOn : false,
    volume : 0.7,
    prevVolume : 0.7,
    userInterActionHappened : false,
    isNextVideoPlay : false,
    isPC : false,

    getFaceBookPlayListURL: function ()
    {
        var playerTypeNumber = "3";

        return this.FACEBOOK_BASE +
            this.partner + "/" +
            playerTypeNumber + "/" +
            this.channelId + "/" +
            this.videoUUId;
    }
}

TS.Modules.ConfigModel.isResponsivePlayer = function()
{
    var ret = false;

    if(this.playerType)
    {
        switch(this.playerType.toLowerCase())
        {
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
    }

    return ret;
}

TS.Modules.ConfigModel.isOverlayPlayer = function()
{
    var ret = false;

    if(this.playerType)
    {
        ret =  this.OVERLAY_PLAYERS[this.getIndexFromPlayerType()];
    }

    return ret;
}

TS.Modules.ConfigModel.isVideoBrowserPlayer = function()
{
    var ret = false;

    if(this.playerType)
    {
        ret =  this.VIDEOBROWSER_PLAYERS[this.getIndexFromPlayerType()];
    }

    return ret;
}

TS.Modules.ConfigModel.getControlBarHeight = function ()
{
    return this.HEIGHTS_CONTROL_BAR[this.getIndexFromPlayerType()];
},


TS.Modules.ConfigModel.getFullControlBarHeight = function ()
{
    return this.FULL_CONTROL_BAR_HEIGHT;
},

TS.Modules.ConfigModel.getIndexFromPlayerType = function()
{
    var index = 0;

    if(this.playerType)
    {
        try
        {
            index = parseInt(this.playerType.toLowerCase().replace("eplayer", ""));
            index--;
        }
        catch(error)
        {
            //nothing to do
        }
    }

    return index;
};


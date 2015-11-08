TS.Modules.AdtechService =
{
    autoInit 		: false,
    moduleName 	    : "AdtechService",
    enabled		    : true,
    url             : "",
    BASE_URL        : window.location.protocol == 'https:' ? "https://adserver.adtech.de/?adrawdata/3.0/327.0/" : "http://adserver.adtech.de/?adrawdata/3.0/327.0/",
    DATE_TEXT       : "$DATE$",

    init : function()
    {
        this.addListeners();
    },

    addListeners : function()
    {
        E.bindEvent(E.EVENT_SET_VIDEOSRC        , this.moduleName   , this.onSetVideoSource   , this);
        E.bindEvent(E.EVENT_SET_VIDEOSRC_PRECLIP, this.moduleName   , this.onSetVideoSource   , this);
    },

    onSetVideoSource : function()
    {
        this.tryToLoad();
    },

    tryToLoad: function ()
    {
        if (this.isEnabled())
        {
            var newUrl = this.assembleURL();

            if (newUrl != this.url)
            {
                this.url = newUrl;

                this.load();
            }
        }
    },

    isEnabled: function ()
    {
        return  TS.Modules.CustomRulesModel.getRule("isHeliosEnabled");
    },

    assembleURL: function ()
    {
        var w   = TS.Modules.ConfigModel.width;
        var url = this.BASE_URL;

        if (w >= 200 && w <= 299)      url += "4591558/0/16";
        else if (w >= 300 && w <= 349) url += "4591553/0/16";
        else if (w >= 350 && w <= 399) url += "4591557/0/16";
        else if (w >= 400 && w <= 449) url += "4591562/0/16";
        else if (w >= 450 && w <= 499) url += "4591556/0/16";
        else if (w >= 500 && w <= 549) url += "4591561/0/16";
        else if (w >= 550 && w <= 599) url += "4591555/0/16";
        else if (w >= 600 && w <= 649) url += "4591559/0/16";
        else if (w >= 650 && w <= 699) url += "4591560/0/16";
        else if (w >= 700 && w <= 749) url += "4591554/0/16";
        else if (w >= 750 && w <= 799) url += "4591567/0/16";
        else if (w >= 800 && w <= 849) url += "4591564/0/16";
        else if (w >= 850 && w <= 899) url += "4591566/0/16";
        else if (w >= 900 && w <= 949) url += "4591563/0/16";
        else if (w >= 950)             url += "4591565/0/16";

        url += "/noperf=1;cc=2;cors=yes;header=yes;cookie=yes;adct=204;key=key1+key2;";
        url += "misc="          + this.DATE_TEXT;
        url += "kvplayerId="    + TS.Modules.ConfigModel.playerId   + ";"
        url += "kvchannelId="   + this.getCurrentVideoChannelId()   + ";"
        url += "kvpartnerId="   + TS.Modules.ConfigModel.partner    + ";"
        url += "kvplayerType="  + TS.Modules.ConfigModel.playerType + ";"
        url += "kvtype="        + "html5"                           + ";"
        url += "kvcountryid="   + TS.Modules.ConfigModel.country;

        return url;
    },

    getCurrentVideoChannelId : function()
    {
        var channelID       = TS.Modules.ChannellistModel.id;
        var editorsPickItem = TS.Modules.PlaylistModel.getEditorsPickItem();

        if (editorsPickItem && editorsPickItem.id)
        {
            channelID = editorsPickItem.id;
        }

        return channelID;
    },

    load : function()
    {
        $.ajax({
            url     : this.getUrlWithTimeStamp(),
            type    : "GET",
            cache   : false,
            dataType: "text",
            success : TS.Modules.AdtechService.onLoadSuccess,
            error   : TS.Modules.AdtechService.onLoadError,
            context : this
        });
    },

    getUrlWithTimeStamp: function ()
    {
        return this.url.replace(this.DATE_TEXT, this.getTimeStamp());
    },

    getTimeStamp: function ()
    {
        return "" + (new Date()).getTime();
    },

    onLoadSuccess : function(data)
    {
        if(data)
        {
           try
           {
               var xml = $(jQuery.parseHTML(data));

               if(this.isBannerInfoNodeMissing(xml))
               {
                   E.trigger(E.EVENT_HELIOS_LOAD_NO_VALID_DATA, this.moduleName, "there is no banner-info node!");
               }
               else
               {
                   this.updateModel(xml);
                   E.trigger(E.EVENT_HELIOS_LOAD_OK, this.moduleName);
               }
           }
           catch(error)
           {
               E.trigger(E.EVENT_HELIOS_LOAD_NO_VALID_DATA, this.moduleName, error);
           }
        }
        else
        {
            E.trigger(E.EVENT_HELIOS_LOAD_NO_DATA, this.moduleName);
        }
    },

    isBannerInfoNodeMissing: function (xml)
    {
        var bannerInfo       = xml.find("banner-info");

        return bannerInfo.length == 0;
    },

    updateModel: function (xml)
    {
        var bannerInfo       = xml.find("banner-info");

        TS.Modules.AdtechModel.image                = bannerInfo.find("img").attr("url");
        TS.Modules.AdtechModel.link                 = bannerInfo.find("link").attr("url");
        TS.Modules.AdtechModel.horizontalAlignment  = bannerInfo.find("logoHorizontalAlignment").text();
        TS.Modules.AdtechModel.verticalAlignment    = bannerInfo.find("logoVerticalAlignment").text();
        TS.Modules.AdtechModel.fillBackground       = bannerInfo.find("fillBackground").text();
        TS.Modules.AdtechModel.gradientOrientation  = bannerInfo.find("backgroundColor").attr("gradientOrientation");
        TS.Modules.AdtechModel.backgroundColor      = bannerInfo.find("backgroundColor").text();
    },

    onLoadError: function( jqXHR, textStatus )
    {
        E.trigger(E.EVENT_HELIOS_LOAD_ERROR, this.moduleName);
    }

};
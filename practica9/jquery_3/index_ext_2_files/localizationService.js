TS.Modules.localizationService = {
    moduleName: 'localizationService',
    // CONFIG
    config: {},
    autoInit: false,
    locales: [],

    init: function () {
        this.baseURL = PATH_LOCAL_FILES;
        this.localeFile = "eplayer.properties";
        this.localeTexts = new Array();

        this.initLocales();
        this.loadLocaleFile(TS.Modules.ConfigModel.language);
    },

    //previous allowed locales
    initLocales: function () {
        this.locales.push("ar_AE");
        this.locales.push("ar_AR");
        this.locales.push("ar_BH");
        this.locales.push("ar_DZ");
        this.locales.push("ar_EG");
        this.locales.push("ar_IR");
        this.locales.push("ar_JO");
        this.locales.push("ar_KW");
        this.locales.push("ar_LB");
        this.locales.push("ar_LY");
        this.locales.push("ar_MA");
        this.locales.push("ar_OM");
        this.locales.push("ar_PS");
        this.locales.push("ar_QA");
        this.locales.push("ar_SA");
        this.locales.push("ar_SS");
        this.locales.push("ar_SY");
        this.locales.push("ar_TN");
        this.locales.push("cs_CZ");
        this.locales.push("de_DE");
        this.locales.push("el_GR");
        this.locales.push("en_AU");
        this.locales.push("en_BA");
        this.locales.push("en_GB");
        this.locales.push("en_GR");
        this.locales.push("en_MY");
        this.locales.push("en_US");
        this.locales.push("es_ES");
        this.locales.push("fi_FI");
        this.locales.push("fr_FR");
        this.locales.push("hu_HU");
        this.locales.push("it_IT");
        this.locales.push("jp_JP");
        this.locales.push("ko_KR");
        this.locales.push("nl_NL");
        this.locales.push("no_NO");
        this.locales.push("pl_PL");
        this.locales.push("pt_PT");
        this.locales.push("ro_RO");
        this.locales.push("si_SI");
        this.locales.push("sk_SK");
        this.locales.push("sv_SE");
        this.locales.push("tr_TR");
        this.locales.push("pe_PE");
        this.locales.push("uy_UY");
    },

    isAvailableLocale: function (locale) {
        var ret = false;

        for (var i = 0; i < this.locales.length; i++) {
            if (locale && locale.toLowerCase() == this.locales[i].toLowerCase()) {
                ret = true;
                break;
            }
        }

        return ret;
    },

    getSimilarLocale: function (locale) {
        var ret = "en_GB";

        if (!locale) {
            locale = ret;
        }

        if (locale.toLowerCase().indexOf("en_") == 0) {
            ret = "en_GB";
        }
        else if (locale.toLowerCase().indexOf("ar_") == 0) {
            ret = "ar_AE";
        }
        else if (locale.toLowerCase().indexOf("cs_") == 0) {
            ret = "cs_CZ";
        }
        else if (locale.toLowerCase().indexOf("de_") == 0) {
            ret = "de_DE";
        }
        else if (locale.toLowerCase().indexOf("el_") == 0) {
            ret = "el_GR";
        }
        else if (locale.toLowerCase().indexOf("es_") == 0) {
            ret = "es_ES";
        }
        else if (locale.toLowerCase().indexOf("fi_") == 0) {
            ret = "fi_FI";
        }
        else if (locale.toLowerCase().indexOf("fr_") == 0) {
            ret = "fr_FR";
        }
        else if (locale.toLowerCase().indexOf("hu_") == 0) {
            ret = "hu_HU";
        }
        else if (locale.toLowerCase().indexOf("it_") == 0) {
            ret = "it_IT";
        }
        else if (locale.toLowerCase().indexOf("jp_") == 0) {
            ret = "jp_JP";
        }
        else if (locale.toLowerCase().indexOf("ko_") == 0) {
            ret = "ko_KR";
        }
        else if (locale.toLowerCase().indexOf("nl_") == 0) {
            ret = "nl_NL";
        }
        else if (locale.toLowerCase().indexOf("no_") == 0) {
            ret = "no_NO";
        }
        else if (locale.toLowerCase().indexOf("pl_") == 0) {
            ret = "pl_PL";
        }
        else if (locale.toLowerCase().indexOf("pt_") == 0) {
            ret = "pt_PT";
        }
        else if (locale.toLowerCase().indexOf("ro_") == 0) {
            ret = "ro_RO";
        }
        else if (locale.toLowerCase().indexOf("si_") == 0) {
            ret = "si_SI";
        }
        else if (locale.toLowerCase().indexOf("sk_") == 0) {
            ret = "sk_SK";
        }
        else if (locale.toLowerCase().indexOf("sv_") == 0) {
            ret = "sv_SE";
        }
        else if (locale.toLowerCase().indexOf("tr_") == 0) {
            ret = "tr_TR";
        }

        return ret;
    },

    loadLocaleFile: function (locale) {

        var isAvalaible = TS.Modules.CustomRulesModel.getRule("isLocaleAllowed", false);

        if (!isAvalaible) {
            locale = this.getSimilarLocale(locale);
        }

        var url = this.baseURL + "/" + locale + "/" + this.localeFile;

        $.ajax({
            url: url,
            type: "GET",
            dataType: "text",
            success: this.onSuccess,
            error: this.onError,
            context: this
        });
    },

    onError: function (jqXHR, textStatus) {
        $.trace.error("Localization::Error: " + textStatus);

        E.trigger(E.EVENT_LOCALE_FILE_LOAD_ERROR,
            TS.Modules.localizationService.moduleName,
            textStatus);
    },

    onSuccess: function (fileData) {
        $.trace.info("Localization::Success: " + fileData);

        this.initLocaleTextsFromFile(fileData);

        E.trigger(E.EVENT_LOCALE_FILE_LOADED,
            TS.Modules.localizationService.moduleName,
            TS.Modules.localizationService);
    },

    initLocaleTextsFromFile: function (fileData) {
        var lines = fileData.split("\n");

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            var localeKeyAndValue = line.split("=");

            if (localeKeyAndValue && localeKeyAndValue.length == 2) {
                var localeText = new Object();

                localeText.key = localeKeyAndValue[0];
                localeText.value = localeKeyAndValue[1];

                this.localeTexts.push(localeText);
            }
        }
    },

    getLocaleText: function (key, values) {
        var text = key;

        for (var i = 0; i < this.localeTexts.length; i++) {
            var localeText = this.localeTexts[i];

            if (localeText.key == key) {
                text = localeText.value;
                break;
            }
        }

        try {
            if (values && $.isArray(values)) {
                for (var i = 0; i < values.length; i++) {
                    var regexp = new RegExp('\\{' + i + '\\}', 'gi');
                    text = text.replace(regexp, values[i]);
                }
            } else if (values !== undefined && values !== null) {
                var regexp = new RegExp('\\{' + 0 + '\\}', 'gi');
                text = text.replace(regexp, values);
            }
        }
        catch (error) {
            //not handled
        }


        return text;
    }


};


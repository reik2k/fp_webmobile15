TS.Modules.mrssService = {
    moduleName: 'mrssService',
    // CONFIG
    config: {},
    autoInit: false,
    firstLoad: true,
    channel: null,
    limit: null,
    total: null,
    offset: null,
    callbackDraw: null,
    carousel: null,
    postclipCb: null,

    init: function (_channel, _limit, _offset, _cb, _carousel, _postclip) {
        if (typeof _channel.list == "undefined") {
            _channel.list = [];
        }
        if (typeof _channel.offsets == "undefined") {
            _channel.offsets = [];
        }
        this.channel = _channel;
        this.carousel = _carousel;
        this.limit = _limit;
        this.total = _channel.count ? _channel.count : _channel.items;
        this.offset = parseInt(_offset) + 1;
        this.callbackDraw = _cb;
        this.postclip = _postclip;

        if (TS.Modules.initialize.config.isFBPlayer) {
            this.channel.url = TS.Modules.ChannellistModel.url;
        }

        TS.Modules.ChannellistModel = this.channel;

        var offsetExists = this.checkOffset(this.offset);

        if (!offsetExists && this.channel.list.length < this.total) {
            this.load(_channel.url);
        }
        else {
            return true;
        }

        return false;
    },

    initWithVideo: function (_channel, _limit, _offset, _cb, videoID)
    {
        _channel.list = [];
        _channel.offsets = [];

        this.channel = _channel;
        this.limit = _limit;
        this.total = _channel.count ? _channel.count : _channel.items;
        this.offset = parseInt(_offset) + 1;
        this.callbackDraw = _cb;
        this.carousel = null;

        TS.Modules.ChannellistModel = this.channel;

        this.loadWithVideo(_channel.url, videoID, TS.Modules.mrssService.callback);
    },


    loadWithVideo: function (_url, videoID, callbackFunction)
    {
        var  playlistURL = _url + '/' + videoID + '?_fmt=jsonp&_clbk=?';

        $.ajax(
            {
                url: playlistURL,
                dataType: 'jsonp',
                jsonpCallback: 'callback',
                success: callbackFunction,
                context : this
            });
    },

    load: function (_url)
    {
        if(window.location.protocol == 'https:')
        {
            _url = _url.replace("http:", "https:");
        }

        var limits = this.computeLimit(this.offset);
        var playlistURL = _url + '/' + limits[1] + '-' + limits[0] + '?_fmt=jsonp&_clbk=callback';

        if (this.firstLoad && TS.Modules.ConfigModel.videoUUId && TS.Modules.ConfigModel.videoUUId != '') {
            this.firstLoad = false;

           this.loadWithVideo(_url, TS.Modules.ConfigModel.videoUUId, TS.Modules.mrssService.callbackVideoUUID);
        }
        else {
            $.ajax(
                {
                    url: playlistURL,
                    dataType: 'jsonp',
                    jsonpCallback: 'callback',
                    success: function (data) {
                        TS.Modules.mrssService.callback(data);
                    },
                    error: TS.Modules.mrssService.onLoadError
                });
        }
    },

    onLoadError: function () {
        E.trigger(E.EVENT_PLAYLIST_LOAD_ERROR, TS.Modules.mrssService.moduleName);
    },

    callbackVideoUUID: function (data) {
        var service = TS.Modules.mrssService;

        if (service.hasMoreThanOneVideo(data)) {
            for (var i = 0; i < data.channel.item.length; i++) {
                service.addVideoItemToChannel(data.channel.item[i], data);
            }
        }
        else {
            service.addVideoItemToChannel(data.channel.item, data);
        }

        TS.Modules.initialize.onPlayListLoaded(this, service.channel);
        service.load(service.channel.url);
    },

    updateStyles: function (data) {
        if (typeof data.channel.item[0] != "undefined" && typeof data.channel.item.length != "undefined") {
            for (var i = 0; i < data.channel.item.length; i++) {
                data.channel.item[i].style = data.channel.style;
            }
        }
        else {
            data.channel.item.style = data.channel.style;
        }
    },

    callback: function (data)
    {
        totalOffset = Math.ceil(this.total / this.limit);

        var listLength = this.channel.list.length;
        this.channel.offsets.push({ _offset: data.channel.page.offset, _data: data });
        if (!this.channel.style) {
            this.channel.style = data.channel.style;
        }

        if (this.hasMoreThanOneVideo(data))
        {
            for (var i = 0; i < data.channel.item.length; i++)
            {
                this.addVideoItemToChannel(data.channel.item[i], data);
            }
        }
        else
        {
            this.addVideoItemToChannel(data.channel.item, data);
        }

        if (this.carousel) {
            if (listLength > 0) {
                this.callbackDraw(listLength);
                if (this.postclip) {
                    E.trigger(E.EVENT_PLAYLIST_CHANGED, this.moduleName);
                }
            }
            else {
                this.callbackDraw();
            }
        }
        else {

            this.callbackDraw(this.channel, data);
        }

        E.trigger(E.EVENT_PLAYLIST_LOADED, this.moduleName, this.channel);

        return;
    },

    hasMoreThanOneVideo: function (data)
    {
        return typeof data.channel.item[0] != "undefined" && typeof data.channel.item.length != "undefined";
    },

    addVideoItemToChannel: function (videoItem, data)
    {
        videoItem.style         = typeof data.channel.style != "undefined" ? data.channel.style : videoItem.style;
        videoItem.category      = this.channel.category;
        videoItem.genre         = this.channel.genre;
        videoItem.channelName   = this.channel.name;
        videoItem.channelId     = this.channel.id;
        videoItem.fullChannelName = this.getFullChannelName();

        this.channel.list.push(videoItem);
    },

    getFullChannelName : function()
    {
        var ret             = "";
        var genre           = this.channel.genre;
        var category        = this.channel.category;

        genre       = genre.replace(/[^a-zA-Z0-9]/g, '_');
        category    = category.replace(/[^a-zA-Z0-9]/g, '_');
        ret         = "Guide:" + genre + ":" + category + ":" + this.channel.name;

        return ret;
    },


    computeLimit: function (_offset) {
        var limit = [];
        limit[0] = ( _offset * 6 );   // LIMIT TO
        limit[1] = limit[0] - 5;            // LIMIT FROM
        return limit;
    },

    checkOffset: function (_offset) {
        for (var i = 0; i < this.channel.offsets.length; i++) {
            if (parseInt(this.channel.offsets[i]._offset) == _offset) {
                return true;
                break;
            }
        }
        return false;
    }



};

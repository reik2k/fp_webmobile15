TS.Modules.channelService  = {
  moduleName: 'channelService',
  // CONFIG
  config: {},
  autoInit: false,
  callback: null,
  
  load: function( url, cb ) {
    $.trace.info("ChannelService::Loading: " + url + '?_fmt=jsonp&_clbk=?')
    TS.Modules.channelService.callback = cb;
    url = url + '?_fmt=jsonp&_clbk=?'
    
    $.ajax({
      url: url,
      type: "GET",
      cache: false,
      dataType:"jsonp",
      jsonp: '_clbk',
      success: TS.Modules.channelService.onSuccess,
      error: TS.Modules.channelService.onError  
    });  
  },
  
  onSuccess: function( structureModel ) {
    var result = TS.Modules.channelService.getResult(structureModel);

    TS.Modules.channelService.filterStructure(structureModel);
    TS.Modules.channelService.filterResult(result);
    
    structureModel.allChannels = result;
    
    TS.Modules.channelService.callback(result, "", "",structureModel);
  },

  getResult : function(structureModel)
  {
      var result = [];

      for(var i = 0; i < structureModel.length; i++)
      {
          var genreChannels = this.getGenreChannels(structureModel[i]);

          jQuery.merge( result, genreChannels );
      }

      return result;
  },

  getGenreChannels : function (genre)
  {
    this.makeArray(genre, "category");

    var result = $.map(genre.category, function(category, index)
    {
        if ($.isArray(category.channel)){
            category.channel = $.map(category.channel, function(item, index){ item.count = item.items; delete item.items; return item; })
        }
        else {
            category.channel.count = category.channel.items;
            delete category.channel.items;
            category.channel = [category.channel];
        }

        return category.channel;
    });

    return result;
  },

  onError: function( jqXHR, textStatus ) {
    $.trace.error("ChannelService::Error: " + textStatus)  
  },

  filterResult: function (result) {
  	try
  	{
  		for(var i = 0; i < result.length; i++)
	  	{
	  		var channel = result[i];
	  		
	  		if( !TS.Modules.CustomRulesModel.getRule("isChannelEnabled", null, [channel.id, !jQuery.browser.mobile]))
	  		{
	  			result.splice(i, 1);
	  			i--;
	  		}
	  	}
  	}
  	catch(error)
  	{
        E.triggerError(TS.Modules.channelService, error, "ChannelService::Filter result error.");
  	}
  },

  filterStructure: function (structure)
  {
  	try
  	{
  		for(var i = 0; i < structure.length; i++)
	  	{
	  		var genre = structure[i];

            this.makeArray(genre, "category");
	  		
	  		for(var j = 0; j < genre.category.length; j++)
	  		{
	  			var category = genre.category[j];

                this.makeArray(category, "channel");
	  			
	  			for(var k = 0; k < category.channel.length; k++)
	  			{
	  				var channel = category.channel[k];

                    channel.genre       = genre.name;
                    channel.category    = category.name;
	  				
	  				if(!TS.Modules.CustomRulesModel.getRule("isChannelEnabled", null, [channel.id, !jQuery.browser.mobile]))
	  				{
	  					category.channel.splice(k, 1);
	  					k--;
	  				}
	  			}
	  		}
	  	}
  	}
  	catch(error)
  	{
        E.triggerError(TS.Modules.channelService, error, "ChannelService::Filter structure error.");
  	}
  },

  makeArray: function (object, property)
  {
        if (!$.isArray(object[property]) && object[property])
        {
            object[property] = [object[property]];
        }
  },
  
  getDefaultGenre: function (structure) {
    var defaultGenre = null;
      
    for(var i = 0; i < structure.length; i++)
    {
      var genres = structure[i];
      
      if(i == 0)
      {
        defaultGenre = genres;
      }
      
      if (!$.isArray(genres.category))
        {
          genres.category = [genres.category];
        }
      
      
      for(var j = 0; j < genres.category.length; j++)
      {
        var category = genres.category[j];
        
        if (!$.isArray(category.channel))
          {
            category.channel = [category.channel];
          }
        
        for(var k = 0; k < category.channel.length; k++)
        {
          var channel = category.channel[k];
          
          if(channel.id.toLowerCase() == TS.Modules.initialize.config.configObject.defaultChannel.toLowerCase())
          {
            return genres;
          }
        }
      }
    }
    
    
    return defaultGenre;
  }
};

TS.Modules.channelService.getFullChannelName = function()
{
    var ret             = "";
    var channelModel    = TS.Modules.ChannellistModel;
    var editorsPickItem = TS.Modules.PlaylistModel.getEditorsPickItem();
    var genre           = typeof channelModel.genre     == "undefined" ? "" : channelModel.genre;
    var category        = typeof channelModel.category  == "undefined" ? "" : channelModel.category;

    if (editorsPickItem && editorsPickItem.genre && editorsPickItem.category)
    {
        genre       = editorsPickItem.genre;
        category    = editorsPickItem.category;
    }

    genre       = genre.replace(/[^a-zA-Z0-9]/g, '_');
    category    = category.replace(/[^a-zA-Z0-9]/g, '_');
    ret         = "Guide:" + genre + ":" + category + ":" + channelModel.name;

    return ret;
};


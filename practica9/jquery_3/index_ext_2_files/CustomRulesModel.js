TS.Modules.CustomRulesModel = 
{
	moduleName					: 'CustomRulesModel',
	autoInit					: false,
	LR_ADMAP					:"", // used
	adCloseDelay				: 10000, // used
	customSkin					: false,
	extraComscoreBeacon			: undefined, // used
	facebookAppURL				: "",
	getChannelType				: "none", // used
	isAdClosingEnabled			: false, // used
	isAlwaysAutoNextClipEnabled	: false,
	isAutoNextClipEnabled		: true,
	isBannerVisibleWhenVideoPlaying		: false, 
	isChannelEnabled			: true, // used
	isDimestoreEnabled			: false,
	isExternalFontsDisabled		: false,
	isFacebookEnabled			: true, // used
	isFacebookShareEnabled		: false,
	isHeliosEnabled				: false,
	isSetStartMuteEnabled		: false,
	isSetVolumeInstantly		: false,
	isSwitchingOnSoundForClick	: false,
	isSwitchingOnSoundForRollOver: true,
	isUseAkamai					: true, 
	liverailTimeOut				: 15, // used
	maximumVideoBitrate			: NaN,
	maximumVideoBitrateInFullscreen		: NaN,
	newOmnitureAccount			: "",
	resumeAdWhenUserClicks		: false, // used
	soundOnTime					: 2000,
	startVolume					: 70,
	startVolumeForRollOver		: 70,
	startVolumeSetFromSharedObject		: false,
	startWithTextState			: false, // used
	stylesheetURL				: "",
	videoStartedScript			: "",
    externalParams              : null,
    checkedRule                 :null,
	rulesMap                    :null,

	getRule:function(ruleName,defaultValue, externalParams)
    {
	  this.externalParams = externalParams;

    var returnValue = (defaultValue) ? defaultValue : null;
	  try{
	    var checkedRule = this.rulesMap[ruleName.toLowerCase()];
	    this.checkedRule = checkedRule;
      var isRuleNodeTrue = false;
      returnValue = checkedRule.defaultReturn;
	    

	       // iterate on root condition nodes
        for(var i = 0; i < checkedRule.conditions.length; i++){
          var rootCondition =  checkedRule.conditions[i];
          
         
          // endPoint of condition
          if(!rootCondition.hasSubConditions)
            {
              isRuleNodeTrue = this.checkCondition(rootCondition);
            }
          //there is subcondition
          else{
            var secondLevelConditionTrue = false;
            for(var j = 0; j < rootCondition.conditions.length; j++)
            {              
              if(rootCondition.type == "AND")
              {
                if(!this.checkCondition(rootCondition.conditions[j]))
                  {
                  isRuleNodeTrue = false;
                  break;
                  } 
                else
                  isRuleNodeTrue = true;
              }
              else
              {
                if(this.checkCondition(rootCondition.conditions[j]))
                {
                  isRuleNodeTrue = true;
                  break;
                }
              }
            }
          };           
          if(isRuleNodeTrue)
            returnValue = rootCondition.returnValue;       
	     };     
	    //TODO:convert returning value to object?
	    if(checkedRule.returnType.toLowerCase() == "number")
	     returnValue = (returnValue != null) ? parseInt(returnValue) : 0;
	    else if(checkedRule.returnType.toLowerCase() == "boolean")
	     returnValue =(returnValue != "1") ? false : true;
	    else if(checkedRule.returnType.toLowerCase() == "string")
       returnValue =(typeof returnValue == "undefined") ? "" : returnValue;       
	    else if(checkedRule.returnType.toLowerCase() == "object"){
	      if(typeof returnValue == "undefined")
	       returnValue = null;
	       /*
	      else{
	          var convertedObject = null;
	          var objects = returnValue.split("&");
	          if(objects.length > 0)convertedObject = {};
            for (var i=0;i<objects.length;i++){
                var objectName = objects[i].split("=")[0];
                var objectValue = objects[i].split("=")[1];
                convertedObject[objectName] = objectValue; 
              }
            returnValue = convertedObject;
	         }
	         */
	    }
	  }
	  catch(error)
      {
          E.triggerError(TS.Modules.CustomRulesModel, error, "error during getting customRules value at:" + ruleName);
      }

      returnValue = this.replaceModelValues(returnValue);

      return returnValue;
	},
	checkCondition: function(condition){

	  var isConditionTrue = false;
      
      for(var i = 0;i < condition.conditions.length; i++){
        
        var checkedConditionNode = condition.conditions[i];
      
        var conditionCompareTo;

        if(this.getPropertyValue(checkedConditionNode.conditionProperty) != null)
        {
          conditionCompareTo = this.getPropertyValue(checkedConditionNode.conditionProperty);
        }
        else
        {
          var message = "get Custom Rule - there s no such property: " +
          checkedConditionNode.conditionProperty + 
          ', rule:' + 
          this.checkedRule.name +
          ', with this conditionValue:' +
          checkedConditionNode.conditionValue;
          console.log(message);
        }

          // straight condition
        if(!checkedConditionNode.isNotCondition)
        {
          if(this.isEquals(checkedConditionNode.conditionValue, conditionCompareTo))
            isConditionTrue = true;
          else
            isConditionTrue = false;
        }
          // negotiate condition
        else
        {
          if(!this.isEquals(checkedConditionNode.conditionValue, conditionCompareTo))
            isConditionTrue = true
          else
            isConditionTrue = false;
        }
        
        
        // 'AND' relation among condition nodes
        if(condition.type == "AND"){
          //quit and return with false if at least 1 conditionNode is FALSE
          if(!isConditionTrue)
            break;
        }
          // 'OR' relation among condition nodes
        else{
          //quit and return with false if at least 1 conditionNode is TRUE
          if(isConditionTrue)
            break;
        }
        
      }
      return isConditionTrue;
	},
	isEquals:function(conditionValue,conditionCompareTo){
	  
	 if(conditionValue == "1") conditionValue = true;
	 else if(conditionValue == "0") conditionValue = false; 
	     
	  return conditionValue.toString().toLowerCase() == conditionCompareTo.toString().toLowerCase();
	},
	getPropertyValue:function(propertyName){
      var propertyValue = null;
      propertyName = propertyName.toLowerCase();
      if(propertyName == "configmodel.partnerId".toLowerCase())
       propertyValue = TS.Modules.ConfigModel.partner;
      else if(propertyName == "configmodel.locale".toLowerCase())
        propertyValue = TS.Modules.ConfigModel.language;
      else if(propertyName == "configmodel.country".toLowerCase())
        propertyValue = TS.Modules.ConfigModel.country;
      else if(propertyName == "channelmodel.selectedID".toLowerCase())
        propertyValue = this.normalizeChannelID(TS.Modules.ChannellistModel.id);
      else if(propertyName == "configmodel.autoPlayOriginal".toLowerCase())
        propertyValue = TS.Modules.ConfigModel.autoPlay;
      else if(propertyName == "configmodel.playerType".toLowerCase())
        propertyValue = TS.Modules.ConfigModel.playerType;
      else if(propertyName == "configmodel.playerId".toLowerCase())
        propertyValue = TS.Modules.ConfigModel.playerId;
      else if(propertyName == "channelmodel.channelType".toLowerCase())
        propertyValue = TS.Modules.CustomRulesModel.getRule("getChannelType");
      else if(propertyName == "videomodel.videoTitle".toLowerCase())
        propertyValue = TS.Modules.PlaylistModel.title;
      else if(propertyName == "videomodel.videoDescription".toLowerCase())
        propertyValue = TS.Modules.PlaylistModel.description;
      else if(propertyName == "configmodel.windowLocation".toLowerCase())
        propertyValue = TS.Modules.ConfigModel.windowLocation;
      else if(propertyName == "configmodel.isDesktop".toLowerCase())
        propertyValue = TS.Modules.ConfigModel.isDesktop;
      else if (propertyName.toLowerCase().indexOf("param") > -1 && this.externalParams)
      {
          if(this.externalParams instanceof Array)
          {
              var index = Number(propertyName.toLowerCase().replace("param", ""));

              if(index < this.externalParams.length)
              {
                  propertyValue =  this.externalParams[index];
              }
          }
          else if(propertyName.toLowerCase() == "param0")
          {
              propertyValue =  this.externalParams;
          }
      }

      return propertyValue;
	},

	normalizeChannelID: function(p_id)
    {
        var regexp = new RegExp("-", "g");

        p_id = p_id.toLowerCase();
        p_id = p_id.replace(regexp, "");

        p_id = p_id.toLowerCase();
        return p_id;
    },

    replaceString : function(p_text, propertyName)
    {
        var ret              = p_text;
        var propertyValue    = this.getPropertyValue(propertyName);

        if(p_text && typeof p_text === 'string')
        {
            var regexp = new RegExp(propertyName, "g");

            ret = p_text.replace(regexp, propertyValue);
        }

        return ret;
    },

    replaceModelValues : function(p_text)
    {
       var ret = p_text;

       if(p_text && typeof p_text === 'string')
       {
           p_text =   this.replaceString(p_text, "videomodel.videoTitle");
           p_text =   this.replaceString(p_text, "videomodel.videoDescription");
           p_text =   this.replaceString(p_text, "configmodel.windowLocation");

           ret = p_text;
       }

       return ret;
    },

    getPlayedOrSelectedChannelID : function ()
    {
        var channelID = TS.Modules.ChannellistModel.id;

        return channelID;
    },

    getFacebookAppURL : function (videoID, videoTitle)
    {
        var channelID	 = this.getPlayedOrSelectedChannelID();
        var ret			 = "https://apps.facebook.com/livesporttvapp/e-player/channel/"+channelID+"/video/"+videoID+"/title/"+videoTitle+"/";

        if(channelID && TS.Modules.CustomRulesModel.getRule("isFacebookEnabled") && TS.Modules.CustomRulesModel.getRule("facebookAppURL"))
        {
            ret = TS.Modules.CustomRulesModel.getRule("facebookAppURL");
        }

        return ret;
    }


}
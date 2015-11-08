TS.Modules.customRulesService = {
  moduleName: 'customRules',
  // CONFIG
  config: {},
  autoInit: true,
  firstRun: true,
  xmlData : null,
  
  init: function()
  {
    E.bindEvent(E.EVENT_AD_ENDED						, this.moduleName, this.onRefresh	, this, true);
    E.bindEvent(E.EVENT_AD_REQUEST						, this.moduleName, this.onRefresh	, this, true);
    E.bindEvent(E.EVENT_START_VIDEO					    , this.moduleName, this.onRefresh	, this, true);
    E.bindEvent(E.EVENT_PLAYLIST_LOADED					, this.moduleName, this.onRefresh	, this, true);
    E.bindEvent(E.EVENT_PLAYLIST_SELECTED_ITEM_CHANGED	, this.moduleName, this.onRefresh	, this, true);
    E.bindEvent(E.EVENT_STRUCTURE_LOADED				, this.moduleName, this.onRefresh	, this, true);
    E.bindEvent(E.EVENT_PLAYLIST_CHANGED				, this.moduleName, this.onRefresh	, this, true);
    E.bindEvent(E.EVENT_SET_VIDEOSRC					, this.moduleName, this.onRefresh	, this, true);
  },
  
  onRefresh : function()
  {
  	this.load();
  },
  rulesMap:{aa:"fff"},
  
  // Pull xml file and parse results into CustomRulesModel.
  // If called second time, it will update CustomRulesModel without
    // pulling the XML again, synchronously.
  load: function(cb)
  {
      var customRulesPath = TS.Modules.initialize.config.flashVars.customRulesPath;

      customRulesPath = customRulesPath.replace("http://static.eplayer.performgroup.com/", "");

      if(TS.Modules.customRulesService.xmlData != null)
      {
          E.trigger(E.EVENT_CUSTOM_RULES_LOAD_FROM_CACHE, TS.Modules.customRulesService);
          TS.Modules.customRulesService.onSuccess(TS.Modules.customRulesService.xmlData, cb);
      }
      else
      {
          $.ajax(customRulesPath,
              {
                  dataType	: 'xml',
                  success		: function(data)
                  {
                      TS.Modules.customRulesService.xmlData = data;
                      TS.Modules.customRulesService.onSuccess(data, cb);
                  },
                  error : function(error)
                  {
                      E.triggerError(TS.Modules.customRulesService, "Error on loading customRules");
                  }
              });
      }
  },

  onSuccess: function (data, cb)
  {
      TS.Modules.customRulesService.readRules(data);
      TS.Modules.ConfigModel.isFullSizeAvailable = TS.Modules.CustomRulesModel.getRule("isResizeToWindowEnabled");
      E.trigger(E.EVENT_CUSTOM_RULES_LOADED, TS.Modules.customRulesService, data);

      if (cb) cb();
  },

    readRules : function(document)
    {
        var $document = $(document);

        var rulesMap = {};

        $document.find('rule').each(function(i, rule) {
            var ruleElem = {};
            var $rule = $(rule);

            ruleElem.name = $rule.attr('name').toLowerCase();
            ruleElem.returnType = $rule.attr('returnType');
            ruleElem.defaultReturn = (typeof $rule.attr('defaultReturn') == "undefined") ? null : $rule.attr('defaultReturn'); // can be undefined!!

            ruleElem.conditions = [];
            $rule.children('condition').each(function(j,conditionL1){
                var $conditionL1 = $(conditionL1);
                var conditionElemL1 = {};
                conditionElemL1.returnValue = $conditionL1.attr('returnValue');
                conditionElemL1.type = ($conditionL1.attr('type') == 'AND') ? "AND" : "OR";
                conditionElemL1.conditions = [];

                // one level Exists
                $conditionL1.children('value').each(function(k,conditionL2){
                    var $conditionL2 = $(conditionL2);
                    var conditionElemL2 = {};
                    conditionElemL2.conditionProperty = $conditionL2.attr('property');
                    conditionElemL2.conditionValue = $conditionL2.attr('value');
                    conditionElemL2.isNotCondition = ($conditionL2.attr('isNot')=="1") ? true : false;
                    conditionElemL1.conditions[k] = conditionElemL2;
                });

                // two level Exist
                conditionElemL1.hasSubConditions = ($conditionL1.children('condition').length > 0) ? true : false;
                $conditionL1.children('condition').each(function(k,conditionL2){
                    var $conditionL2 = $(conditionL2);
                    var conditionElemL2 = {};
                    conditionElemL2.type = ($conditionL2.attr('type') == 'AND') ? "AND" : "OR";
                    conditionElemL2.conditions = [];

                    $conditionL2.find('value').each(function(m,conditionL3){
                        $conditionL3 = $(conditionL3);
                        var conditionElemL3 = {};
                        conditionElemL3.conditionProperty = $conditionL3.attr('property');
                        conditionElemL3.conditionValue = $conditionL3.attr('value');
                        conditionElemL3.isNotCondition = ($conditionL3.attr('isNot')=="1") ? true : false;
                        conditionElemL2.conditions[m] = conditionElemL3;
                    });
                    conditionElemL1.conditions[k] = conditionElemL2;
                });

                ruleElem.conditions[j] = conditionElemL1;
            });

            rulesMap[ruleElem.name] = ruleElem;
        });

        TS.Modules.CustomRulesModel.rulesMap = rulesMap;
    }

};

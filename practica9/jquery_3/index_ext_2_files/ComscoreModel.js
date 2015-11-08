TS.Modules.ComscoreModel = 
{
  moduleName			  	: 'ComscoreModel',
  config				  	: {},
  autoInit				  	: false,
  baseUrl       			: PATH_COMSCORE,
  siteId       				: "6035584",
  contentOwnerId    		: "6035584",
  contentType    			: "000000",
  beaconType      			: 1,
  campaignReporting 		: "*null",
  c4          				: "9266697",
  secretString		        : "bce6743cfd74071da023aa90cbcfdfc3",
    
  getBeacon : function ()
  {
  	var beacon = this.getPerformBeacon();

    // adding/overwriting extra bacons if there is in customRule

    if(TS.Modules.CustomRulesModel.getRule("extraComscoreBeacon")){

      var extraBacons = TS.Modules.CustomRulesModel.getRule("extraComscoreBeacon").split("&");
      for (var i=0;i<extraBacons.length;i++){
        var objectName = extraBacons[i].split("=")[0];
        var objectValue = extraBacons[i].split("=")[1];
        beacon[objectName] = transformBaconValue(objectValue);
      }
    }

    //converting the flash model values to html5 model values
    function transformBaconValue(objectValue){
       var returnValue = objectValue;
       if(objectValue == "videomodel.videoTitle")
        {
          returnValue = TS.Modules.PlaylistModel.title;
        }
       else if (objectValue == "configmodel.windowLocation")
      {
         referrer = referrer.replace( 'http://', '' );
         referrer = referrer.replace( /[^a-zA-Z0-9]/g, '_');
         returnValue = referrer;
      }
     else if (objectValue == "videomodel.videoDescription")
      {
        returnValue = TS.Modules.PlaylistModel.description;
      }
     else if (objectValue == "configmodel.country")
      {
        returnValue = TS.Modules.ConfigModel.country.toLowerCase();
      }
       return returnValue;
     }

    return beacon;
  },

  getPerformBeacon : function ()
  {
      var beacon = new Object();

      beacon.c1 = this.beaconType;
      beacon.c2 = this.siteId;
      beacon.c3 = this.contentOwnerId;
      beacon.c4 = this.c4;
      beacon.c5 = this.contentType;
      beacon.c6 = this.campaignReporting;
      beacon.c7 = "*null";
      beacon.c8 = "*null";
      beacon.c9 = "*null";

      return beacon;
  }
}

TS.Modules.countryChecker  = 
{
  	moduleName: 'countryChecker',
  	config: {},
  	autoInit: false, 
  	ITALY		: "it",
  	NEW_ZEALAND	: "nz",
  	SPAIN		: "es",
  	FRANCE		: "fr",
  	UK			: "uk",
  	USA			: "us",
	AUSTRALIA	: "au",
	KOREA		: "kr",
	JAPAN		: "jp",
	GREECE		: "gr",
	ARAB		: "ar",
	TURKEY		: "tr",
	GERMANY		: "de",
	FINLAND		: "fi",
	SWEDEN		: "se",
	POLAND		: "pl",
	PORTUGAL	: "pt",
	SLOVEKIA	: "sk",
	HUNGARY		: "hu",
	MALAYSIA	: "my",
	INDIA		: "in",
	ROMANIA		: "ro",
	AUSTRIA		: "at",
  
	isUS : function()
	{
		return TS.Modules.ConfigModel.country.toLowerCase() == this.USA;
	},
	
	isUK : function()
	{
		return TS.Modules.ConfigModel.country.toLowerCase() == this.UK;
	},
	
	isFrench : function()
	{
	return TS.Modules.ConfigModel.country.toLowerCase() == this.FRENCH;
	},
	
	isJapan : function()
	{
	return TS.Modules.ConfigModel.country.toLowerCase() == this.JAPAN;
	},
	
	isAustralian : function()
	{
	return TS.Modules.ConfigModel.country.toLowerCase() == this.AUSTRALIA;
	},
	
	isArabic : function()
	{
	return TS.Modules.ConfigModel.language.toLowerCase().indexOf("ar") > -1;
	},
	
	getAllCountries : function()
	{
		var countries = [];
		
		countries.push(this.ITALY);
	  	countries.push(this.NEW_ZEALAND);
	  	countries.push(this.SPAIN);
	  	countries.push(this.FRANCE);
	  	countries.push(this.UK);
	  	countries.push(this.USA);
		countries.push(this.AUSTRALIA);
		countries.push(this.KOREA);
		countries.push(this.JAPAN);
		countries.push(this.GREECE);
		countries.push(this.ARAB	);
		countries.push(this.TURKEY);
		countries.push(this.GERMANY);
		countries.push(this.FINLAND);
		countries.push(this.SWEDEN);
		countries.push(this.POLAND);
		countries.push(this.PORTUGAL);
		countries.push(this.SLOVEKIA);
		countries.push(this.HUNGARY);
		countries.push(this.MALAYSIA	);
		countries.push(this.INDIA);
		countries.push(this.ROMANIA);
		countries.push(this.AUSTRIA);
		
		return countries;
	}
} 





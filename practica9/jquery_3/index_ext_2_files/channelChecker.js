TS.Modules.channelChecker  = 
{
  moduleName: 'channelChecker',
  config: {},
  autoInit: false,
  
  
  normalizeChannelID: function(p_id)
  {
    var regexp = new RegExp("-", "g");
    
    p_id = p_id.toLowerCase();
    p_id = p_id.replace(regexp, "");
    
    return p_id;
  },

  isNBA: function(p_id)
  {
    var ret = false;
    
    p_id = TS.Modules.channelChecker.normalizeChannelID(p_id);
    
    ret = ret ||  (p_id == "3d87ed3d757b4684b5d3a6c2047f9e4a".toLowerCase());
    ret = ret ||  (p_id == "0c2b6408837a4e7091be685411b7b9be".toLowerCase());
    ret = ret ||  (p_id == "a3c2572eccce4b7f8e5d61c8a0a809f3".toLowerCase());
    ret = ret ||  (p_id == "7bf8d4b16d6a4a799079398d4febba5d".toLowerCase());
    ret = ret ||  (p_id == "77892639e19d48bcbdafc7bf28b70cb4".toLowerCase());
    ret = ret ||  (p_id == "6b99de989f8d4fa780b46b8bc648a23a".toLowerCase());
    ret = ret ||  (p_id == "1d8f88280c91483c854f51399014cdb6".toLowerCase());
    ret = ret ||  (p_id == "cdd497edfc484940920706d117aef047".toLowerCase());
    ret = ret ||  (p_id == "94c778eaaeef1ae1e04400212836b646".toLowerCase());
    ret = ret ||  (p_id == "3d87ed3d757b4684b5d3a6c2047f9e4a".toLowerCase());
    ret = ret ||  (p_id == "d1805cf0551642eb9dbe20189ee0355c".toLowerCase());
    ret = ret ||  (p_id == "f81bab1806994d779103fefdac638de9".toLowerCase());
    ret = ret ||  (p_id == "563fcf0d1ff64825a5d87810877719a3".toLowerCase());
    ret = ret ||  (p_id == "B77272C671834ADDB42520B8C871B975".toLowerCase());
    
    return ret;
  },

  isMLB: function(p_id)
  {
    var ret = false;
    
    p_id = TS.Modules.channelChecker.normalizeChannelID(p_id);
    
    ret = ret ||  (p_id == "06c7c34813be4bf5b1f08f1e92cfcb4c".toLowerCase());
    
    return ret;
  },

  isCollegeSports: function(p_id)
  {
    var ret = false;
    
    p_id = TS.Modules.channelChecker.normalizeChannelID(p_id);
    
    ret = ret ||  (p_id == "436513A0723746DA95C05E22386B026".toLowerCase());
    ret = ret ||  (p_id == "847232B6B26E4794801E52E209FA2F41".toLowerCase());
    ret = ret ||  (p_id == "7zhaq6f436a61d883mza6rtn1".toLowerCase());
    ret = ret ||  (p_id == "43135C8AFECD4495945C5901994D3C7D".toLowerCase());
    ret = ret ||  (p_id == "C2815A3DA3014FE000B6EDEDB0052DC".toLowerCase());
    ret = ret ||  (p_id == "03C2AFC1BDFC492C8460AFA2A48BF6F2".toLowerCase());
    ret = ret ||  (p_id == "2B6CDF25AD604BEB8BDE001CF0C566EE".toLowerCase());
    ret = ret ||  (p_id == "E0C95814752E424F871D9928AA49E5E4".toLowerCase());
    
    
    return ret;
  },

  isNHL: function(p_id)
  {
    var ret = false;
    
    p_id = TS.Modules.channelChecker.normalizeChannelID(p_id);
    
    ret = ret ||  (p_id == "a9f29beab27549ea8af6910a0673be8c".toLowerCase());
    ret = ret ||  (p_id == "3af134d7689b4b7c9e4f2e99f33c55c7".toLowerCase());
    ret = ret ||  (p_id == "94c778eaaef41ae1e04400212836b646".toLowerCase());
    ret = ret ||  (p_id == "eeb65784d524479ea5f2aaf6822a7019".toLowerCase());
    ret = ret ||  (p_id == "8b31aa76cb3046d8af962cde0c10cd6c".toLowerCase());
    ret = ret ||  (p_id == "891cec8dca9044e3bc366526539c43bc".toLowerCase());
    ret = ret ||  (p_id == "a44ded97afac480ab2abc593524ff068".toLowerCase());
    
    return ret;
  },

  isCelebTV: function(p_id)
  {
    var ret = false;
    
    p_id = TS.Modules.channelChecker.normalizeChannelID(p_id);
    
    ret = ret ||  (p_id == "2D5CEC7F123744819B6DE4CE726F6B51".toLowerCase());
    ret = ret ||  (p_id == "C7FDC4A93CA6463597005F368CD071AF".toLowerCase());
    
    return ret;
  },
  
isATP: function(p_id)
{
	var ret = false;
	
	var regexp = new RegExp("-", "g");
	
	p_id = p_id.toLowerCase();
	p_id = p_id.replace(regexp, "");
	
	ret = ret || (p_id == "6a93a7eec86443318ffce07f279a0974");
	ret = ret || (p_id == "aefe73d41f584674b02c88f58b10c7ed");
	ret = ret || (p_id == "4d045fd07a9a467595973e5cf8ae5602");
	ret = ret || (p_id == "94c778eaaee81ae1e04400212836b646");
	ret = ret || (p_id == "06882d4d91b244989c273e88d01e3088");
	ret = ret || (p_id == "1ff520fbab4c438fb668b5d51a086f84");
	ret = ret || (p_id == "6a8ab36d3ed74c8c86b600e7b3e0aea8");
	ret = ret || (p_id == "8434b14c2eab46dba710e61f541502ab");
	
	return ret;
},

getATPChannels: function()
{
	var channels	 = [];
	
	channels.push("6a93a7eec86443318ffce07f279a0974");
	channels.push("aefe73d41f584674b02c88f58b10c7ed");
	channels.push("4d045fd07a9a467595973e5cf8ae5602");
	channels.push("94c778eaaee81ae1e04400212836b646");
	channels.push("06882d4d91b244989c273e88d01e3088");
	channels.push("1ff520fbab4c438fb668b5d51a086f84");
	channels.push("6a8ab36d3ed74c8c86b600e7b3e0aea8");
	channels.push("8434b14c2eab46dba710e61f541502ab");
	
	return channels;
},

getWTAChannels : function()
{
	var channels	 = [];
	
	channels.push("a65c5b6fd25d4f5b833206466c9d13d5");
	channels.push("5227a843144f4739a13eee46eb910bc7");
	channels.push("896e10ca39924732b4e7a4b90d19458a");
	channels.push("94c778eaaee91ae1e04400212836b646");
	channels.push("122935097df04cbb8dc89d6f40ecd9f7");
	channels.push("f51fff754e8e414aae45e91b3bcfd2b8");
	channels.push("3168a87cb47340baa3996e8a8e532755");
	channels.push("f0bae11cf284416e925a9c4fa6f426f5");
	
	return channels;
},

isWTA : function(p_id)
{
	var ret = false;
	
	var regexp = new RegExp("-", "g");
	
	p_id = p_id.toLowerCase();
	p_id = p_id.replace(regexp, "");
	
	ret = ret || (p_id == "a65c5b6fd25d4f5b833206466c9d13d5");
	ret = ret || (p_id == "5227a843144f4739a13eee46eb910bc7");
	ret = ret || (p_id == "896e10ca39924732b4e7a4b90d19458a");
	ret = ret || (p_id == "94c778eaaee91ae1e04400212836b646");
	ret = ret || (p_id == "122935097df04cbb8dc89d6f40ecd9f7");
	ret = ret || (p_id == "f51fff754e8e414aae45e91b3bcfd2b8");
	ret = ret || (p_id == "3168a87cb47340baa3996e8a8e532755");
	ret = ret || (p_id == "f0bae11cf284416e925a9c4fa6f426f5");
	
	return ret;
},

isNBA : function(p_id)
{
	var ret = false;
	
	var regexp = new RegExp("-", "g");
	
	p_id = p_id.toLowerCase();
	p_id = p_id.replace(regexp, "");
	
	ret = ret || (p_id == "3d87ed3d757b4684b5d3a6c2047f9e4a".toLowerCase());
	ret = ret || (p_id == "0c2b6408837a4e7091be685411b7b9be".toLowerCase());
	ret = ret || (p_id == "a3c2572eccce4b7f8e5d61c8a0a809f3".toLowerCase());
	ret = ret || (p_id == "7bf8d4b16d6a4a799079398d4febba5d".toLowerCase());
	ret = ret || (p_id == "77892639e19d48bcbdafc7bf28b70cb4".toLowerCase());
	ret = ret || (p_id == "6b99de989f8d4fa780b46b8bc648a23a".toLowerCase());
	ret = ret || (p_id == "1d8f88280c91483c854f51399014cdb6".toLowerCase());
	ret = ret || (p_id == "cdd497edfc484940920706d117aef047".toLowerCase());
	ret = ret || (p_id == "94c778eaaeef1ae1e04400212836b646".toLowerCase());
	ret = ret || (p_id == "3d87ed3d757b4684b5d3a6c2047f9e4a".toLowerCase());
	ret = ret || (p_id == "d1805cf0551642eb9dbe20189ee0355c".toLowerCase());
	ret = ret || (p_id == "f81bab1806994d779103fefdac638de9".toLowerCase());
	ret = ret || (p_id == "563fcf0d1ff64825a5d87810877719a3".toLowerCase());
	ret = ret || (p_id == "B77272C671834ADDB42520B8C871B975".toLowerCase());
	
	return ret;
},

getNBAChannels : function()
{
	var channels	 = [];
	
	channels.push("3d87ed3d757b4684b5d3a6c2047f9e4a".toLowerCase());
	channels.push("0c2b6408837a4e7091be685411b7b9be".toLowerCase());
	channels.push("a3c2572eccce4b7f8e5d61c8a0a809f3".toLowerCase());
	channels.push("7bf8d4b16d6a4a799079398d4febba5d".toLowerCase());
	channels.push("77892639e19d48bcbdafc7bf28b70cb4".toLowerCase());
	channels.push("6b99de989f8d4fa780b46b8bc648a23a".toLowerCase());
	channels.push("1d8f88280c91483c854f51399014cdb6".toLowerCase());
	channels.push("cdd497edfc484940920706d117aef047".toLowerCase());
	channels.push("94c778eaaeef1ae1e04400212836b646".toLowerCase());
	channels.push("3d87ed3d757b4684b5d3a6c2047f9e4a".toLowerCase());
	channels.push("d1805cf0551642eb9dbe20189ee0355c".toLowerCase());
	channels.push("f81bab1806994d779103fefdac638de9".toLowerCase());
	channels.push("563fcf0d1ff64825a5d87810877719a3".toLowerCase());
	channels.push("B77272C671834ADDB42520B8C871B975".toLowerCase());
	
	return channels;
},

isNHL : function(p_id)
{
	var ret = false;
	
	var regexp = new RegExp("-", "g");
	
	p_id = p_id.toLowerCase();
	p_id = p_id.replace(regexp, "");
	
	ret = ret || (p_id == "a9f29beab27549ea8af6910a0673be8c".toLowerCase());
	ret = ret || (p_id == "3af134d7689b4b7c9e4f2e99f33c55c7".toLowerCase());
	ret = ret || (p_id == "94c778eaaef41ae1e04400212836b646".toLowerCase());
	ret = ret || (p_id == "eeb65784d524479ea5f2aaf6822a7019".toLowerCase());
	ret = ret || (p_id == "8b31aa76cb3046d8af962cde0c10cd6c".toLowerCase());
	ret = ret || (p_id == "891cec8dca9044e3bc366526539c43bc".toLowerCase());
	ret = ret || (p_id == "a44ded97afac480ab2abc593524ff068".toLowerCase());
	
	return ret;
},

getNHLChannels : function()
{
	var channels	 = [];
	
	channels.push("a9f29beab27549ea8af6910a0673be8c".toLowerCase());
	channels.push("3af134d7689b4b7c9e4f2e99f33c55c7".toLowerCase());
	channels.push("94c778eaaef41ae1e04400212836b646".toLowerCase());
	channels.push("eeb65784d524479ea5f2aaf6822a7019".toLowerCase());
	channels.push("8b31aa76cb3046d8af962cde0c10cd6c".toLowerCase());
	channels.push("891cec8dca9044e3bc366526539c43bc".toLowerCase());
	channels.push("a44ded97afac480ab2abc593524ff068".toLowerCase());
	
	return channels;
},

isMLB : function(p_id)
{
	var ret = false;
	
	var regexp = new RegExp("-", "g");
	
	p_id = p_id.toLowerCase();
	p_id = p_id.replace(regexp, "");
	
	ret = ret || (p_id == "06c7c34813be4bf5b1f08f1e92cfcb4c".toLowerCase());
	
	return ret;
},

getMLBChannels : function()
{
	var channels	 = [];
	
	channels.push("06c7c34813be4bf5b1f08f1e92cfcb4c".toLowerCase());
	
	return channels;
},

isCollegeSports : function(p_id)
{
	var ret = false;
	
	var regexp = new RegExp("-", "g");
	
	p_id = p_id.toLowerCase();
	p_id = p_id.replace(regexp, "");
	
	ret = ret || (p_id == "436513A0723746DA95C05E22386B026".toLowerCase());
	ret = ret || (p_id == "847232B6B26E4794801E52E209FA2F41".toLowerCase());
	ret = ret || (p_id == "7zhaq6f436a61d883mza6rtn1".toLowerCase());
	ret = ret || (p_id == "43135C8AFECD4495945C5901994D3C7D".toLowerCase());
	ret = ret || (p_id == "C2815A3DA3014FE000B6EDEDB0052DC".toLowerCase());
	ret = ret || (p_id == "03C2AFC1BDFC492C8460AFA2A48BF6F2".toLowerCase());
	ret = ret || (p_id == "2B6CDF25AD604BEB8BDE001CF0C566EE".toLowerCase());
	ret = ret || (p_id == "E0C95814752E424F871D9928AA49E5E4".toLowerCase());
	
	return ret;
},

getCollegeSportsChannels : function()
{
	var channels	 = [];
	
	channels.push("436513A0723746DA95C05E22386B026".toLowerCase());
	channels.push("847232B6B26E4794801E52E209FA2F41".toLowerCase());
	channels.push("7zhaq6f436a61d883mza6rtn1".toLowerCase());
	channels.push("43135C8AFECD4495945C5901994D3C7D".toLowerCase());
	channels.push("C2815A3DA3014FE000B6EDEDB0052DC".toLowerCase());
	channels.push("03C2AFC1BDFC492C8460AFA2A48BF6F2".toLowerCase());
	channels.push("2B6CDF25AD604BEB8BDE001CF0C566EE".toLowerCase());
	channels.push("E0C95814752E424F871D9928AA49E5E4".toLowerCase());
	
	return channels;
},

isCelebTV : function(p_id)
{
	var ret = false;
	
	var regexp = new RegExp("-", "g");
	
	p_id = p_id.toLowerCase();
	p_id = p_id.replace(regexp, "");
	
	ret = ret || (p_id == "2D5CEC7F123744819B6DE4CE726F6B51".toLowerCase());
	ret = ret || (p_id == "C7FDC4A93CA6463597005F368CD071AF".toLowerCase());
	
	return ret;
},

getCelebTvChannels : function()
{
	var channels	 = [];
	
	channels.push("2D5CEC7F123744819B6DE4CE726F6B51".toLowerCase());
	channels.push("C7FDC4A93CA6463597005F368CD071AF".toLowerCase());
	
	return channels;
}

  
  
  
};











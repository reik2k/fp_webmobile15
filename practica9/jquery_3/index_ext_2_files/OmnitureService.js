TS.Modules.OmnitureService = 
{
	moduleName : "OmnitureService",
	normal_omniture:null,
	nfl_omniture:null,
	nflActive:false,
	nfl_channels:[
		
			"x5lxdubsbx9s1i99ddyvqp65c",
			"xw4wbrq336z7zdj2u529et8m",
			"s7k0tqctfcop14o8tql6ud6ve",
			"C6D065C213A84966E0440021281A8A86",
			"C6D0AA77FA36673AE0440021281A8A86",
			"dd71a171-3f63-4bbf-b5c2-70147d5721ab",
			"CC2D63C869B326E9E0440021281A8A86",
			"1tezvadrcqtmp1wwsyv7ewctye",
			"107rpp4kx1qid1svcfj97ut099",
			"CC2D63C8699A26E9E0440021281A8A86",
			"1n5zev8c0kr1b1umb3f5sni9n2",
			"1wa37ip2b711r1aqx72lkwc79d",
			"fxkf7o0poc6i1ctvgbma9s9ps",
			"CC2D63C8699D26E9E0440021281A8A86",
			"1fuxm402fand91f4o9pv8xzj6y",
			"CDFC1E35167C09CBE0440021281A8A86",
			"vnw8p2hfibqv1llz4ngclq2i2",
			"CC2D63C869A026E9E0440021281A8A86",
			"pp1l7ru7mtv41tv5kvzfxltjp",
			"6hqt5dtwiya61x3bzn3oj4pj7",
			"1uydf35yho4ev1rnzcx3ok5q5u",
			"oz4ypmlib16o1jgbgg5eqdqwm",
			"1uxjpx4ssyouw13f6b2j07oqo5",
			"kvr5u0mrl9a014wih4s8nezen",
			"ci9h29aa7pzb1uwyr29gco389",
			"1fl7yh19my7n51gwu8m930hjvu",
			"CC2D63C869B026E9E0440021281A8A86",
			"CC2D63C869A326E9E0440021281A8A86",
			"1psuvwkgwl6yv18h602960ix7c",
			"10kh13q7h07t41ccdr7o36v8ns",
			"1e6xw1baa1hlf1e1uqbgppnyhw",
			"1q647hij5nx4m1b09v0790ql88",
			"1t6z46el3wafh1p3j7mm7friyt",
			"4ko5g2w8jr6014u0mp0itpoul",
			"7t81pu6e3h9f1c7rxmep4grw9",
			"10tffqd7n687u1967j4upwsjra",
			"19w0ejxkshj0t12chqdyff22gu",
			"CC2D63C869B626E9E0440021281A8A86",
			"1nmsz16vmvhvn13z3g1ode8ka9",
			"CC2D63C869B926E9E0440021281A8A86",
			"qujhtdutjt317o5rj9i1qc4q",
			"CC2D63C869A626E9E0440021281A8A86",
			"8zs3c0zw783v1jfavnt4cwq2l",
			"pbssvr2pefh41hccc904o0ki5",
			"tocn9swsbihzzyycu4se3xzp",
			"pjwss4gkv7oy1i101erd5noei",
			"CDFC1E35167309CBE0440021281A8A86",
			"121gov8xa991j13qn7tje5m8ed",
			"CDFC1E35167909CBE0440021281A8A86",
			"16zp8r5rz7hik1meqemu4fnosv",
			"CC2D63C869A926E9E0440021281A8A86",
			"1grk1yfg7xh61taw3ow12coc7",
			"emoqjp8fu21x1c6ax1nnopy5v",
			"1jcd3z9c9wf2a1whkkk1em6cb3",
			"CDFC1E35167F09CBE0440021281A8A86",
			"c4elph7yygz11xvi9iharcg39",
			"ks1z7k9jjn98106bspr5aavue",
			"1gjrx7w27w40418vtav5zucmyc",
			"CC2D63C869AD26E9E0440021281A8A86",
			"f873fjlbzp5i1nmqjwpsuuzgg",
			"kmdyqfok1wm41kuqzoi36hc4x",
			"1wcu2oi8tdr4o1g89f1l9bhs9a",
			"7uj8njxqtvpk1cv581mn4ekpt",
			"1uj606sw1jiwz1tmedeo15w8qq",
			"CC2D63C8699726E9E0440021281A8A86",
			"1gio72n8pyexn1fdic0xjo3f33",
			"13nywbpsdlgxr1wxraj5q68ody",
			"1j4efcte6vx421a97v776a8imn",
			"CC2D63C8699426E9E0440021281A8A86",
			"hgpjbvzzzdll1gyl7jjwb01sr"		
	],
		
	init: function()
	{
			
			//this.location = window.location.hostname;

			
			//normal_omniture = S_CODE();
			nfl_omniture = N_CODE();
			
			/*normal_omniture.initOmniture("ePlayerHTML5 " + TS.Modules.ConfigModel.partner);
			normal_omniture.initEplayer(
				TS.Modules.ConfigModel.language, 
                TS.Modules.ConfigModel.autoPlay == "true" ? true : false,
                TS.Modules.ChannellistModel.name, 
                TS.Modules.ConfigModel.partner, 
                TS.Modules.ConfigModel.width + "x" + TS.Modules.ConfigModel.height, 
                TS.Modules.ConfigModel.country, 
                false, 
                document.location.href, 
                TS.Modules.ConfigModel.playerType, 
                "ePlayerHTML5 " + TS.Modules.ConfigModel.partner,
                TS.Modules.ConfigModel.startMute == "true" ? true : false);*/
				
				
			nfl_omniture.initOmniture("ePlayerHTML5 " + TS.Modules.ConfigModel.partner);
			nfl_omniture.initEplayer(
				TS.Modules.ConfigModel.language, 
                TS.Modules.ConfigModel.autoPlay == "true" ? true : false,
                TS.Modules.ChannellistModel.name, 
                TS.Modules.ConfigModel.partner, 
                TS.Modules.ConfigModel.width + "x" + TS.Modules.ConfigModel.height, 
                TS.Modules.ConfigModel.country, 
                false, 
                document.location.href, 
                TS.Modules.ConfigModel.playerType, 
                "ePlayerHTML5 " + TS.Modules.ConfigModel.partner,
                TS.Modules.ConfigModel.startMute == "true" ? true : false);
                
                E.bindEvent(E.EVENT_USER_CLICKED_THUMBNAIL_ON_RELATED_VIDEO, this.moduleName, this.onRelatedVideoSelection, this);
                E.bindEvent(E.EVENT_FULLSIZE_ON , this.moduleName, this.onFullSizeOn);
                E.bindEvent(E.EVENT_FULLSIZE_OFF, this.moduleName, this.onFullSizeOff);
		
	},

    onFullSizeOn : function()
    {
        TS.Modules.OmnitureService.trackFullSizeChange();
    },

    onFullSizeOff : function()
    {
        TS.Modules.OmnitureService.trackFullSizeChange();
    },
	
	onRelatedVideoSelection: function(){
	
	TS.Modules.OmnitureService.setCustomData(TS.Modules.videoView.getCustomData());
	
	},
		
	open: function(title,duraction,partner){
		
		//normal_omniture.open(title,duraction,partner);
		
		this.nflActive = this.checkServiceState(TS.Modules.ChannellistModel.id);
				
		if(this.nflActive)
		{
			nfl_omniture.open(title,duraction,partner);
		}
				
	},
	
	play: function(title,time){
		
		//normal_omniture.play(title,time);
		
		if(this.nflActive)
		{
			nfl_omniture.play(title,time);
		}
	},
			
	stop: function(title,time)
	{
		//normal_omniture.stop(title,time);
		
		if(this.nflActive)
		{	
			nfl_omniture.stop(title,time);
		}
		//s.Media.stop(title,time);
	},
	
	close: function(title)
	{
		//normal_omniture.close(title);
		
		if(this.nflActive)
		{
			nfl_omniture.close(title);
		}
		
	},
	
	setVideoType: function(videotype_content){
		
		//normal_omniture.setVideoType(videotype_content);
		nfl_omniture.setVideoType(videotype_content);
		
	},
	
	setCustomData:function(p_data){
		
		//normal_omniture.setCustomData(p_data);
		nfl_omniture.setCustomData(p_data);
		
	},
	
	checkServiceState:function(id)
	{
		var enabled = false;
		var element = null;
		var channels = this.nfl_channels
		
		for(var i = 0;i < channels.length;i++)
		{
			element = channels[i];
			
			if(element == id)
			{
				//enabled = false;
				enabled = true;
				break;
			}
		}
			
		return enabled;
	} ,

    trackFullSizeChange : function()
    {
        //normal_omniture.trackFullSizeChange();
    }
}
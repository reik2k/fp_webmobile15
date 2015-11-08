TS.Modules.LiverailModel = 
{
  moduleName	: 'LiverailModel',
  config		: {},
  autoInit		: false,
  media			: null,
  
  setFromMedia : function(media)
  {
  	this.media 		= media;
  	this.media.url 	= TS.Modules.PlaylistModel.transformUrl(this.media.url);
  }
}
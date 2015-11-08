function VastCreative(xml)
{
  this.xml     = xml;
  this.duration   = "";
  this.medias    = new Array();//VastMedia
  this.autoInit   = false;
  this.moduleName   = "VastCreative";
  this.config     = {};
  
  this.init();
}

VastCreative.prototype.init = function()
{
  if(this.xml)
  {
    this.duration   = this.xml.duration;
    
    var mediaFiles = this.xml.mediafiles;
    
    for(var i = 0; i < mediaFiles.length; i++)
    {
      this.medias.push(new VastMedia(mediaFiles[i]));
    }
  }
}

VastCreative.prototype.isMP4MediaExist = function()
{
  return this.getMP4Medias().length > 0;
}

VastCreative.prototype.getMP4Medias = function()
{
  var mp4Medias = new Array();
  
  for(var i = 0; i < this.medias.length; i++)
  {
    var media = this.medias[i];
    
    if(media.isMP4Media())
    {
      mp4Medias.push(media);
    }
  }
  
  return mp4Medias;
}

VastCreative.prototype.getAllMedias = function()
{
  return this.medias;
}

VastCreative.prototype.isMediaExists = function()
{
  return this.getAllMedias().length > 0;
}

TS.Modules.VastCreative = new VastCreative();


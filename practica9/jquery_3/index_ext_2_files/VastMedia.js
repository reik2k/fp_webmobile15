function VastMedia(xml)
{
  this.xml     = xml;
  this.delivery   = "";
  this.bitrate  = "";
  this.width    = "";
  this.height    = "";
  this.type    = "";
  this.url    = "";
  this.autoInit   = false;
  this.moduleName = "VastMedia";
  this.config   = {};
 
  this.init();
}

VastMedia.prototype.init = function()
{
  if(this.xml)
  {
      this.delivery   = this.xml.delivery;
    this.bitrate   = this.xml.bitrate;
    this.width     = this.xml.width;
    this.height   = this.xml.height;
    this.type     = this.xml.type;
    this.url     = this.xml.url;
  }
}

VastMedia.prototype.isMP4Media = function()
{
  return this.type == "video/mp4";
}

TS.Modules.VastMedia = new VastMedia();


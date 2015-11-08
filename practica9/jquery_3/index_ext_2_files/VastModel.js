function VastModel(p_adManager)
{
  this.isGoodVersion  = false;
  this.adManager    = p_adManager;
  this.AdId       = "";
  this.parseResult  = null;
  this.creatives    = new Array();//VastCreative
  this.isValid    = false;
  this.postRoll    = false;
  this.autoInit   = false;
  this.moduleName = "VastModel";
  this.config   = {};
  
  this.init();
}

VastModel.prototype.init = function()
{
  if(this.adManager)
  {
    this.AdId = this.adManager.id;
  
    this.creatives.push(new VastCreative(this.adManager.linear));
    
    this.isValid = this.isMP4MediaExist();
  }
}

VastModel.prototype.isMP4MediaExist = function()
{
  var exists = false;
  
  for(var i = 0; i < this.creatives.length; i++)
  {
    var creative = this.creatives[i];
    
    if(creative.isMP4MediaExist())
    {
      exists = true;
      break;
    }
  }
  
  return exists;
}

VastModel.prototype.isMediaExists = function()
{
  var exists = false;
  
  for(var i = 0; i < this.creatives.length; i++)
  {
    var creative = this.creatives[i];
    
    if(creative.isMediaExists())
    {
      exists = true;
      break;
    }
  }
  
  return exists;
}

VastModel.prototype.getFirstValidCreative = function()
{
  var ret = null;
  
  for(var i = 0; i < this.creatives.length; i++)
  {
    var creative = this.creatives[i];
    
    if(creative.isMediaExists())
    {
      return creative;
    }
  }
  
  return ret;
}

TS.Modules.VastModel = new VastModel();

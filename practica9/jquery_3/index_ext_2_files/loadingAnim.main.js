TS.Modules.loadingAnim  = {
  moduleName: 'loadingAnim',
  // CONFIG
  config: {},
  autoInit: true,

  init: function( )
  {
    this.preload( 'show' );
  },

  showLoader: function()
  {
      $('#loadingAnim').show();
  },
  
  hideLoader: function()
  {
    $('#loadingAnim').hide();
  },
  
  preload: function( _state ) {
    if( _state == 'show' ) {
      $('#preload').show();
    }
    else if( _state == 'hide' ) {
      $('#preload').hide();
    }
  }
};

var tcsRequire = require.config({
  baseUrl: '/scripts/core',
  paths: {
      'jquery.hoverIntent': '/scripts/plugins/jquery.hoverIntent',
      'jquery.transit': '/scripts/plugins/jquery.transit.min',
      'jquery.validate': '/scripts/plugins/jquery.validate.min'
  }
});

// jQuery is a little weird with RequireJS, so we'll just
// use the already loaded version.
define('jquery', [], function() {
    return jQuery;
});
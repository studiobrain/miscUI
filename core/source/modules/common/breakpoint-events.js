define(function (require) {
  var $ = require('jquery'),
      utils = require('./utils');

  // Arrays to hold breakpoint-specific functions
  var breakpoint_callbacks = {
    'desktop': [],
    'tablet': [],
    'mobile': []
  };

  // Used for lazy-loading
  var init = false;

  /*
    Registers a window resize event listener that checks the current breakpoint
    and calls the appropriate function.
  */
  function setupWindowResizeEvent() {
    init = true;

    var breakpoint = utils.getCurrentBreakpoint();

    $(window).resize(function() {

      var new_breakpoint = utils.getCurrentBreakpoint();

      // If the breakpoint has changed, run breakpoint callbacks
      if(breakpoint !== new_breakpoint) {
        runBreakpointCallbacks(new_breakpoint);
        breakpoint = new_breakpoint;
      }
    });
  }

  /*
    References the correct callback collection for a given breakpoint
    and runs all of them.
  */
  function runBreakpointCallbacks(breakpoint) {
    // First ensure that this breakpoint exists
    if(breakpoint_callbacks.hasOwnProperty(breakpoint)) {

      var callbacks = breakpoint_callbacks[breakpoint];

      for(var i = 0, ii = callbacks.length; i < ii; i++) {
        callbacks[i]();
      }
    }
  }

  /*
    1. Lazy-loads the window resize event.
    2. Registers callbacks to be run during event.
    Arguments
      - breakpoint ('tablet' or 'desktop'): when the callback should be run
      - callback (function)
      - run (true or false, defaults to true): Determines if callback
        should be run immediately.
  */
  function on(breakpoint, callback, run) {
    // If this is the first time a listener is added, run setup
    if(!init) setupWindowResizeEvent();

    // run defaults to true
    if(typeof run === 'undefined') {
      run = true;
    }

    // Ensure this breakpoint exists
    if(breakpoint_callbacks.hasOwnProperty(breakpoint)) {
      breakpoint_callbacks[breakpoint].push(callback);

      // If callback should be run immediately and the
      // current breakpoint is the one passed in, then run
      if(run && breakpoint === utils.getCurrentBreakpoint()) {
        callback();
      }
    }
  }

  return {
    on: on
  };
});
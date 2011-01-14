(function() {
  var util;
  util = require('util');
  this.logException = function(exc) {
    return util.error([new Date().toUTCString(), "uncaught exception", exc.stack].join('\t'));
  };
}).call(this);

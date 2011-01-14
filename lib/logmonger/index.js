(function() {
  var config, util;
  util = require('util');
  config = require('jsonconfig');
  exports.main = function(mainModule, configFile) {
    if (configFile == null) {
      util.error("usage: " + process.argv[1] + " CONFIG");
      process.exit(1);
    }
    return config.load(configFile, function(err) {
      if (err != null) {
        throw err;
      }
      return require(mainModule).main();
    });
  };
}).call(this);

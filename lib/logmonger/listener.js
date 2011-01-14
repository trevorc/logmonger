(function() {
  var config, connect, db, logging, middleware, mongodb, routes, server;
  config = require('jsonconfig');
  connect = require('connect');
  mongodb = require('mongodb');
  db = require('./db');
  middleware = require('./middleware');
  logging = require('./logging');
  routes = function(app) {
    return app.post('/log', function(request, response, next) {
      var body;
      body = {
        msg: request.body,
        client: request.connection.remoteAddress
      };
      return db.insert('logs', body, function(err) {
        if (err != null) {
          return next(err);
        }
        return response.send({
          status: 'OK'
        });
      });
    });
  };
  server = new connect.Server([middleware.responseTimeout(), connect.logger(), middleware.requireAuthToken(config.AUTH_TOKEN), connect.methodOverride(), connect.bodyDecoder(), connect.router(routes), middleware.handle404, middleware.handle500]);
  process.on('uncaughtException', logging.logException);
  this.main = function() {
    return db.open(function(err) {
      if (err != null) {
        throw err;
      }
      return server.listen(8020);
    });
  };
}).call(this);

(function() {
  var http, logging;
  http = require('http');
  logging = require('./logging');
  http.ServerResponse.prototype.send = function(code, obj) {
    var _ref;
    if (obj == null) {
      _ref = [200, code], code = _ref[0], obj = _ref[1];
    }
    this.writeHead(code, 'application/json');
    return this.end("" + (JSON.stringify(obj)) + "\n");
  };
  this.requireAuthToken = function(authToken, headerName) {
    headerName != null ? headerName : headerName = 'x-auth-token';
    return function(request, response, next) {
      if (authToken && request.headers[headerName] !== authToken) {
        return response.send(400, {
          error: {
            type: 'Unauthorized'
          }
        });
      }
      return next();
    };
  };
  this.responseTimeout = function(timeoutDuration) {
    timeoutDuration != null ? timeoutDuration : timeoutDuration = 15 * 1000;
    return function(request, response, next) {
      var end, error500, timeout;
      error500 = function() {
        return response.send(500, {
          error: {
            type: 'InternalServerError'
          }
        });
      };
      timeout = setTimeout(error500, timeoutDuration);
      end = response.end;
      response.end = function(data, encoding) {
        response.end = end;
        clearTimeout(timeout);
        return response.end(data, encoding);
      };
      return next();
    };
  };
  this.handle404 = function(request, response) {
    return response.send(404, {
      error: {
        type: 'ResourceNotFound'
      }
    });
  };
  this.handle500 = function(err, request, response, next) {
    logging.logException(err);
    return response.send(500, {
      error: {
        type: 'InternalServerError'
      }
    });
  };
}).call(this);

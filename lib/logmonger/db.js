(function() {
  var Db, config, exports, mongodb, server, util;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  config = require('jsonconfig');
  mongodb = require('mongodb');
  util = require('util');
  Db = (function() {
    function Db() {
      Db.__super__.constructor.apply(this, arguments);
    }
    __extends(Db, mongodb.Db);
    Db.prototype.find = function(collName, params, next) {
      return this.collection(collName, function(err, coll) {
        if (err != null) {
          return next(err);
        }
        return coll.find(params, next);
      });
    };
    Db.prototype.insert = function(collName, params, next) {
      return this.collection(collName, function(err, coll) {
        if (err != null) {
          return next(err);
        }
        return coll.insert(params, {
          safe: true
        }, next);
      });
    };
    return Db;
  })();
  server = new mongodb.Server(config.MONGO_HOST, config.MONGO_PORT, {
    auto_reconnect: true
  });
  exports = module.exports = new Db(config.MONGO_DATABASE, server);
}).call(this);

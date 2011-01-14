config  = require 'jsonconfig'
mongodb = require 'mongodb'
util    = require 'util'


class Db extends mongodb.Db
  find: (collName, params, next) ->
    @collection collName, (err, coll) ->
      return next err if err?
      coll.find params, next

  insert: (collName, params, next) ->
    @collection collName, (err, coll) ->
      return next err if err?
      coll.insert params, {safe: true}, next


server = new mongodb.Server config.MONGO_HOST, config.MONGO_PORT,
  auto_reconnect: true
exports = module.exports = new Db config.MONGO_DATABASE, server

config  = require 'jsonconfig'
connect = require 'connect'
mongodb = require 'mongodb'

db         = require './db'
middleware = require './middleware'
logging    = require './logging'


routes = (app) ->
  app.post '/log', (request, response, next) ->
    body =
      msg: request.body
      client: request.connection.remoteAddress
    db.insert 'logs', body, (err) ->
      return next err if err?
      response.send status: 'OK'


server = new connect.Server(
  [ middleware.responseTimeout()
  , connect.logger()
  , middleware.requireAuthToken(config.AUTH_TOKEN)
  , connect.methodOverride()
  , connect.bodyDecoder()
  , connect.router(routes)
  , middleware.handle404
  , middleware.handle500
  ])


process.on 'uncaughtException', logging.logException


@main = ->
  db.open (err) ->
    throw err if err?
    server.listen 8020

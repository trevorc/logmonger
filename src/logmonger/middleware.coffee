http = require 'http'

logging = require './logging'


http.ServerResponse.prototype.send = (code, obj) ->
  [code, obj] = [200, code] unless obj?
  @writeHead code, 'application/json'
  @end "#{JSON.stringify obj}\n"


@requireAuthToken = (authToken, headerName) ->
  headerName ?= 'x-auth-token'
  (request, response, next) ->
    if authToken and request.headers[headerName] != authToken
      return response.send 400, {error: {type: 'Unauthorized'}}
    next()


@responseTimeout = (timeoutDuration) ->
  timeoutDuration ?= 15 * 1000
  (request, response, next) ->
    error500 = ->
      response.send 500, error: {type: 'InternalServerError'}
    timeout = setTimeout error500, timeoutDuration
    end = response.end
    response.end = (data, encoding) ->
      response.end = end
      clearTimeout timeout
      response.end data, encoding
    next()


@handle404 = (request, response) ->
  response.send 404, error: {type: 'ResourceNotFound'}


@handle500 = (err, request, response, next) ->
  logging.logException err
  response.send 500, error: {type: 'InternalServerError'}

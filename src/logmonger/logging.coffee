util = require 'util'


@logException = (exc) ->
  util.error [ new Date().toUTCString()
             , "uncaught exception"
             , exc.stack
             ].join '\t'

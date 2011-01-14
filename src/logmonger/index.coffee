util = require 'util'

config = require 'jsonconfig'

exports.main = (mainModule, configFile) ->
  unless configFile?
    util.error "usage: #{process.argv[1]} CONFIG"
    process.exit 1
  config.load configFile, (err) ->
    throw err if err?
    require(mainModule).main()

stderr = process.binding('stdio').writeError

child_process = require 'child_process'
util          = require 'util'

exec = (cmd, args) ->
  proc = child_process.spawn cmd, args,
    customFds: [process.stdin, process.stdout, stderr]
  proc.on 'exit', -> null

option '-w', '--watch', 'watch sources for changes and rebuild'

task 'build', (opts) ->
  args = []
  args.push '-w' if opts.watch
  args.push '-c', '-o', 'lib/', 'src/'
  exec 'coffee', args
  util.error "coffee #{args.join ' '}"

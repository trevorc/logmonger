db = require './db'


query = ->
  db.find 'logs', (err, cursor) ->
    throw err if err?
    cursor.sort '_id', 'desc', (err, cursor) ->
      throw err if err?
      cursor.each (err, res) ->
        throw err if err?
        return db.close() unless res?
        res.timestamp = new Date(res._id.generationTime).toUTCString()
        delete res._id
        console.log (JSON.stringify res)

@main = ->
  db.open (err) ->
    throw err if err?
    query()

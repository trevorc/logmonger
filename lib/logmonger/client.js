(function() {
  var db, query;
  db = require('./db');
  query = function() {
    return db.find('logs', function(err, cursor) {
      if (err != null) {
        throw err;
      }
      return cursor.sort('_id', 'desc', function(err, cursor) {
        if (err != null) {
          throw err;
        }
        return cursor.each(function(err, res) {
          if (err != null) {
            throw err;
          }
          if (res == null) {
            return db.close();
          }
          res.timestamp = new Date(res._id.generationTime).toUTCString();
          delete res._id;
          return console.log(JSON.stringify(res));
        });
      });
    });
  };
  this.main = function() {
    return db.open(function(err) {
      if (err != null) {
        throw err;
      }
      return query();
    });
  };
}).call(this);

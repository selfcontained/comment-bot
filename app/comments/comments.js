const GoogleSpreadsheet = require('google-spreadsheet')

module.exports = (app) => {
  var LAST_COMMENTS = []
  var config = app.config.spreadsheet
  var sheet = new GoogleSpreadsheet(config.id)

  return function getComments (done) {
      app.log.info('loading comments from google...')

      sheet.getRows(config.sheet, (err, rows) => {
        if (err) {
          // Treat errors by sending the last good set of comments
          if (LAST_COMMENTS.length > 0) {
            app.log.error(err.message)
            return callback(null, LAST_COMMENTS)
          }

          return callback(err, [])
        }

        // If our data is empty for some reason, send the last good set
        if (!rows || !rows.length) {
          if (LAST_COMMENTS.length > 0) {
            return callback(null, LAST_COMMENTS)
          }

          return callback(new Error('no comments returned'), [])
        }

        var comments = rows.map((row) => {
          return row.comment
        })

        // Keep a local ref of last good set of comments
        LAST_COMMENTS = comments

        done(null, comments)
      })
  }
}

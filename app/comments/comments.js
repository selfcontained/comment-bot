const GoogleSpreadsheet = require('google-spreadsheet')
const Cashbox = require('cashbox')

module.exports = (app) => {
    var LAST_COMMENTS = []
    var config = app.config.spreadsheet
    var sheet = new GoogleSpreadsheet(config.id)
    var cache = new Cashbox()

    return function getComments (done) {
        cache.get('comments', (key, callback) => {
            app.log.info('loading comments from google...')

            sheet.getRows(config.sheet, (err, rows) => {
        // Treat errors by sending the last good set of lot data
                if (err) {
                    app.log.error(err)
                    return callback(null, LAST_COMMENTS)
                }

        // If our data is empty for some reason, send the last good set
                if (!rows || !rows.length) {
                    return callback(null, LAST_COMMENTS)
                }

        // Keep a local ref of last good set of lot data
        LAST_COMMENTS = rows

                callback(null, rows)
            })
        }, config.ttl, done)
    }
}

const Comments = require('./comments')

module.exports = (app) => {
  var getComments = Comments(app)

  return {

    all: getComments,

    // Return a random comment
    random (done) {
      getComments((err, comments) => {
        if (err) {
          return done(err, comments)
        }

        done(null, comments[Math.floor(Math.random() * comments.length)])
      })
    },

    // Grab a new, untold comment based on the identifier provided, i.e. slack team id
    newComment (identifier, done) {
      app.log.info('grabbing new comment for %s', identifier)

      // Get list of comments already told to identifier
      var key = ['told_comments', identifier].join(':')

      app.persist.get(key, (err, toldComments) => {
        if (err) {
          return done(err, null)
        }

        // First time telling a comment to this identifier
        if (!toldComments) {
          toldComments = []
        }

        // Grab comments
        getComments((err, comments) => {
          if (err) {
            return done(err, null)
          }

          // get a mapping of untold comments/indexes
          var untoldComments = comments
            .map((comment, index) => {
              return { comment, index }
            })
            .filter((item) => {
              return toldComments.indexOf(item.index) === -1
            })

          // We've told em all - reset
          if (untoldComments.length === 0) {
            toldComments = []
            untoldComments = comments.map((comment, index) => {
              return { comment, index }
            })
          }

          var newComment = untoldComments[Math.floor(Math.random() * untoldComments.length)]

          // Add comment to set of told comments
          toldComments.push(newComment.index)
          app.persist.set(key, toldComments, (err) => {
            if (err) {
              return done(err, null)
            }

            done(null, newComment.comment, newComment.index)
          })
        })
      })
    }

  }
}

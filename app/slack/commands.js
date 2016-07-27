const Router = require('express').Router
const bodyParser = require('body-parser')

module.exports = (app) => {
  var verifyToken = app.config.slack.verifyToken
  var router = Router()

  router.get('/comment', (req, res) => {
    res.sendStatus(200)
  })

  router.post('/comment', bodyParser.urlencoded({ extended: true }), (req, res) => {
    if (req.body.token !== verifyToken) {
      return res.sendStatus(401)
    }

    app.comments.newComment(req.body.team_id, (err, comment, commentId) => {
      if (err) {
        app.log.error(err.message)
      }

      res.json({
        response_type: 'in_channel',
        text: comment || app.messages('NO_COMMENT')
      })
    })
  })

  return router
}

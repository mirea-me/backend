/* Checks if user is authenticated */
function auth(req, res, next) {
  if(req.body.secret && req.body.secret == global.config.secret) {
    next()
  } else {
    res.json({ success: false, err: 'Access denied' })
  }
}

module.exports = auth
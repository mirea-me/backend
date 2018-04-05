/* Checks if user is authenticated */
function auth(req, res, next) {
  if(req.isAuthenticated() && req.user.id) {
    next()
  } else {
    res.json({ success: false, err: 'Access denied' })
  }
}

module.exports = auth
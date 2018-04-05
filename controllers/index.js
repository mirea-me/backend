/* Dependencies */
const express = require('express')
const package = require('../package.json')
const router = express.Router()

/* Middleware */
const auth = require('../middlewares/auth.js')

router.use(require('../middlewares/ratelimit.js'))

/* Subroutes */
//router.use('/user', require('./user.js'))

const up_since = Math.floor(Date.now() / 1000)
const version = package.version

/* Routes */
router.post('/', (req, res) => {
  res.json({ success: true, response: { version, up_since } })
})

module.exports = router
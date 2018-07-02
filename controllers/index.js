/* Dependencies */
const express = require('express')
const package = require('../package.json')
const router = express.Router()

/* Middleware */
router.use(require('../middlewares/ratelimit.js'))

/* Subroutes */
router.use('/group', require('./group.js'))
router.use('/org', require('./org.js'))

const up_since = Math.floor(Date.now() / 1000)
const version = package.version

/* Routes */
router.post('/', (req, res) => {
  res.json({ success: true, response: { version, up_since } })
})

module.exports = router
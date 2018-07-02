/* Dependencies */
const express = require('express')
const router = express.Router()

/* Models */
const Org = require('../models/org.js')

/* Middleware */
const auth = require('../middlewares/auth.js')

router.use(require('../middlewares/ratelimit.js'))

/* Routes */
router.post('/get', (req, res) => {
  if(!req.body.id) return res.json({ success: false, err: 'Invalid parameter(s)' })

  Org.findById(req.body.id).deepPopulate('head staff parent').exec((err, group) => {
  	if(err) return res.json({ success: false, err })

  	res.json({ success: true, response: { org } })
  })
})

router.post('/new', auth, (req, res) => {
  if(!req.body.title) return res.json({ success: false, err: 'Invalid parameter(s)' })
  if(!req.body.type) return res.json({ success: false, err: 'Invalid parameter(s)' })
  if(!req.body.head) return res.json({ success: false, err: 'Invalid parameter(s)' })
  if(!req.body.staff) return res.json({ success: false, err: 'Invalid parameter(s)' })
  if(!req.body.parent) return res.json({ success: false, err: 'Invalid parameter(s)' })

  const { title, type, head, staff, parent } = req.body

  const neworg = new Org({ title, type, head, staff, parent })

  neworg.save((err, org) => {
  	if(err) return res.json({ success: false, err })

  	res.json({ success: true, response: { org } })
  })
})

module.exports = router
/* Dependencies */
const express = require('express')
const router = express.Router()

/* Models */
const Group = require('../models/Group.js')

/* Middleware */
const auth = require('../middlewares/auth.js')

router.use(require('../middlewares/ratelimit.js'))

/* Routes */
router.post('/get', (req, res) => {
  if(!req.body.id) return res.json({ success: false, err: 'Invalid parameter(s)' })

  Group.findById(req.body.id).deepPopulate('institute').exec((err, group) => {
  	if(err) return res.json({ success: false, err })

  	res.json({ success: true, response: { group } })
  })
})

/*
	type:
		0 - Bachelors
		1 - Masters
	course:
		09.03.04 and so on
*/

router.post('/new', auth, (req, res) => {
  if(!req.body.title) return res.json({ success: false, err: 'Invalid parameter(s)' })
  if(!req.body.year) return res.json({ success: false, err: 'Invalid parameter(s)' })
  if(!req.body.type) return res.json({ success: false, err: 'Invalid parameter(s)' })
  if(!req.body.course) return res.json({ success: false, err: 'Invalid parameter(s)' })
  if(!req.body.institute) return res.json({ success: false, err: 'Invalid parameter(s)' })

  const { title, year, type, course, institute } = req.body

  const newgroup = new Group({ title, year, type, course, institute })

  newgroup.save((err, group) => {
  	if(err) return res.json({ success: false, err })

  	res.json({ success: true, response: { group } })
  })
})

module.exports = router
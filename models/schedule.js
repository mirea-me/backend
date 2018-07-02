/* Dependencies */
const mongoose = require('mongoose')
const deepPop = require('mongoose-deep-populate')(mongoose)
const { Schema } = mongoose

/* Schema */
const Schedule = new Schema({
  group: { type: Schema.Types.ObjectId, ref: 'Group' },
  year: Number,
  term: Number,
  timespan: {
  	from: Date,
  	to: Date
  },
  days: [{
  	week: Number,
  	classes: [{
	  	title: String,
	  	room: String,
	  	type: Number,
	  	teacher: { type: Schema.types.ObjectId, ref: 'Staff' }
	  }]
  }]
})

Schedule.plugin(deepPop, {})

module.exports = mongoose.model('Schedule', Schedule)
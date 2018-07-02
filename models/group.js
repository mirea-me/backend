/* Dependencies */
const mongoose = require('mongoose')
const deepPop = require('mongoose-deep-populate')(mongoose)
const { Schema } = mongoose

/* Schema */
const Group = new Schema({
  title: String,
  year: Number,
  type: Number,
  course: String,
  institute: { type: Schema.Types.ObjectId, ref: 'Org' },
  students: { type: Array, default : [] }
})

Group.plugin(deepPop, {})

module.exports = mongoose.model('Group', Group)
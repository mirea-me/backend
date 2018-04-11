/* Dependencies */
const mongoose = require('mongoose')
const { Schema } = mongoose

/* Schema */
const Group = new Schema({
  title: String,
  year: Number,
  type: Number,
  course: Number,
  institute: { type: Schema.Types.ObjectId, ref: 'Org' },
  students: { type: Array, default : [] }
})

module.exports = mongoose.model('Group', Group)
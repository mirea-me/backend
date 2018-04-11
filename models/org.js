/* Dependencies */
const mongoose = require('mongoose')
const { Schema } = mongoose

/* Schema */
const Org = new Schema({
  title: String,
  type: Number,
  head: { type: Schema.Types.ObjectId, ref: 'Staff' },
  staff: [{ type: Schema.Types.ObjectId, ref: 'Staff' }],
  parent: { type: Schema.Types.ObjectId, ref: 'Org' }
})

module.exports = mongoose.model('Org', Org)
/* Dependencies */
const mongoose = require('mongoose')
const deepPop = require('mongoose-deep-populate')(mongoose)
const { Schema } = mongoose

/* Schema */
const Org = new Schema({
  title: String,
  type: Number,
  head: { type: Schema.Types.ObjectId, ref: 'Staff' },
  staff: [{ type: Schema.Types.ObjectId, ref: 'Staff' }],
  parent: { type: Schema.Types.ObjectId, ref: 'Org' }
})

Org.plugin(deepPop, {})

module.exports = mongoose.model('Org', Org)
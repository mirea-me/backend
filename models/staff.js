/* Dependencies */
const mongoose = require('mongoose')
const { Schema } = mongoose

/* Schema */
const Staff = new Schema({
  first_name: String,
  middle_name: String,
  last_name: String,
  img: String,
  role: Number,
  orgs: [{ type: Schema.Types.ObjectId, ref: 'Org' }]
})

module.exports = mongoose.model('Staff', Staff)
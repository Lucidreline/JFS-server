const mongoose = require('mongoose')
require('mongoose-type-email')

const clockSchema = new mongoose.Schema({
  start: { type: Number, required: true },
  end: { type: Number },
})

module.exports = mongoose.model('Clock', clockSchema)

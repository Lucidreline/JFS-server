const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  name: String,
  wallet: Number,
})

module.exports = mongoose.model('Student', studentSchema)

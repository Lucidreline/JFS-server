const mongoose = require('mongoose')
require('mongoose-type-email')

const studentSchema = new mongoose.Schema({
  basicInfo: {
    name: {
      first: { type: String, required: true },
      middle: String,
      last: { type: String, required: true },
    },

    address: {
      fullStreet: String,
      unitNumber: String,
      city: String,
      state: String,
      zipcode: String,
    },

    contactsName: {
      first: String,
      middle: String,
      last: String,
    },

    parentPhoneNumber: String,

    gradeLevel: Number,
    graduationYear: Number,
    email: { type: mongoose.SchemaTypes.Email, unique: true },
    dateOfBirth: {
      year: Number,
      month: Number,
      day: Number,
    },
  },

  districtID: { type: String, required: true, unique: true },

  clock: {
    isClockedIn: { type: Boolean, required: true, default: false },
    history: {
      // history of all the times that the student has clocked in/out
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      default: [],
    },
  },

  wallet: { type: Number, required: true, default: 0 },
})

module.exports = mongoose.model('Student', studentSchema)

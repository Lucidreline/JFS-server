const express = require('express')
const Student = require('../models/student')

const router = express.Router()

// @route POST /api/chip-reader
// @desc clocks a student in or out
// @ access private (card-reader)
router.post('/chip-reader', async (req, res) => {
  const { id } = req.body
  console.log(`\nServer recieved ID: ${id}`)

  const foundStudent = await Student.findOne({ _id: id })
  foundStudent.wallet += 0.5
  await foundStudent.save()

  console.log(`${foundStudent.name} clocked in, wallet: ${foundStudent.wallet}`)
  res.send(foundStudent)
})

// const clockIn = () => {

// }

// const clockOut = () => {

// }

module.exports = router

const express = require('express')
const Student = require('../models/student')

const router = express.Router()

const clockIn = async (student) => {
  const currentStudent = student
  currentStudent.clock.isClockedIn = true

  await student.save()
}

const clockOut = async (student) => {
  const currentStudent = student
  currentStudent.clock.isClockedIn = false
  await student.save()
}

// @route POST /api/chip-reader
// @desc clocks a student in or out
// @ access private (card-reader)
router.post('/chip-reader', async (req, res) => {
  const { districtID } = req.body
  console.log(`\n🖥 Server recieved Distric ID: ${districtID}`)

  const foundStudent = await Student.findOne({ districtID })

  if (foundStudent == null)
    console.log('⚠️ Was not able to find a student with that Distric ID')
  else if (foundStudent.clock.isClockedIn === true) clockIn(foundStudent)
  else clockOut(foundStudent)

  console.log(`${foundStudent.name} clocked in, wallet: ${foundStudent.wallet}`)
  res.send(foundStudent)
})

module.exports = router

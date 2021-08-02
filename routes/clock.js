const express = require('express')
const Student = require('../models/student')

const clockIn = require('../utils/clockIn')
const clockOut = require('../utils/clockOut')

const router = express.Router()

// @route POST /api/chip-reader
// @desc clocks a student in or out
// @ access private (card-reader)
router.post('/chip-reader', async (req, res) => {
  const { districtID } = req.body
  console.log(`\n🖥 Server recieved Distric ID: ${districtID}`)

  const foundStudent = await Student.findOne({ districtID })

  if (foundStudent == null) {
    console.log(`⚠️  Not able to find a student with Distric ID ${districtID}.`)
    return res.status(404).json({
      err: `Not able to find a student with Distric ID ${districtID}.`,
    })
  }

  // checks if student needs to be clocked in or out
  if (foundStudent.clock.isClockedIn === false) await clockIn(foundStudent, res)
  else await clockOut(foundStudent, res)

  return res.send(foundStudent)
})

module.exports = router

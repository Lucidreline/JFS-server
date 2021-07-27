const express = require('express')
const Student = require('../models/student')
const Clock = require('../models/clock')

const router = express.Router()

const formatTime = (milliseconds) => new Date(milliseconds).toLocaleString()

const clockIn = (student, res) => {
  // eslint-disable-next-line no-async-promise-executor
  const promise = new Promise(async (resolve, reject) => {
    try {
      const currentStudent = student

      // create new clock object and save it to db
      const clockInTime = Date.now()
      const formattedTime = formatTime(clockInTime)
      const clock = new Clock({
        start: clockInTime,
      })
      await clock.save()

      // add clock object to students history
      currentStudent.clock.history.push(clock._id)

      currentStudent.clock.isClockedIn = true

      console.log(
        `➡️ ${currentStudent.basicInfo.name.first} clocked in at ${formattedTime}`,
      )
      resolve(await currentStudent.save())
    } catch (err) {
      reject(res.status(500).json({ error: err.message }))
    }
  })
  return promise
}

const clockOut = (student, res) => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const currentStudent = student
      currentStudent.clock.isClockedIn = false

      // take the most recent clockIn and add a clock out time
      const mostRecentClockID =
        currentStudent.clock.history[currentStudent.clock.history.length - 1]
          ._id
      const clockOutTime = Date.now()
      const formattedTime = formatTime(clockOutTime)

      const clock = await Clock.findOne({ _id: mostRecentClockID })
      clock.end = clockOutTime
      await clock.save()

      console.log(
        `⬅️ ${currentStudent.basicInfo.name.first} clocked out at ${formattedTime}`,
      )
      resolve(currentStudent.save())
    } catch (err) {
      reject(res.status(500).json({ error: err.message }))
    }
  })

  return promise
}

// @route POST /api/chip-reader
// @desc clocks a student in or out
// @ access private (card-reader)
router.post('/chip-reader', async (req, res) => {
  const { districtID } = req.body
  console.log(`\n🖥 Server recieved Distric ID: ${districtID}`)

  const foundStudent = await Student.findOne({ districtID })

  if (foundStudent == null) {
    console.log(`⚠️ Not able to find a student with Distric ID ${districtID}.`)
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

const express = require('express')
const Student = require('../models/student')
const Clock = require('../models/clock')

const router = express.Router()

// 1023838938 -> at 7/27/2021, 1:22:52 AM
const formatTime = (milliseconds) => new Date(milliseconds).toLocaleString()

const clockIn = (student, res) => {
  // eslint-disable-next-line no-async-promise-executor
  const promise = new Promise(async (resolve, reject) => {
    try {
      const currentStudent = student

      // student marked as clocked in
      currentStudent.clock.isClockedIn = true

      // create new clock object and save it to db
      const clockInTime = Date.now()
      const clock = new Clock({
        start: clockInTime,
      })
      await clock.save()

      // add clock object to students history
      currentStudent.clock.history.push(clock._id)

      // print results
      const formattedTime = formatTime(clockInTime)
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

      // marks student as clocked out
      currentStudent.clock.isClockedIn = false

      // take the most recent clockIn and add a clock out time
      const mostRecentClockID =
        currentStudent.clock.history[currentStudent.clock.history.length - 1]
          ._id
      const clock = await Clock.findOne({ _id: mostRecentClockID })
      const clockOutTime = Date.now()
      clock.end = clockOutTime
      await clock.save()

      const formattedTime = formatTime(clockOutTime)
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

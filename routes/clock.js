const express = require('express')
const Student = require('../models/student')
// const Clock = require('../models/clock')

const router = express.Router()

// const clockIn = async (student) => {
//   const currentStudent = student

//   const clockInTime = Date.now()
//   const clock = new Clock({
//     start: clockInTime,
//   })

//   await clock.save()

//   currentStudent.clock.history.push(clock._id)

//   currentStudent.clock.isClockedIn = true

//   // const formattedTime = new Date(clockInTime.toLocaleString())

//   console.log(`➡️ ${currentStudent.name} clocked in at ${clockInTime}`)

//   await currentStudent.save()
// }

// const clockOut = async (student) => {
//   const currentStudent = student
//   currentStudent.clock.isClockedIn = false

//   // take the most recent clockIn and add a clock out time
//   const mostRecentClockID =
//     currentStudent.clock.history[currentStudent.clock.history.length - 1]._id

//   const clockOutTime = Date.now()
//   const clock = Clock.findOne({ _id: mostRecentClockID })
//   clock.end = clockOutTime

//   await clock.save()

//   const formattedTime = new Date(clockOutTime.toLocaleString())
//   console.log(`⬅️ ${currentStudent.name} clocked out at ${formattedTime}`)

//   await currentStudent.save()
// }

const clockIn = (student) => {
  const promise = new Promise((resolve, reject) => {
    try {
      const updatedStudent = student
      updatedStudent.clock.isClockedIn = false
      resolve(updatedStudent.save())
    } catch (err) {
      reject(err)
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

  console.log(await clockIn(foundStudent))

  // if (foundStudent == null)
  //   console.log('⚠️ Was not able to find a student with that Distric ID')
  // else if (foundStudent.clock.isClockedIn === false) clockIn(foundStudent)
  // else clockOut(foundStudent)
  res.send(foundStudent)
})

module.exports = router

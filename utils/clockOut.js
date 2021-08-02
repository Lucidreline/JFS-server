const Clock = require('../models/clock')

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

      const formattedTime = new Date(clockOutTime).toLocaleString()
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

module.exports = clockOut

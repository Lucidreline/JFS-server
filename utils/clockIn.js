const Clock = require('../models/clock')

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
      const formattedTime = new Date(clockInTime).toLocaleString()
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

module.exports = clockIn

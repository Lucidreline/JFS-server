const express = require('express')
const Student = require('../models/student')

const formatCsvStudents = require('../utils/formatCsvStudents')

const router = express.Router()

router.get('/student/id/:districtID', (req, res) => {
  const { districtID } = req.params

  Student.findOne({ districtID })
    .then((result) => {
      if (result == null)
        return res.status(404).json({
          error: `Student does not exsist with districtID ${districtID}`,
        })

      return res.status(200).json({ student: result })
    })
    .catch((err) => res.status(500).json({ error: err.message }))
})

// @route POST /api/new-student
// @desc creates single new student in database
// @ access private (admin)
router.post('/new-student', (req, res) => {
  const { basicInfo, districtID } = req.body // TODO use formatCsvStudents
  const newStudent = new Student({
    basicInfo,
    districtID,
  })

  newStudent
    .save()
    .then(() => res.status(201).json({ student: newStudent }))
    .catch((err) => res.status(500).json({ error: err.message }))
})

// @route POST /api/new-students
// @desc creates multiple students in database
// @ access private (admin)
router.post('/new-students', async (req, res) => {
  // TODO test without async just to make sure you can remove it
  const rawStudents = req.body.data
  const formattedCsvStudents = formatCsvStudents(rawStudents)

  Student.create(formattedCsvStudents)
    .then(() => res.status(201).json(formattedCsvStudents))
    .catch((err) => res.status(500).json({ error: err.message }))
})

module.exports = router

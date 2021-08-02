const express = require('express')
const Student = require('../models/student')

const formatCsvStudents = require('../utils/formatCsvStudents')

const router = express.Router()

// @route POST /api/new-student
// @desc creates single new student in database
// @ access private (admin)
router.post('/new-student', async (req, res) => {
  const { basicInfo, districtID } = req.body // TODO use formatCsvStudents
  const newStudent = new Student({
    basicInfo,
    districtID,
  })

  await newStudent.save()
  res.status(201).send(newStudent) // FIXME have this return json
  // TODO add .next and .catch just like on /api/new-students
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
    .catch((err) => res.status(500).json({ err }))
})

module.exports = router

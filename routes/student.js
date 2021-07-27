const express = require('express')
const Student = require('../models/student')

const router = express.Router()

// @route POST /api/new-student
// @desc creates single new student in database
// @ access private (admin)
router.post('/new-student', async (req, res) => {
  const { basicInfo, districtID } = req.body
  const newStudent = new Student({
    basicInfo,
    districtID,
  })

  await newStudent.save()
  res.status(201).send(newStudent)
})

module.exports = router

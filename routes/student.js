const express = require('express')
const Student = require('../models/student')

const router = express.Router()

// @route POST /api/new-student
// @desc creates single new student in datebase
// @ access private (admin)
router.post('/new-student', async (req, res) => {
  const { name, wallet } = req.body
  const newStudent = new Student({
    name,
    wallet,
  })

  await newStudent.save()
  res.send(newStudent._id)
})

module.exports = router

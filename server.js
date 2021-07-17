const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./utils/connectDB')

const Student = require('./models/student')

const app = express()

connectDB()
app.use(bodyParser.json())

app.post('/chip-reader', async (req, res) => {
  const { id } = req.body
  console.log(`\nServer recieved ID: ${id}`)

  const foundStudent = await Student.findOne({ _id: id })
  foundStudent.wallet += 0.5
  await foundStudent.save()

  console.log(`${foundStudent.name} clocked in, wallet: ${foundStudent.wallet}`)
  res.send(foundStudent)
})

app.post('/new-student', async (req, res) => {
  const { name, wallet } = req.body
  const newStudent = new Student({
    name,
    wallet,
  })

  await newStudent.save()
  res.send(newStudent._id)
})
app.listen(process.env.PORT, () =>
  console.log(`💻 Servers up on port: ${process.env.PORT}`),
)

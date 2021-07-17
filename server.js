const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./utils/connectDB')

const app = express()

connectDB()
app.use(bodyParser.json())

app.post('/chip-reader', (req) => {
  const { id } = req.body
  console.log(`Server recieved ID: ${id}`)
})

app.listen(process.env.PORT, () =>
  console.log(`💻 Servers up on port: ${process.env.PORT}`),
)

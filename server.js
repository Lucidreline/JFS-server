const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./utils/connectDB')

const clockRoutes = require('./routes/clock')
const studentRoutes = require('./routes/student')

const app = express()

connectDB()
app.use(bodyParser.json())

app.use('/api', clockRoutes)
app.use('/api', studentRoutes)

app.listen(process.env.PORT, () =>
  console.log(`💻 Servers up on port: ${process.env.PORT}`),
)

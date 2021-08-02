const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const connectDB = require('./utils/connectDB')

const clockRoutes = require('./routes/clock')
const studentRoutes = require('./routes/student')

const app = express()

connectDB()
// app.use(bodyParser.json())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(cors())

app.use('/api', clockRoutes)
app.use('/api', studentRoutes)

app.listen(process.env.PORT, () =>
  // eslint-disable-next-line no-console
  console.log(`💻 Servers up on port: ${process.env.PORT}`),
)

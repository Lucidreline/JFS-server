const express = require('express')

const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.listen(process.env.PORT, () => console.log('💻 Server ON'))

require('dotenv').config()
const mongoose = require('mongoose')

const uri = process.env.mongoURI

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('📂 Connected to DB')
  } catch (e) {
    console.log(`Error connecting to MongoDB: ${e.message}. Stopping Server 🛑`)

    // eslint-disable-next-line no-process-exit
    process.exit(1)
  }
}

module.exports = connectDB

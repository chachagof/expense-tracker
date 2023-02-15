const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'prodution') {
  require('dotenv').config()
}

mongoose.set({ 'strictQuery': false })
mongoose.connect(process.env.MONGODB)

const db = mongoose.connection

db.on('error', err => console.log(err))
db.once('open', () => console.log('MongoDB connected'))

module.exports = db
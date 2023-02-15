const mongoose = require('mongoose')
const Schema = mongoose.Schema

const item = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: Number,
    ref:'categoryId',
    required: true
  }
})

module.exports = mongoose.model('expense-items', item)
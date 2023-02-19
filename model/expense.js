const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./user')

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
    ref: 'categoryId',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    index: true,
    required: true
  }
})

module.exports = mongoose.model('expense_items', item)
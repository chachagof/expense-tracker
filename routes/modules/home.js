const express = require('express')
const router = express.Router()
const Expense = require('../../model/expense')

const icon = require('../../public/icon')

// main page
router.get('/', (req, res) => {
  Expense.find()
    .lean()
    .sort({ name: "asc" })
    .then(expense => {
      // add fontawesome
      expense.map(item =>{
        const index = item.category
        item.icon = icon[index]
      })
      res.render('index', { expense })
    })
})

module.exports = router
const express = require('express')
const router = express.Router()
const Expense = require('../../model/expense')

const icon = require('../../public/icon')

// main page
router.get('/', (req, res) => {
  const _id = req.user._id
  Expense.find({ userId: _id })
    .lean()
    .sort({ userId: 'asc' })
    .then(expense => {
      // add fontawesome
      expense.map(item => {
        const index = item.category
        item.icon = icon[index]
      })
      res.render('index', { expense })
    })
})
// sort page
router.post('/sort', (req, res) => {
  const { categoryId } = req.body
  const _id = req.user._id
  Expense.find({ userId: _id, category: categoryId })
    .lean()
    .sort({ userId: 'asc' })
    .then(expense => {
      if (expense.length === 0) {
        req.flash('error_msg', 'Find nothings in this category')
        return res.redirect('/')
      }
      // add fontawesome
      expense.map(item => {
        const index = item.category
        item.icon = icon[index]
      })
      return res.render('index', { expense })
    })
    .catch(err => console.log(err))

})

module.exports = router
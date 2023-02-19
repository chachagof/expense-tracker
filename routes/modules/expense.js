const express = require('express')
const expense = require('../../model/expense')
const router = express.Router()
const Expense = require('../../model/expense')

// create page
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const { name, date, amount, category } = req.body
  const userId = req.user._id
  // checked name (undone)
  if (name.trim() === '') {
    req.flash('error_msg', `Please don't enter space character`)
    return res.redirect('/expense/new')
  }
  if (!name || !date || !amount || !category) {
    req.flash('error_msg', `Please enter valid character`)
    return res.redirect('/expense/new')
  }
  const checkedName = name.trim()
  Expense.create({ name: checkedName, date, amount, category, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// edit page
router.get('/:_id/edit', (req, res) => {
  const _id = req.params._id
  Expense.findOne({ _id })
    .lean()
    .then(expense => {
      res.render('edit', { expense })
    })
    .catch(err => console.log(err))
})
router.put('/:_id', (req, res) => {
  const _id = req.params._id
  const { name, date, amount, category } = req.body
  // checked name (undone)
  if (name.trim() === '') {
    return res.redirect('/expense/new')
  }
  const checkedName = name.trim()
  Expense.findByIdAndUpdate(_id, { name: checkedName, date, amount, category })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// delete
router.delete('/:_id', (req, res) => {
  const _id = req.params._id
  Expense.findByIdAndDelete(_id)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router
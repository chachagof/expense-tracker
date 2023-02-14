const express = require('express')
const router = express.Router()
const Expense = require('../../model/expense')



// create page
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const { name, date, amount, category } = req.body
  // checked name (undone)
  if (name.trim() === '') {
    return res.redirect('/expense/new')
  }
  const checkedName = name.trim()
  Expense.create({ name: checkedName, date, amount, category })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// edit page
router.get('/edit', (req, res) => {
  res.render('edit')
})

module.exports = router
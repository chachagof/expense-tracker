const express = require('express')
const router = express.Router()

// create page
router.get('/new', (req, res) => {
  res.render('new')
})

// edit page
router.get('/edit', (req, res) => {
  res.render('edit')
})

module.exports = router
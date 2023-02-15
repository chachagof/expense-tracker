const express = require('express')
const router = express.Router()

// login
router.get('/login',(req,res)=>{
 res.render('login')
})

router.post('/login',(req,res)=>{

})
// register
router.get('/register',(req,res)=>{
  res.render('register')
})

router.post('/register',(req,res)=>{

})

// logout

module.exports = router
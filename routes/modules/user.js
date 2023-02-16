const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../model/user')

// login
router.get('/login',(req,res)=>{
 res.render('login')
})

router.post('/login',passport.authenticate('local',{
  successRedirect:'/',
  failureRedirect:'/users/login'
}))
// register
router.get('/register',(req,res)=>{
  res.render('register')
})

router.post('/register',(req,res)=>{
  const { name, email, password, confirmPassword } = req.body
  if (password !== confirmPassword){
    return res.redirect('/users/register')
  }
  User.findOne({email})
    .then(user=>{
      if(user){
        return res.redirect('/users/register')
      }
      User.create({name,email,password})
      return res.redirect('/users/login')
    })
    .catch(err=>console.log(err))
  
})

// logout

module.exports = router
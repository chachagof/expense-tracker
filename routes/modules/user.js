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
  const error = []
  if (name.trim() === '' || password.trim() === '' || confirmPassword.trim() === ''){
    error.push({ 'message':'All fields must be filled with valid characters!'})
  }
  if (password !== confirmPassword){
    error.push({"message":"Password must be matched!"})
  }
  if(error.length){
    return res.render('register',{
      name, 
      email,
      password,
      confirmPassword,
      error
    })
  }
  User.findOne({email})
    .then(user=>{
      if(user){
        error.push({ 'message':'This email is already registered!'})
        return res.render('register',{
          name,
          email,
          password,
          confirmPassword,
          error
        })
      }
      User.create({name,email,password})
      return res.redirect('/users/login')
    })
    .catch(err=>console.log(err))
  
})

// logout
router.get('/logout',(req,res)=>{
  req.logout()
  req.flash('success_msg','successfully logged out')
  res.redirect('/users/login')
})

module.exports = router
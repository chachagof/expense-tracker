const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('../model/user')

module.exports = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new localStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({email})
      .then(user=>{
        if(!user){
          return done(null,false,{message:'no user'})
        }
        if(user.password !== password){
          return done(null,false,{message:'no password'})
        }
        return done(null,user)
      })
      .catch(err=>done(err,null))
  }))

  passport.serializeUser((user,done)=>{
    done(null,user.id)
  })
  passport.deserializeUser((id,done)=>{
    User.findById(id)
      .lean()
      .then(user=>done(null,user))
      .catch(err=>done(err,null))
  })
}
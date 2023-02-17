const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')
const User = require('../model/user')

module.exports = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())

  // local login
  passport.use(new localStrategy({ usernameField: "email", passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash('error_msg', `This email isn't registered.Please register first!`))
        }
        return bcrypt.compare(password, user.password)
          .then(match => {
            if (!match) {
              return done(null, false, req.flash('error_msg', `Email or Password incorrect!`))
            }
            return done(null, user)
          })
      })
      .catch(err => done(err, null))
  }))

  // facebook login
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { email, name } = profile._json
    User.findOne({ email })
      .then(user => {
        if (user) return done(null, user)
        const randomNumber = Math.random().toString(36).slice(-10)
        bcrypt.genSalt(10)
          .then(salt => bcrypt.hash(randomNumber, salt))
          .then(hash => {
            User.create({
              name,
              email,
              password: hash
            })
          })
          .then(user => done(null, user))
          .catch(err => done(err, null))
      })

  }))


  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes/index')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
const helper = require('./public/helper')

const app = express()
const port = 3000

if (process.env.NODE_ENV = 'production') {
  require('dotenv').config()
}

require('./config/mongoose')

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' ,helpers:helper}))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static('./public/'))
app.use(methodOverride('_method'))
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))

usePassport(app)

app.use(flash())
app.use((req,res,next)=>{
  res.locals.isAuthenticated = req.isAuthenticated
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  next()
})


app.use(routes)


app.listen(port, () => {
  console.log(`Gogogo http://localhost:${port}/`)
})
const express = require('express')
const exphbs = require('express-handlebars')
const routes = require('./routes/index')
const methodOverride = require('method-override')

const app = express()
const port = 3000

require('./config/mongoose')

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(routes)


app.listen(port, () => {
  console.log(`Gogogo http://localhost:${port}/`)
})
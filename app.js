const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// main page
app.get('/', (req, res) => {
  res.render('index')
})

// create page
app.get('/expense/new',(req,res)=>{
  res.render('new')
})

// edit page
app.get('/expense/edit',(req,res)=>{
  res.render('edit')
})

app.listen(port, () => {
  console.log(`Gogogo http://localhost:${port}/`)
})
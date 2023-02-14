const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/expense/new',(req,res)=>{
  res.render('new')
})

app.listen(port, () => {
  console.log(`Gogogo http://localhost:${port}/`)
})
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const routes = require('./routes/index')

const app = express()
const port = 3000

if(process.env.NODE_ENV !== 'prodution'){
  require('dotenv').config()
}

mongoose.set({ 'strictQuery': false })
mongoose.connect(process.env.MONGODB)

const db = mongoose.connection

db.on('error',err=>console.log(err))
db.once('open',()=>console.log('MongoDB connected'))

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({extended:true}))
app.use(routes)


app.listen(port, () => {
  console.log(`Gogogo http://localhost:${port}/`)
})
const mongoose = require('mongoose')
if (process.env.NODE_ENV !== 'prodution') {
  require('dotenv').config()
}

mongoose.set({ 'strictQuery': false })
mongoose.connect(process.env.MONGODB)

const db = mongoose.connection

const Category = require('../category')
const category = [
  {1: '家居物業'},
  {2: '交通出行'},
  {3: '休閒娛樂'},
  {4: '餐飲食品'},
  {5: '其他'}
]

db.on('error', err => console.log(err))
db.once('open', () => {
  for(let i = 1;i <= category.length;i++){
    Category.create({id:i,name:category[i-1][i]})
      .catch(err => console.log(err))
  }
  console.log('category seeds is done')
})
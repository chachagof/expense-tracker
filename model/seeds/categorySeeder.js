const db = require('../../config/mongoose')
const Category = require('../categoryId')

const SEED_CATEGORY = [
  { id: 1, name: '家居物業' },
  { id: 2, name: '交通出行' },
  { id: 3, name: '休閒娛樂' },
  { id: 4, name: '餐飲食品' },
  { id: 5, name: '其他' }
]

db.once('open', () => {
  Promise.all(SEED_CATEGORY.map(item => {
    return Category.create(item)
  }))
    .then(() => {
      console.log('SEED_CATEGORY is done.')
      process.exit()
    })
})
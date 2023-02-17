const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const User = require('../user')
const Expense = require('../expense')

const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

const SEED_RECORD = [
  { name: '搭捷運', date: '2023-2-28', amount: 50, category: 2 },
  { name: '吃早餐', date: '2023-2-28', amount: 250, category: 4 },
  { name: '去KTV', date: '2023-2-28', amount: 999, category: 3 },
  { name: '搭Uber', date: '2023-2-28', amount: 210, category: 2 },
  { name: '房租', date: '2023-3-01', amount: 9000, category: 1 },
]

db.once('open', (req, res) => {
  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({
      name: SEED_USER.name,
      email: SEED_USER.email,
      password: hash
    }))
    .then(user => {
      const userId = user._id
      return Promise.all(SEED_RECORD.map(item => {
        item.userId = userId
        return Expense.create(item)
      }))
    })
    .then(() => {
      console.log('SEED_USER & SEED_RECORD is done.')
      process.exit()
    })
})
const { User } = require('../models')

const userData =
[
  {
    'username': 'Mike',
    'email': 'Mpergolatti@gmail.com',
    'password': 'Password123'
  }
]

const seedUsers = () => User.bulkCreate(userData)

module.exports = seedUsers;
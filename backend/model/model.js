const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')

let UserSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  health: {
    type: Number,
    default: 100
  },
  gold: {
    type: Number,
    default: 100
  },
  inventory: {
    type: Array
  }
})

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', (next) => {
  let user = this;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hashedPassword) => {
      user.password = hashedPassword
      next()
    })
  })
})

let User = mongoose.model('Users', UserSchema)

module.exports = User
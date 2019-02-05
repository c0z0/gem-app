const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true,
  },
})

module.exports = mongoose.model('User', UserSchema)

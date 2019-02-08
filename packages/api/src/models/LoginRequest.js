const mongoose = require('mongoose')

const utils = require('../utils')

const LoginRequestSchema = new mongoose.Schema({
  pending: {
    type: Boolean,
    default: true,
    required: true,
  },
  token: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  verificationCode: {
    type: String,
    required: true,
    default: utils.generateSecret,
  },
  secretId: {
    type: String,
    required: true,
    default: utils.generateId,
  },
})

module.exports = mongoose.model('LoginRequest', LoginRequestSchema)

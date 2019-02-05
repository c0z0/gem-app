const mongoose = require('mongoose')

const GemSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, required: true},
  url: {type: String, required: true},
  title: {type: String, required: false},
  tags: {type: Array, required: true, default: []},
})

module.exports = mongoose.model('Gem', GemSchema)

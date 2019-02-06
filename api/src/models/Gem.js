const mongoose = require('mongoose')

const GemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  displayUrl: { type: String, required: true },
  href: { type: String, required: true },
  title: { type: String, required: false },
  tags: { type: Array, required: true, default: [] },
  createdAt: { type: Date, required: true, default: Date.now() }
})

module.exports = mongoose.model('Gem', GemSchema)

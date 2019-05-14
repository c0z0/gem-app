const mongoose = require('mongoose')

const GemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  displayUrl: { type: String, required: true },
  href: { type: String, required: true },
  title: { type: String, required: true },
  tags: { type: Array, required: true, default: [] },
  createdAt: { type: Date, required: true, default: Date.now },
  favorite: { type: Boolean, required: true, default: false },
  folderId: { type: mongoose.Schema.Types.ObjectId, required: false },
  deleted: { type: Boolean, required: true, default: false }
})

module.exports = mongoose.model('Gem', GemSchema)

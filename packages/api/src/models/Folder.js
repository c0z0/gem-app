const mongoose = require('mongoose')

const FolderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: false },
  createdAt: { type: Date, required: true, default: Date.now }
})

module.exports = mongoose.model('Folder', FolderSchema)

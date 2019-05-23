const mongoose = require('mongoose')

const PortalSchema = new mongoose.Schema({
  href: { type: String, required: true },
  code: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true }
})

module.exports = mongoose.model('Portal', PortalSchema)

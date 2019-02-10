const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true, default: 'New note' },
  content: {
    type: String,
    required: true,
    default:
      '{"object":"value","document":{"object":"document","data":{},"nodes":[{"object":"block","type":"paragraph","data":{},"nodes":[{"object":"text","leaves":[{"object":"leaf","text":"Start writing your thoughts...","marks":[]}]}]}]}}'
  },
  createdAt: { type: Date, required: true, default: Date.now },
  lastEdited: { type: Date, required: true, default: Date.now }
})

module.exports = mongoose.model('Note', NoteSchema)

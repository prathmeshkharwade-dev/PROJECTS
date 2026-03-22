import mongoose from 'mongoose'

const ItemSchema = new mongoose.Schema({
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:     { type: String, required: true, trim: true },
  type:      { type: String, enum: ['article','tweet','video','pdf','image'], default: 'article' },
  url:       { type: String, trim: true },
  content:   { type: String },
  summary:   { type: String },
  tags:      [{ type: String, lowercase: true, trim: true }],
  notes:     { type: String, default: '' },
  highlight: { type: String, default: '' },
  savedAt:   { type: Date, default: Date.now },
}, { timestamps: true })

ItemSchema.index({ title: 'text', tags: 'text', summary: 'text' })

export default mongoose.model('Item', ItemSchema)
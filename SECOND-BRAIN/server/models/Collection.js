import mongoose from 'mongoose'

const CollectionSchema = new mongoose.Schema({
  user:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:  { type: String, required: true, trim: true },
  color: { type: String, default: '#7C6FCD' },
  icon:  { type: String, default: '📁' },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
}, { timestamps: true })

export default mongoose.model('Collection', CollectionSchema)
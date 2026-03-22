import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

const UserSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
}, { timestamps: true })

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcryptjs.hash(this.password, 10)
})

UserSchema.methods.matchPassword = function (entered) {
  return bcryptjs.compare(entered, this.password)
}

export default mongoose.model('User', UserSchema)
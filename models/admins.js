import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
  email: { type: String, unique : true, dropDups: true },
  password: String,
  status: { type: String, default: 'ACTIVE' },
  createdAt: { type: Date, default: Date.now }
})

const admins = mongoose.model('admins', adminSchema)

export {
  admins
}

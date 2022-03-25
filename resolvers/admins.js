import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

module.exports = {
  Query: {
    async getAllAdmins(parent, { page, limit }, { models: { admins: { admins } } }, info) {
      const count = await admins.countDocuments()
      const allAdmins = await admins.find({}).limit(limit).skip((page - 1) * limit).lean()

      return {
        admins: allAdmins,
        totalUsers: count,
        totalPages: Math.ceil(count / limit)
      }
    },
  },
  Mutation: {
    async login(parent, { email, password }, { models: { admins: { admins } } }, info) {
      const today = new Date()
      const exp = new Date(today)
      exp.setDate(today.getDate() + 60)
      const adminFound = await admins.findOne({ email })

      if (!adminFound) {
        throw new Error('User does not exist!')
      }

      const isEqual = await bcrypt.compareSync(password, adminFound.password)

      if (!isEqual) {
        throw new Error('Password is incorrect!')
      }

      const token = jwt.sign({
        email: adminFound.email,
        exp: parseInt(exp.getTime() / 1000)
      }, process.env.BCRYPT_SECRET_WORD)

      return {
        admin: adminFound,
        token
      }
    }
  }
}

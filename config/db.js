import mongoose from 'mongoose'

const mongoUsername = process.env.MONGO_USERNAME
const mongoPassword = process.env.MONGO_PASSWORD
const mongoHost = process.env.MONGO_HOST
const dbName = process.env.MONGO_DATABASE

const options = {
  useNewUrlParser: true,  // You should set useNewUrlParser: true unless that prevents you from connecting
  connectTimeoutMS: 10000, // How long the MongoDB driver will wait before failing its initial connection attempt
  socketTimeoutMS: 45000, // A socket may be inactive because of either no activity or a long-running operation. This is set to 30000 by default
  family: 4, // Use IPv4, skip trying IPv6
  dbName,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}

const dbConfig = () => {
  const dbURI = `mongodb://${encodeURIComponent(mongoUsername)}:${encodeURIComponent(mongoPassword)}@${mongoHost}?ssl=true&authSource=admin&retryWrites=true`
  const db = mongoose.connection
  mongoose.connect(dbURI, options)

  db.once('open', () => console.log('MongoDB running')).on('error', err => console.error(err))
  db.on('connecting', () => console.log('connecting to MongoDB...'))
  db.on('connected', () => console.log('MongoDB connected!'))
  db.on('reconnected', () => console.log('MongoDB reconnected!'))
  db.on('disconnected', () => {
    console.log('MongoDB disconnected!')
    mongoose.connect(dbURI, options)
  })
}

export {
  dbConfig
}

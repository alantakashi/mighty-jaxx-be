import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  sku: { type: String, unique : true, dropDups: true },
  title: String,
  image: String
})

const products = mongoose.model('products', productSchema)

export {
  products
}

"use strict"

module.exports = {
  Query: {
    async getAllProducts(parent, { page, limit }, { models: { products: { products } } }, info) {
      const count = await products.countDocuments()
      const allProducts = await products.find({}).limit(limit).skip((page - 1) * limit).lean()

      return {
        products: allProducts,
        totalProducts: count,
        totalPages: Math.ceil(count / limit)
      }
    },
    async getProductsById(parent, { _id }, { models: { products: { products } } }, info) {
      const product = await products.findOne({ _id }).lean()
      return product
    },
    async searchProductsBySku(parent, { sku }, { models: { products: { products } } }, info) {
      const product = await products.findOne({ 'sku': sku }).lean()
      return product
    },
  },
  Mutation: {
    async createProduct(parent, args, { models: { products: { products } } }, info) {
      await products.create({ ...args })
      return await products.findOne({ 'sku': args.sku }).lean()
    },
    async updateProduct(parent, args, { models: { products: { products } } }, info) {
      return await products.findOneAndUpdate(
        { '_id': args._id },
        {
          $set: { 
            sku: args.sku,
            title: args.title,
            image: args.image
          }
        }, 
        { new: true }
      ).lean().exec()
    },
    async deleteProduct(parent, { _id }, { models: { products: { products } } }, info) {
      return await products.findOneAndRemove({ _id });
    },
  }
}

module.exports = {
  Type: `
    type Product {
      _id: String!
      sku: String
      title: String
      image: String
    }
    type ProductsResult {
      products: [Product!]!
      totalProducts: Int
      totalPages: Int
    }
  `,
  Query: `
    getAllProducts(page: Int, limit: Int): ProductsResult
    getProductsById(_id: String): Product!
    searchProductsBySku(sku: String): Product!
  `,
  Mutation: `
    createProduct(sku: String, title: String, image: String): Product!
    updateProduct(_id: String!, sku: String, title: String, image: String): Product!
    deleteProduct(_id: String!): Product
  `
}

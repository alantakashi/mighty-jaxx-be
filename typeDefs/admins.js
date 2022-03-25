module.exports = {
  Type: `
    type Admin {
      _id: String
      email: String
      password: String
      status: String
    }

    type AdminsResult {
      admins: [Admin!]!
      totalAdmins: Int
      totalPages: Int
    }

    type Login {
      token: String!
      admin: Admin
    }

    input AdminInfo {
      email: String
      password: String      
      status: String
    }
  `,
  Query: `
    getAllAdmins(page: Int, limit: Int): AdminsResult!
  `,
  Mutation: `
    login(email: String!, password: String!): Login
  `
}

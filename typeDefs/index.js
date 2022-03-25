const { readdirSync } = require('fs')
const { gql } = require('apollo-server')

// load types
let Type = ''
let Query = ''
let Subscription = ''
let Mutation = ''

readdirSync(__dirname).filter(file => file.indexOf('.') !== 0 && file !== 'index.js').forEach(file => {
  const types = require(`./${file}`)

  if (types.Query) {
    Query += `
      ${types.Query}
    `
  }

  if (types.Subscription) {
    Subscription += `
      ${types.Subscription}
    `
  }

  if (types.Mutation) {
    Mutation += `
      ${types.Mutation}
    `
  }

  if (types.Type) {
    Type += `
      ${types.Type}
    `
  }
})

module.exports = gql`
  scalar JSON
  scalar JSONObject
  scalar Date
  ${
    Query.trim() !== ''
    ? `type Query {
      ${Query}
    }` : ''
  }
  ${
    Subscription.trim() !== ''
    ? `type Subscription {
      ${Subscription}
    }` : ''
  }
  ${
    Mutation.trim() !== ''
    ? `type Mutation {
      ${Mutation}
    }` : ''
  }
  type File {
    filename: String!
    mimetype: String
    encoding: String
  }
  ${Type}
`

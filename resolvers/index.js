import { readdirSync } from 'fs'
import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json')
let resolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value) // value from the client
    },
    serialize(value) {
      return value.getTime() // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value) // ast value is always in string format
      }
      return null
    },
  }),
}

readdirSync(__dirname).filter(file => file.indexOf('.') !== 0 && file !== 'index.js').forEach(file => {
  const resolver = require(`./${file}`)
  Object.keys(resolver).forEach(type => {
    resolvers[type] = resolvers[type] || {}
    resolvers = {
      ...resolvers,
      [type]: {
        ...resolvers[type],
        ...resolver[type]
      }
    }
  })
})

module.exports = resolvers

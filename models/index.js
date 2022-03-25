const { readdirSync } = require('fs')
let models = {}

readdirSync(__dirname).filter(file => file.indexOf('.') !== 0 && file !== 'index.js').forEach(file => {
  models[file.split('.')[0]] = require(`./${file}`)
})

module.exports = models

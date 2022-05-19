const MongoMultitenant = require('../../../dist')
const UserSchema = require('./schemas')

module.exports = new MongoMultitenant({
  mongoURI: 'mongodb://root:root@localhost:27017',
  prefixDatabaseName: 'tenant',
  models: [
    { name: 'users', schema: UserSchema }
  ]
})

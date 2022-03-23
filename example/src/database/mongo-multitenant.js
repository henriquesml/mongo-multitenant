const MongoMultitenant = require('../../../dist')
const { UserSchema } = require('./schemas')

module.exports = MongoMultitenant.settings({
  mongoURI: 'mongodb://root:root@localhost:27017',
  prefixDatabaseName: 'tenant',
  models: [
    { name: 'users', schema: UserSchema }
  ]
})

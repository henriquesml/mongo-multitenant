const { Schema } = require('mongoose')

const UserSchema = new Schema({
  name: { type: String, index: true },
  email: { type: String }
})

module.exports = UserSchema

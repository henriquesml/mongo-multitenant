const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  email: String
})

module.exports = { userSchema }

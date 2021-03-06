const mongo = require('./database/mongo-multitenant')

const express = require('express')
const cors = require('cors')

const app = express()
const routes = express.Router()

app.use(cors())
app.use(express.json())

routes.post('/users', async (req, res) => {
  const UserModel = mongo.tenant('1').model('users')
  const user = await UserModel.create({ name: 'Henrique Schmeller', email: 'henrique_schmeller@hotmail.com'})
  return res.json(user)
})

routes.get('/users', async (req, res) => {
  const UserModel = mongo.tenant('1').model('users')
  const users = await UserModel.find()
  return res.json(users)
})

app.use(routes)

app.listen(3333)

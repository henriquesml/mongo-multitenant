const mongoMultitenant = require('../../dist/main.js')

const express = require('express')
const cors = require('cors')

const app = express()
const routes = express.Router()

app.use(cors())
app.use(express.json())

routes.post('/users', (req, res) => {
  const UserModel = mongoMultitenant({ tenantId: '1', modelName: 'users' })
  UserModel.create({ name: 'Henrique Schmeller', email: 'henrique_schmeller@hotmail.com'})
})

routes.get('/users', (req, res) => {
  const UserModel = mongoMultitenant({ tenantId: '1', modelName: 'users' })
  UserModel.find()
})

app.use(routes)

app.listen(3333)

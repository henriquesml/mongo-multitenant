import { Schema } from 'mongoose'
import faker from 'faker'
import mongoMultitenant from './main'

jest.mock('./get-config')
const getConfig = require('./get-config').getConfig

describe('mongoMultitenant', () => {
  test('Should return the model', async () => {
    const modelName = faker.name.firstName()
    const tenantId = faker.name.firstName()

    const schema = new Schema({
      [faker.database.column()]: { type: String }
    })

    getConfig.mockImplementation(() => {
      return {
        mongoURI: process.env.MONGODB_URI,
        models: [{ name: modelName, schema }]
      }
    })

    const model = mongoMultitenant({ modelName, tenantId })
    expect(model.schema).toEqual(schema)
  })
})

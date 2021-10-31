import { Schema } from 'mongoose'
import faker from 'faker'
import { tenantConnection } from '../tenant-connection'
import { getModel } from './get-model'

describe('Method getModel', () => {
  test('Should return the model', async () => {
    const schema = new Schema({
      [faker.database.column()]: { type: String }
    })
    const modelName = faker.name.firstName()
    const tenantId = faker.name.firstName()
    const connection = () =>
      tenantConnection({
        uri: String(process.env.MONGODB_URI),
        tenantId,
        modelsAndSchemas: [{ model: modelName, schema }]
      })

    const model = getModel({ connection, modelName, tenantId })
    expect(model.schema).toEqual(schema)
  })
})

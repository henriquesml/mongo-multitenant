import mongoose, { Schema } from 'mongoose'
import faker from 'faker'
import { tenantConnection } from './tenant-connection'

describe('Method tenantConnection', () => {
  test('Should return a mongodb connection', async () => {
    const schema = new Schema({
      [faker.database.column()]: { type: String }
    })

    const connection = tenantConnection({
      uri: String(process.env.MONGODB_URI),
      tenantId: faker.name.firstName(),
      modelsAndSchemas: [{ model: faker.name.firstName(), schema }]
    })
    expect(connection).toBeInstanceOf(mongoose.Connection)
  })

  test('Should return a throw', async () => {
    expect(() =>
      tenantConnection({
        uri: faker.internet.url(),
        tenantId: faker.name.firstName(),
        modelsAndSchemas: []
      })
    ).toThrow(new Error('Mongoose connection error.'))
  })
})
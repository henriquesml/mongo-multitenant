import mongoose, { Schema } from 'mongoose'
import faker from 'faker'
import { tenantConnection } from './tenant-connection'

jest.mock('../get-config')
const getConfig = require('../get-config').getConfig

describe('Method tenantConnection', () => {
  test('Should return a mongodb connection', async () => {
    const schema = new Schema({
      [faker.database.column()]: { type: String }
    })

    getConfig.mockImplementation(() => {
      return {
        mongoURI: process.env.MONGODB_URI,
        models: [{ model: faker.name.firstName(), schema }]
      }
    })

    const connection = tenantConnection({
      tenantId: faker.name.firstName()
    })
    expect(connection).toBeInstanceOf(mongoose.Connection)
  })

  test('Should return a throw', async () => {
    getConfig.mockImplementation(() => {
      return {
        mongoURI: faker.internet.url()
      }
    })

    expect(() =>
      tenantConnection({
        tenantId: faker.name.firstName()
      })
    ).toThrow(new Error('Mongoose connection error.'))
  })
})
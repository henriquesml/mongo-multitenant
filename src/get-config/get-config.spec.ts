import path from 'path'
import faker from 'faker'
import fs from 'fs'
import { getConfig } from './get-config'
import { Schema } from 'mongoose'

describe('Method getConfig', () => {
  beforeEach(() => {
    fs.writeFileSync(path.resolve(process.cwd(), 'mongo-multitenant.js'), '')
    jest.resetModules()
  })

  afterEach(() => {
    fs.unlinkSync(path.resolve(process.cwd(), 'mongo-multitenant.js'))
  })

  test('Should return a config object', async () => {
    const mockConfig = {
      mongoURI: faker.internet.url(),
      models: [{ model: faker.name.firstName(), schema: new Schema({
        [faker.database.column()]: { type: String }
      }) }]
    }
    jest.doMock(path.resolve(process.cwd(), 'mongo-multitenant.js'), () => {
      return mockConfig
    })

    expect(getConfig()).toEqual(mockConfig)
  })

  test('Should return a throw when mongoURI is null', async () => {
    jest.doMock(path.resolve(process.cwd(), 'mongo-multitenant.js'), () => {
      return {}
    })

    expect(() => getConfig()).toThrow(new Error('The mongoURI key must be filled in mongo-multitenant.js'))
  })
})
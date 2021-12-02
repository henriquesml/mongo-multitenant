import path from 'path'
import faker from 'faker'
import fs from 'fs'
import { getConfig } from './get-config'
import { Schema } from 'mongoose'

describe('Method getConfig', () => {
  beforeEach(() => {
    fs.writeFileSync(path.resolve(process.cwd(), 'multitenant.config.js'), '')
    jest.resetModules()
  })

  afterEach(() => {
    fs.unlinkSync(path.resolve(process.cwd(), 'multitenant.config.js'))
  })

  test('Should return a config object', async () => {
    const mockConfig = {
      prefixDatabaseName: faker.name.title(),
      mongoURI: faker.internet.url(),
      models: [{ name: faker.name.firstName(), schema: new Schema({
        [faker.database.column()]: { type: String }
      }) }]
    }
    jest.doMock(path.resolve(process.cwd(), 'multitenant.config.js'), () => {
      return mockConfig
    })

    expect(getConfig()).toEqual(mockConfig)
  })

  test('Should return a throw when mongoURI is null', async () => {
    jest.doMock(path.resolve(process.cwd(), 'multitenant.config.js'), () => {
      return {}
    })

    expect(() => getConfig()).toThrow(new Error('The mongoURI key must be filled in multitenant.config.js'))
  })

  test('Should return a throw when models is null', async () => {
    jest.doMock(path.resolve(process.cwd(), 'multitenant.config.js'), () => {
      return {
        mongoURI: faker.internet.url()
      }
    })

    expect(() => getConfig()).toThrow(new Error('The models key must be filled in multitenant.config.js'))
  })
})
import mongoose from 'mongoose'
import { createConnection } from './create-connection'

describe('Method createConnection', () => {
  test('Should return a mongoose connection', async () => {
    const connection = createConnection({ uri: String(process.env.MONGODB_URI) })
    expect(connection).toBeInstanceOf(mongoose.Connection)
  })
})

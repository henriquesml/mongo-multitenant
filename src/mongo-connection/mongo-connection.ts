import mongoose, { Connection } from "mongoose"
import { ConnectionProps } from './mongo-connection-props'

export class MongoConnection {
  private connection: Connection
  private static instance: MongoConnection

  private constructor({ uri, options, logs }: ConnectionProps) {
    logs && console.log('[mongo-multitenant][info] - Trying to create a connection with mongoose.')
    const connection = mongoose.createConnection(uri, options)
    connection.on('open', () => {
      logs && console.log(`[mongo-multitenant][info] - Mongoose connection open to ${uri}.`)
    })
    connection.on('error', err => {
      logs && console.log(`[mongo-multitenant][error] - Mongoose failed to trying open a connection to ${uri}.`)
      logs && console.log(`[mongo-multitenant][error] - ${err}`)
      throw new Error('Mongoose connection error.')
    })
    this.connection = connection
  }

  public static get({ uri, options, logs }: ConnectionProps): Connection {
    if (!MongoConnection.instance) {
      MongoConnection.instance = new MongoConnection({ uri, options, logs }) 
    }
    return MongoConnection.instance.connection
  }
}

import mongoose, { Connection } from "mongoose"
import { ConnectionProps } from './mongo-connection-props'

export class MongoConnection {
  private connection: Connection
  private static instance: MongoConnection

  private constructor({ uri, options }: ConnectionProps) { 
    const connection = mongoose.createConnection(uri, options)
    connection.on('open', () => {
      console.log(`Mongoose connection open to ${uri}`)
    })
    connection.on('error', err => {
      console.log(`Mongoose connection error: ${err} with connection info ${uri}`)
    })
    this.connection = connection
  }

  public static get({ uri, options }: ConnectionProps): Connection {
    if (!MongoConnection.instance) {
      MongoConnection.instance = new MongoConnection({ uri, options }) 
    }
    return MongoConnection.instance.connection
  }
}

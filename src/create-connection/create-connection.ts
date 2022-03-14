import mongoose from 'mongoose'
import { getConfig } from '../get-config'
import { CreateConnectionResponse } from './create-connection.props'

const createConnection = (): CreateConnectionResponse => {
  const config = getConfig()
  
  const connection = mongoose.createConnection(config.mongoURI, config.connectOptions)
  connection.on('open', () => {
    console.log(`Mongoose connection open to ${config.mongoURI}`)
  })
  connection.on('error', err => {
    console.log(`Mongoose connection error: ${err} with connection info ${config.mongoURI}`)
    process.exit(0)
  })
  return connection
}

export default createConnection()

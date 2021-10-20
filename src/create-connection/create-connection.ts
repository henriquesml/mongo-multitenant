import mongoose from 'mongoose'
import { CreateConnectionProps, CreateConnectionResponse } from './create-connection.props'

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000
}

export const createConnection = ({ uri }: CreateConnectionProps): CreateConnectionResponse => {
  const connection = mongoose.createConnection(uri, mongoOptions)
  return connection
}

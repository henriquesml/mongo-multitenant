import path from 'path'
import { GetConfigResponse } from './get-config.props'

export function getConfig(): GetConfigResponse {
  try {
    const config = require(path.resolve(process.cwd(), 'mongo-multitenant.js'))

    if (!config.mongoURI) {
      throw new Error('The mongoURI key must be filled in mongo-multitenant.js')
    }
    return config
  } catch (error) {
    throw error 
  }
}
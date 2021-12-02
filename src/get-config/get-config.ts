import path from 'path'
import { GetConfigResponse } from './get-config.props'

const DEFAULT_CONFIG = {
  prefixDatabaseName: 'tenant'
}

export function getConfig(): GetConfigResponse {
  try {
    const config = require(path.resolve(process.cwd(), 'multitenant.config.js'))

    if (!config.mongoURI) {
      throw new Error('The mongoURI key must be filled in multitenant.config.js')
    }

    if (!(Array.isArray(config.models) && config.models.length)) {
      throw new Error('The models key must be filled in multitenant.config.js')
    }
  
    return { ...DEFAULT_CONFIG, ...config }
  } catch (error) {
    throw error 
  }
}
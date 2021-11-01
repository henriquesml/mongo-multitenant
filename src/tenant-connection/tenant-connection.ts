import { createConnection } from '../create-connection'
import { getConfig } from '../get-config'
import {
  TenantConnectionParams,
  TenantConnectionResponse
} from './tenant-connection.props'

export function tenantConnection({
  tenantId
}: TenantConnectionParams): TenantConnectionResponse {
  try {
    const config = getConfig()
    const dbName = `${config.databaseInitialName}_${tenantId}`
    const mongodb = createConnection({ uri: config.mongoURI })
  
    if (mongodb.readyState !== 0) {
      const db = mongodb.useDb(dbName, { useCache: true })
      console.info(`DB switched to ${dbName}`)
      config.models.map(modelConfig => db.model(modelConfig.model, modelConfig.schema))
      return db
    }
    throw new Error('Mongoose connection error.')
  } catch (error) {
    throw error
  }
}

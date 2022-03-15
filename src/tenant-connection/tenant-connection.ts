import { getConfig } from '../get-config'
import { connection } from '../create-connection'
import {
  TenantConnectionParams,
  TenantConnectionResponse
} from './tenant-connection.props'

export function tenantConnection({
  tenantId
}: TenantConnectionParams): TenantConnectionResponse {
  const config = getConfig()
  const dbName = `${config.prefixDatabaseName}_${tenantId}`
  
  if (connection.readyState !== 0) {
    const db = connection.useDb(dbName, { useCache: true })
    config.models.map(modelConfig => db.model(modelConfig.name, modelConfig.schema)) // Exectar somente 1 vez, em um singleton
    return db
  }
  throw new Error('Mongoose connection error.')
}

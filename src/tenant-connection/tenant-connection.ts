import { createConnection } from '../create-connection'
import {
  TenantConnectionParams,
  TenantConnectionResponse
} from './tenant-connection.props'

export function tenantConnection({
  uri,
  tenantId,
  modelsAndSchemas
}: TenantConnectionParams): TenantConnectionResponse {
  const dbName = `tenant_${tenantId}`
  const mongodb = createConnection({ uri })

  if (mongodb.readyState !== 0) {
    const db = mongodb.useDb(dbName, { useCache: true })
    console.info(`DB switched to ${dbName}`)
    modelsAndSchemas.map(modelAndSchema => db.model(modelAndSchema.model, modelAndSchema.schema))
    return db
  }
  throw new Error('Mongoose connection error.')
}

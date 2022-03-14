import { Connection } from 'mongoose'

export type TenantConnectionParams = {
  tenantId: string
}

export type TenantConnectionResponse = Connection

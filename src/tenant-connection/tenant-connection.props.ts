import mongoose from 'mongoose'

export type TenantConnectionParams = {
  tenantId: string
}

export type TenantConnectionResponse = mongoose.Connection

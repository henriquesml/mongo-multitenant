import mongoose, { Schema } from 'mongoose'

export type TenantConnectionParams = {
  uri: string
  tenantId: string
  modelsAndSchemas: Array<{
    model: string
    schema: Schema
  }>
}

export type TenantConnectionResponse = mongoose.Connection

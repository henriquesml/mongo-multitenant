import mongoose from 'mongoose'
import { TenantConnectionResponse } from '../tenant-connection'

type ConnectionProps = {
  tenantId: string
}

export type GetModelProps = {
  tenantId: string
  connection: ({ tenantId }: ConnectionProps) => TenantConnectionResponse
  modelName: string
}

export type GetModelResponse<T> = mongoose.Model<T>

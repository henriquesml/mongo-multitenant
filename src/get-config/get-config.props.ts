import { Schema, ConnectOptions } from 'mongoose'

export type GetConfigResponse = {
  mongoURI: string
  connectOptions: ConnectOptions
  prefixDatabaseName: string
  models: Array<{
    name: string
    schema: Schema
  }>
}

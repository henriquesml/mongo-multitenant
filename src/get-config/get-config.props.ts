import { Schema } from 'mongoose'

export type GetConfigResponse = {
  mongoURI: string
  prefixDatabaseName: string
  models: Array<{
    name: string
    schema: Schema
  }>
}

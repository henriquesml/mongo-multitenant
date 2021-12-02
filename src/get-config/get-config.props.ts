import { Schema } from 'mongoose'

export type GetConfigResponse = {
  mongoURI: string
  prefixDatabaseName: string
  models: Array<{
    model: string
    schema: Schema
  }>
}

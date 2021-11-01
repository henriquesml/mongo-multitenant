import { Schema } from 'mongoose'

export type GetConfigResponse = {
  mongoURI: string
  databaseInitialName: string
  models: Array<{
    model: string
    schema: Schema
  }>
}

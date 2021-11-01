import { Schema } from 'mongoose'

export type GetConfigResponse = {
  mongoURI: string
  models: Array<{
    model: string
    schema: Schema
  }>
}

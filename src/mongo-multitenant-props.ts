import { Connection, ConnectOptions, Schema } from "mongoose"

export type SettingsProps = {
  mongoURI: string
  prefixDatabaseName?: string
  logs?: boolean
  connectOptions?: ConnectOptions
  models: Array<{
    name: string
    schema: Schema
  }>
}

export type ConnectionProps = Connection


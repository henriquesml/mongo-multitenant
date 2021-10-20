import mongoose from 'mongoose'

export type CreateConnectionProps = {
  uri: string
}

export type CreateConnectionResponse = mongoose.Connection

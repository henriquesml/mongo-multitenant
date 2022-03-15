import mongoose from 'mongoose'

export type MongoMultitenantProps = {
  tenantId: string
  modelName: string
}

export type MongoMultitenantResponse<T> = mongoose.Model<T>

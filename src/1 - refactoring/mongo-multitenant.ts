import mongoose, { ConnectOptions, Schema, Connection } from "mongoose"

type SettingsProps = {
  mongoURI: string
  prefixDatabaseName?: string
  connectOptions?: ConnectOptions
  models: Array<{
    name: string
    schema: Schema
  }>
}

type GetModelProps = { tenantId: string, modelName: string }

export class MongoMultitenant {
  private settings: SettingsProps
  private connection: Connection
  private static instance: MongoMultitenant

  private constructor(settings: SettingsProps) { 
    this.settings = settings
    this.connection = MongoMultitenant.instance.createConnection()
  }

  public static settings(settings: SettingsProps): MongoMultitenant {
    const DEFAULT_CONFIGS = {
      prefixDatabaseName: 'tenant',  
    }

    if (!MongoMultitenant.instance) {
      MongoMultitenant.instance = new MongoMultitenant({ 
        ...DEFAULT_CONFIGS,
        ...settings
      }) 
    }
    return MongoMultitenant.instance
  }

  private createConnection() {
    const connection = mongoose.createConnection(this.settings.mongoURI, this.settings.connectOptions)
    connection.on('open', () => {
      console.log(`Mongoose connection open to ${this.settings.mongoURI}`)
    })
    connection.on('error', err => {
      console.log(`Mongoose connection error: ${err} with connection info ${this.settings.mongoURI}`)
      process.exit(0)
    })
    return connection
  }
  getModel<T>({ tenantId, modelName }: GetModelProps) {
    const dbName = `${this.settings.prefixDatabaseName}_${tenantId}`
    if (this.connection.readyState !== 0) {
      const db = this.connection.useDb(dbName, { useCache: true })
      this.settings.models.map(modelConfig => db.model(modelConfig.name, modelConfig.schema)) // Exectar somente 1 vez, em um singleton
      return db.model<T>(modelName)
    }
    throw new Error('Mongoose connection error.')
  }
}


const a = MongoMultitenant.settings({
  mongoURI: '',
  prefixDatabaseName: 'tenant',
  models: [{ name: 'test', schema: new Schema({ test: { type: String } }) }],
})

a.getModel({ tenantId: '1', modelName: 'test' })
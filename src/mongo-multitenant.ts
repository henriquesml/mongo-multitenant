import { MongoConnection } from './mongo-connection'
import { GetModelProps, SettingsProps, ConnectionProps } from './mongo-multitenant-props'

const DEFAULT_CONFIGS = {
  prefixDatabaseName: 'tenant'
}

export default class MongoMultitenant {
  private settings: SettingsProps
  private connection: ConnectionProps

  private constructor(settings: SettingsProps) { 
    this.settings = settings
    this.connection = MongoConnection.get({ uri: settings.mongoURI, options: settings.connectOptions })
  }

  public static settings(settings: SettingsProps): MongoMultitenant {
    return new MongoMultitenant({ 
      ...DEFAULT_CONFIGS,
      ...settings
    }) 
  }

  getModel<T>({ tenantId, modelName }: GetModelProps) {
    const dbName = `${this.settings.prefixDatabaseName}_${tenantId}`
    if (this.connection.readyState === 1) {
      const db = this.connection.useDb(dbName, { useCache: true })
      this.settings.models.map(modelConfig => db.model(modelConfig.name, modelConfig.schema))
      return db.model<T>(modelName)
    }
    throw new Error('Mongoose connection error.')
  }
}

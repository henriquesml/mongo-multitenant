import { MongoConnection } from './mongo-connection'
import { SettingsProps, ConnectionProps } from './mongo-multitenant-props'

const DEFAULT_CONFIGS = {
  prefixDatabaseName: 'tenant'
}

export default class MongoMultitenant {
  private settings: SettingsProps
  private connection: ConnectionProps
  private tenantDb: ConnectionProps

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

  tenant(tenantId: string) {
    const dbName = `${this.settings.prefixDatabaseName}_${tenantId}`
    if (this.connection.readyState !== 0) {
      const tenantDb = this.connection.useDb(dbName, { useCache: true })
      console.info(`DB switched to ${dbName}`)
      this.settings.models.map(modelConfig => tenantDb.model(modelConfig.name, modelConfig.schema))
      this.tenantDb = tenantDb
      return this
    }
    throw new Error('Mongoose connection error.')
  }

  model<T>(name: string) {
    const tenantDb = this.tenantDb
    return tenantDb.model<T>(name)
  }
}

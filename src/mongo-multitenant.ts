import { MongoConnection } from './mongo-connection'
import { SettingsProps, ConnectionProps } from './mongo-multitenant-props'

const CONNECTED = 1
const CONNECTING = 2

const DEFAULT_CONFIGS = {
  prefixDatabaseName: 'tenant',
  logs: true
}

const CONNECTION_STATES = {
  0: 'Disconnected',
  1: 'Connected',
  2: 'Connecting',
  3: 'Disconnecting',
  99: 'Uninitialized'
}

export default class MongoMultitenant {
  private settings: SettingsProps
  private connection: ConnectionProps
  private tenantDb: ConnectionProps

  private constructor(settings: SettingsProps) {
    const mergedSettings = { 
      ...DEFAULT_CONFIGS,
      ...settings
    }

    this.settings = mergedSettings
    this.connection = MongoConnection.get({
      uri: mergedSettings.mongoURI,
      options: mergedSettings.connectOptions,
      logs: mergedSettings.logs
    })
  }

  tenant(tenantId: string) {
    const dbName = `${this.settings.prefixDatabaseName}_${tenantId}`
    const readyState = this.connection.readyState
    this.settings.logs && console.info(`[mongo-multitenant][info] - Mongo connection status is ${CONNECTION_STATES[readyState]}.`)

    if ([CONNECTED, CONNECTING].includes(readyState)) {
      const tenantDb = this.connection.useDb(dbName, { useCache: true })
      this.settings.logs && console.info(`[mongo-multitenant][info] - Switched to database ${dbName}.`)
      const importedModelsTotal = Object.keys(tenantDb.models).length
      const modelsToBeImportedTotal = this.settings.models.length

      if (importedModelsTotal !== modelsToBeImportedTotal) {
        this.settings.logs && console.info(`[mongo-multitenant][info] - Registering ${modelsToBeImportedTotal} model(s) in mongodb.`)
        this.settings.models.map(model => tenantDb.model(model.name, model.schema))
      }
      
      this.tenantDb = tenantDb
      return this
    }

    this.settings.logs && console.error(`[mongo-multitenant][error] - Mongoose connection error`)
    throw new Error('Mongoose connection error.')
  }

  model<T>(name: string) {
    const tenantDb = this.tenantDb
    return tenantDb.model<T>(name)
  }
}

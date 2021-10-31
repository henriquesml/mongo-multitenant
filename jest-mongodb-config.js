module.exports = {
  mongodbMemoryServer: {
    version: 'latest'
  },
  mongodbMemoryServerOptions: {
    instance: {},
    binary: {
      version: '5.0.0',
      skipMD5: true
    },
    autoStart: false
  },
  mongoURLEnvName: 'MONGODB_URI'
}
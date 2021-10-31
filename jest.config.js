module.exports = {
  clearMocks: true,
  preset: "@shelf/jest-mongodb",
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  coverageDirectory: "coverage",
  collectCoverageFrom: ["!**/index.ts"],
  coverageProvider: "babel",
  transform: {
    ".+\\.ts$": "ts-jest"
  },
  watchPathIgnorePatterns: ['globalConfig.json']
}

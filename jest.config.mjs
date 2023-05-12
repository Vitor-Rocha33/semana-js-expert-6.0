const defaultConfig = {
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReports: ["text", "lcov"],
  coverageThreshold: {
    global: {
      branch: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  maxWorkers: "50%",
  watchPathIgnorePatterns: ["node_modules"],
  transformIgnorePatterns: ["node_modules"],
}

export default {
  projects: [
    {
      ...defaultConfig,
      testEnvironment: "node",
      displayName: "backend",
      collectionCoverageFrom: ["server/", "!server/index.js"],
      transformIgnorePatterns: [
        ...defaultConfig.transformIgnorePatterns,
        "public",
        'public/tests/unit/_util'
      ],
      testMatch: ["**/tests/**/server/**/*.test.js"],
    },
    {
      ...defaultConfig,
      testEnvironment: "jsdom",
      displayName: "frontend",
      collectionCoverageFrom: ["public/"],
      transformIgnorePatterns: [
        ...defaultConfig.transformIgnorePatterns,
        "server",
      ],
      testMatch: ["**/tests/**/public/**/*.test.js"],
    },
  ],
}

import { defaults } from 'jest-config'

const config = {
  rootDir: './',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'mts'],
  collectCoverage: false,
  collectCoverageFrom: [
    'packages/**/src/**/*.ts',
    '!**/examples/**',
    '!packages/cli/**',
    '!**/types/**',
    '!**/build/**',
    '!**/node_modules/**',
    '!packages/test-react-app/**',
    '!packages/test-utils/**',
  ],
  coverageReporters: ['json', 'text', 'lcov'],
  coverageDirectory: './coverage',
  coverageProvider: 'v8',
  testMatch: ['**/__tests__/**/*.test.ts'],
  automock: false,
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.m?tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: './packages/tsconfig.settings.json',
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts'],
  testEnvironment: 'node',
  verbose: true,
  setupFiles: ['<rootDir>/__tests__/setup.ts'],
}

export default config

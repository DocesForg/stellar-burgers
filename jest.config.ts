import type { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {}]
  },
  moduleNameMapper: {
    '@api': '<rootDir>/src/utils/burger-api.ts',
    '@auth': '<rootDir>/src/utils/auth.ts',
    '@slices': '<rootDir>/src/services/slices'
  }
};

export default config;

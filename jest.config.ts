import type { JestConfigWithTsJest } from 'ts-jest';
import type { Config } from 'jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  transform: {
    // '^.+\\.[tj]sx?$' для обработки файлов js/ts с помощью `ts-jest`
    // '^.+\\.m?[tj]sx?$' для обработки файлов js/ts/mjs/mts с помощью `ts-jest`
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // настройки для ts-jest
      }
    ]
  },
  coverageDirectory: 'coverage',

  coverageProvider: 'v8'
};

export default config;

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  bail: 1,
  verbose: true,
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testPathIgnorePatterns: ['<rootDir>/__tests__/type.test.ts'],
};

export default config;

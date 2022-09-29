import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '^(.*)\\.ts$': '$1',
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!aggregate-error|clean-stack|escape-string-regexp|indent-string|p-map)',
  ],
  verbose: false,

  preset: 'ts-jest',
};

export default config;

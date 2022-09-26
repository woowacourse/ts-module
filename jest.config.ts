import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'ts'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/__tests__/tsd'],
};

export default jestConfig;

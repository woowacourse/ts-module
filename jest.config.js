const config = {
  testPathIgnorePatterns: ['/node_modules/', '__tests__/type/'],
  transform: {
    '\\.ts$': [
      'ts-jest',
      {
        diagnostics: false,
      },
    ],
  },
};

module.exports = config;

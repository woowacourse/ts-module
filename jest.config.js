const config = {
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

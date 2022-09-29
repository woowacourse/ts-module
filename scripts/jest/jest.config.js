const jestDefaultConfig = {
  rootDir: ".",
  roots: ["<rootDir>/src"],
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
};

const web = {
  ...jestDefaultConfig,
  displayName: {
    name: "Web",
    color: "cyan",
  },
  testMatch: ["**/__tests__/**/*.(spec|test).ts?(x)"],
  testEnvironment: "jsdom",
};

module.exports = {
  collectCoverageFrom: [
    "**/**/*.{ts,tsx}",
    "!**/**/*.test.{ts,tsx}",
    "!**/src/types/**",
    "!**/node_modules/**",
    "!**/dist/**",
    "!**/__tests__/**",
  ],
  projects: [web],
};

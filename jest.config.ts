module.exports = {
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
  },
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testMatch: [
    "<rootDir>/**/*.test.(ts|tsx)",
    "<rootDir>/**/__tests__/*.(ts|tsx))",
  ],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};

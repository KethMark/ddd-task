/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
    "\\.[jt]sx?$": "babel-jest",
  },
  preset: "ts-jest",
  transformIgnorePatterns: [],
};
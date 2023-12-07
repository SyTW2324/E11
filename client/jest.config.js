/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios|node-fetch).+\\.js$"
  ],
  moduleNameMapper: {
    'node-fetch': 'jest-transform-stub',
    'axios': 'jest-transform-stub'
  },
};
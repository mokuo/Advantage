/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // ref: https://jestjs.io/ja/docs/configuration#modulenamemapper-objectstring-string--arraystring
  moduleNameMapper: {
    '#src(.*)': '<rootDir>/src/$1'
  }
};

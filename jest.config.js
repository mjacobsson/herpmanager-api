/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
process.env.IN_MEM_DB=true;
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node'
};

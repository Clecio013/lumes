const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Path to Next.js app
  dir: './',
})

/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '**/*.test.ts',
    '**/*.test.tsx',
  ],
  collectCoverageFrom: [
    'src/lib/analytics/**/*.{ts,tsx}',
    '!src/lib/analytics/**/*.d.ts',
    '!src/lib/analytics/**/*.test.{ts,tsx}',
  ],
}

module.exports = createJestConfig(customJestConfig)

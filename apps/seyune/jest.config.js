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
    'src/lib/@lumes/analytics/**/*.{ts,tsx}',
    '!src/lib/analytics/**/*.d.ts',
    '!src/lib/@lumes/analytics/**/*.d.ts',
    '!src/lib/analytics/**/*.test.{ts,tsx}',
    '!src/lib/@lumes/analytics/**/*.test.{ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  coverageReporters: ['text', 'html', 'lcov'],
  coverageDirectory: '<rootDir>/coverage',
}

module.exports = createJestConfig(customJestConfig)

// jest.config.cjs (or jest.config.js if you stay in CommonJS)
import nextJest from 'next/jest.js';

// Bootstraps Next.js' testing config
const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  // ----- Setup -----
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',

  // ----- Module Resolution -----
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // covers @/components, @/pages, etc.
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },

  // ----- Transforms -----
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  // Only necessary if you import ESM packages Jest can't handle natively
  // transformIgnorePatterns: ['/node_modules/(?!(next-auth|@babel/runtime)/)'],

  // ----- Test Discovery -----
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/cypress/',
  ],
  testMatch: ['**/__tests__/**/*.(test|spec).(js|jsx|ts|tsx)'],

  // ----- Coverage -----
  collectCoverage: true,
  collectCoverageFrom: [
    'components/**/*.{ts,tsx}',
    'hooks/**/*.{ts,tsx}',
    'src/**/*.{ts,tsx}',
    '!**/__tests__/**',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },

  // ----- Performance & Debugging -----
  testTimeout: 30000, // allow slower DOM tests
  maxWorkers: 1, // run in-band to reduce OOM
  maxConcurrency: 1,
  logHeapUsage: true,
};

export default createJestConfig(customJestConfig);

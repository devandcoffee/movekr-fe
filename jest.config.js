module.exports = {
  testTimeout: 20000,
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  coverageThreshold: {
    global: {
      statements: 10,
      branches: 0,
      functions: 10,
      lines: 10,
    },
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['/node_modules/', '/data/'],
  coverageReporters: ['lcov', 'text', 'html'],
  resetMocks: true,
};

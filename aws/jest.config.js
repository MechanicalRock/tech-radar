module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "/test/.*\\.(test|spec)?\\.(ts|tsx)$",
  testPathIgnorePatterns: ["/lib/", "/node_modules/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  coverageDirectory: "./.cover",
  collectCoverageFrom: ["**/src/**/*.{ts}"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};

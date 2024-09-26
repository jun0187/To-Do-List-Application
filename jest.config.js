module.exports = {
  preset: 'react-native',
  "setupFiles": [
    "<rootDir>/jest.setup.js"
  ],
  transformIgnorePatterns: [
  'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|rollbar-react-native|@fortawesome|@react-native|@react-navigation|react-redux|@react-native-async-storage/async-storage)',
  ],
  "collectCoverage": true,
  "coverageReporters": ["html", "text"],
  "coverageDirectory": "coverage"
};

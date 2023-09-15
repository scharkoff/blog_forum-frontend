module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es)'],
};

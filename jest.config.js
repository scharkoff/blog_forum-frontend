module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.css$': '<rootDir>/path/to/css-transformer.js',
  },
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es)'],
};

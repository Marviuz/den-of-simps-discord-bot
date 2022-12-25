module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-restricted-syntax': 'off',
    'max-len': 'off',
    'global-require': 'off',
    'import/no-dynamic-require': 'off',
    'no-bitwise': 'off',
    'no-param-reassign': 'off',
    'no-useless-return': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'no-return-await': 'off',
    'no-restricted-globals': 'off',
    radix: 'off',
  },
};

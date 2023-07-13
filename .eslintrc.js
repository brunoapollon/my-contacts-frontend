module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:react-hooks/recommended',
  ],
  overrides: [
  ],
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
    babelOptions: {
      plugins: [
        [
          '@babel/plugin-proposal-decorators',
          { legacy: true },
        ],
      ],
    },

  },
  plugins: [
    'react',
    'react-hooks',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'no-promise-executor-return': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'class-methods-use-this': 'off',
    'react/jsx-no-bind': 'off',
    'react/require-default-props': 'off',
    'no-empty': ['error', { allowEmptyCatch: true }],
  },
};

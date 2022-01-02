module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    '@react-native-community',
    'airbnb-base',
    'prettier',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'import'],
  rules: {
    'prettier/prettier': 2, // Means error
    'import/extensions': [0, 'never'],
    'import/no-unresolved': [0, 'never'],
    'import/prefer-default-export': 0,
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};

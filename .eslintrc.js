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
    'import/no-extraneous-dependencies': 0,
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@react-native-async-storage/async-storage',
            message: "Please use 'useStorage' instead!",
          },
          {
            name: '@moneyboy/contexts/styleContext',
            importNames: ['StyleContext'],
            message: "Please use 'useStyle' instead!",
          },
          {
            name: '@moneyboy/contexts/settingsContext',
            importNames: ['SettingsContext'],
            message: "Please use 'useSettings' instead!",
          },
          {
            name: '@moneyboy/contexts/authContext',
            importNames: ['AuthContext'],
            message: "Please use 'useAuth' instead!",
          },
        ],
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};

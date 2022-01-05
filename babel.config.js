module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@views': './src/views',
          '@api': './src/api',
          '@context': './src/context',
          '@pesca': './src/pesca',
          '@config': './src/config',
          '@util': './src/util',
          '@styles': './src/styles',
          '@hooks': './src/hooks',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};

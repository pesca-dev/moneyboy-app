import { StatusBar, StyleSheet } from 'react-native';

export const useContainerStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
  });

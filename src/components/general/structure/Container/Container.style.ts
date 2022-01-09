import { StatusBar, StyleSheet } from 'react-native';

export const useContainerStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
  });
};

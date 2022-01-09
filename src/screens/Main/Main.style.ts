import { StyleSheet } from 'react-native';
import variables from '@moneyboy/config/variables';

export const useMainStyles = () =>
  StyleSheet.create({
    scrollView: {
      flex: 1,
    },
    placeholder: {
      height: variables.display.placeholderTop.height,
    },
  });

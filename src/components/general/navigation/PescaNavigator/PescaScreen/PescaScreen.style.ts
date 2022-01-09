import { StyleSheet } from 'react-native';

export const usePescaScreenStyles = () => {
  return StyleSheet.create({
    screenWrapper: {
      flexDirection: 'row',
      width: '100%',
    },
    dummyWrapper: {
      width: '100%',
    },
    displayFlex: {
      display: 'flex',
    },
    displayNone: {
      display: 'none',
    },
    positionRelative: {
      position: 'relative',
    },
    positionAbsolute: {
      position: 'absolute',
    },
  });
};

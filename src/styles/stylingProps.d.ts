import { useColorScheme } from 'react-native';

export type Mode = ReturnType<typeof useColorScheme>;

export type StylingProps = {
  mode: Mode;
};

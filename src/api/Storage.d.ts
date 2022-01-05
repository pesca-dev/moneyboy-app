import { ColorSchemeName } from 'react-native';

export type StorageItems = {
  theme: ColorSchemeName;
  useSystemTheme: boolean;
};

export type StorageSetFunction = <T extends keyof StorageItems>(key: T, value: StorageItems[T]) => void;

export type StorageContextType = {
  storage: StorageItems;
  set: StorageSetFunction;
};

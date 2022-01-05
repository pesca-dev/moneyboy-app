import { StorageContextType, StorageItems, StorageSetFunction } from '@api/Storage';
import React, { createContext, FC, PropsWithChildren, useState } from 'react';

export const defaultStorage: StorageItems = {
  useSystemTheme: true,
  theme: 'light',
};

export const StorageContext = createContext<StorageContextType>({
  storage: defaultStorage,
  set: (_key, _value) => {
    //
  },
});

export const StorageContextProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [storage, setStorage] = useState<StorageItems>(defaultStorage);

  const set: StorageSetFunction = (key, value) => {
    setStorage(curStorage => {
      const newStorage = {
        ...curStorage,
      };
      newStorage[key] = value;
      return newStorage;
    });
  };

  return <StorageContext.Provider value={{ storage, set }}>{children}</StorageContext.Provider>;
};

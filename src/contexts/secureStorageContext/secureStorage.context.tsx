import {
  SecureStorageContextType,
  SecureStorageDeleteFunction,
  SecureStorageItems,
  SecureStorageSetFunction,
} from '@moneyboy/api/SecureStorage';
import React, { createContext, FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line no-restricted-imports
import EncryptedStorage from 'react-native-encrypted-storage';

// TODO lome: move to service directory
export const defaultStorage: SecureStorageItems = {
  token: undefined,
  access_token: undefined,
  refresh_token: undefined,
  user: undefined,
};

export const SecureStorageContext = createContext<SecureStorageContextType>({
  storage: defaultStorage,
  set: (_key, _value) => {
    //
  },
  delete: _key => {
    //
  },
});

export const SecureStorageContextProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [storage, setStorage] = useState<SecureStorageItems>(defaultStorage);

  // On intial mount, read storage Content
  useEffect(() => {
    const newStorage: SecureStorageItems = {};
    // read entire storage and update state after finishing
    Promise.all(
      Object.keys(defaultStorage).map(async key => {
        const itemKey: keyof SecureStorageItems = key as keyof SecureStorageItems;
        // try to get all items from storage
        try {
          const value = await EncryptedStorage.getItem(itemKey);
          newStorage[itemKey] = value ? JSON.parse(value) : defaultStorage[itemKey];
        } catch (reason) {
          // eslint-disable-next-line no-console
          console.error(reason);
          (newStorage[itemKey] as SecureStorageItems[keyof SecureStorageItems]) = defaultStorage[itemKey];
        }
      }),
    ).then(() => setStorage({ ...newStorage, finished: true }));
  }, []);

  const set: SecureStorageSetFunction = useCallback((key, value) => {
    // update state
    setStorage(curStorage => {
      const newStorage = {
        ...curStorage,
      };
      newStorage[key] = value;
      return newStorage;
    });
    // and set item in storage
    // eslint-disable-next-line no-console
    EncryptedStorage.setItem(key, JSON.stringify(value)).catch(console.error);
  }, []);

  const deleteFn: SecureStorageDeleteFunction = useCallback(key => {
    setStorage(curStorage => {
      const newStorage = {
        ...curStorage,
      };
      delete newStorage[key];
      return newStorage;
    });
    // eslint-disable-next-line no-console
    EncryptedStorage.removeItem(key).catch(console.log).catch(console.log);
  }, []);

  return (
    <SecureStorageContext.Provider value={{ storage, set, delete: deleteFn }}>{children}</SecureStorageContext.Provider>
  );
};

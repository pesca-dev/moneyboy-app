import { SecureStorageContextType, SecureStorageItems, SecureStorageSetFunction } from '@moneyboy/api/SecureStorage';
import React, { createContext, FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line no-restricted-imports
import EncryptedStorage from 'react-native-encrypted-storage';

// TODO lome: move to service directory
export const defaultStorage: SecureStorageItems = {
  token: undefined,
};

export const SecureStorageContext = createContext<SecureStorageContextType>({
  storage: defaultStorage,
  set: (_key, _value) => {
    //
  },
});

export const SecureStorageContextProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [storage, setStorage] = useState<SecureStorageItems>(defaultStorage);

  // On intial mount, read storage Content
  useEffect(() => {
    let key: keyof SecureStorageItems;
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (key in defaultStorage) {
      const itemKey = key;
      // try to get all items from storage
      EncryptedStorage.getItem(itemKey)
        .then(value => {
          // update storage-state
          setStorage(currentStorage => {
            const newStorage: SecureStorageItems = {
              ...currentStorage,
            };
            // use value from storage for state or use default one
            (newStorage[itemKey] as SecureStorageItems[keyof SecureStorageItems]) = value
              ? JSON.parse(value)
              : defaultStorage[itemKey];
            return newStorage;
          });
        })
        .catch(reason => {
          // eslint-disable-next-line no-console
          console.error(reason);
          // on error, set the default value as storage
          setStorage(currentStorage => {
            const newStorage: SecureStorageItems = {
              ...currentStorage,
            };
            (newStorage[itemKey] as SecureStorageItems[keyof SecureStorageItems]) = defaultStorage[itemKey];
            return newStorage;
          });
        });
    }
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

  return <SecureStorageContext.Provider value={{ storage, set }}>{children}</SecureStorageContext.Provider>;
};

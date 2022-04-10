import {
  SecureStorageBatchDeleteFunction,
  SecureStorageBatchSetFunction,
  SecureStorageContextType,
  SecureStorageItems,
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
  batchSet: _args => {
    //
  },
  batchDelete: _key => {
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

  const batchSet: SecureStorageBatchSetFunction = useCallback(items => {
    // update state
    setStorage(curStorage => {
      const newStorage = {
        ...curStorage,
      };
      // and set item in storage
      items.forEach(({ key, value }) => {
        newStorage[key] = value;
        // eslint-disable-next-line no-console
        EncryptedStorage.setItem(key, JSON.stringify(value)).catch(console.error);
      });
      return newStorage;
    });
  }, []);

  const batchDelete: SecureStorageBatchDeleteFunction = useCallback(keys => {
    setStorage(curStorage => {
      const newStorage = {
        ...curStorage,
      };
      keys.forEach(key => {
        delete newStorage[key];
        // eslint-disable-next-line no-console
        EncryptedStorage.removeItem(key).catch(console.log);
      });
      return newStorage;
    });
  }, []);

  return (
    <SecureStorageContext.Provider value={{ storage, batchSet, batchDelete }}>{children}</SecureStorageContext.Provider>
  );
};

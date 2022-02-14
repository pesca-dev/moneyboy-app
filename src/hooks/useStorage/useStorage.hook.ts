import { StorageItems } from '@moneyboy/api/Storage';
import { StorageContext } from '@moneyboy/contexts/storageContext';
// eslint-disable-next-line no-restricted-imports
import { useCallback, useContext } from 'react';

type SetStorageFunction<T extends keyof StorageItems> = (val: StorageItems[T]) => void;

export function useStorage<T extends keyof StorageItems>(key: T): [StorageItems[T], SetStorageFunction<T>] {
  const { storage, set } = useContext(StorageContext);

  const setStorage: SetStorageFunction<T> = useCallback(
    val => {
      set(key, val);
    },
    [key, set],
  );

  return [storage[key], setStorage];
}

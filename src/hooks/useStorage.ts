import { StorageItems } from '@api/Storage';
import { StorageContext } from '@context/StorageContext';
import { useContext } from 'react';

type SetStorageFunction<T extends keyof StorageItems> = (val: StorageItems[T]) => void;

export function useStorage<T extends keyof StorageItems>(key: T): [StorageItems[T], SetStorageFunction<T>] {
  const { storage, set } = useContext(StorageContext);

  const setStorage: SetStorageFunction<T> = val => {
    set(key, val);
  };

  return [storage[key], setStorage];
}

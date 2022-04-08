/* eslint-disable no-restricted-imports */
import { SecureStorageItems } from '@moneyboy/api/SecureStorage';
import { SecureStorageContext } from '@moneyboy/contexts/secureStorageContext';
import { useCallback, useContext } from 'react';

type SetSecureStorageFunction<T extends keyof SecureStorageItems> = (val: SecureStorageItems[T]) => void;

export function useSecureStorage<T extends keyof SecureStorageItems>(
  key: T,
): [SecureStorageItems[T], SetSecureStorageFunction<T>] {
  const { storage, set } = useContext(SecureStorageContext);

  const setStorage: SetSecureStorageFunction<T> = useCallback(
    val => {
      set(key, val);
    },
    [key, set],
  );

  return [storage[key], setStorage];
}

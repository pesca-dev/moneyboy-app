/* eslint-disable no-restricted-imports */
import { SecureStorageItems } from '@moneyboy/api/SecureStorage';
import { SecureStorageContext } from '@moneyboy/contexts/secureStorageContext';
import { useCallback, useContext } from 'react';

type SetSecureStorageFunction<T extends keyof SecureStorageItems> = (val: SecureStorageItems[T]) => void;
type DeleteSecureStorageFunction = () => void;

export function useSecureStorage<T extends keyof SecureStorageItems>(
  key: T,
): [SecureStorageItems[T], SetSecureStorageFunction<T>, DeleteSecureStorageFunction] {
  const { storage, set, delete: deleteFn } = useContext(SecureStorageContext);

  const setStorage: SetSecureStorageFunction<T> = useCallback(
    val => {
      set(key, val);
    },
    [key, set],
  );

  const deleteStorage: DeleteSecureStorageFunction = useCallback(() => deleteFn(key), [key, deleteFn]);

  return [storage[key], setStorage, deleteStorage];
}

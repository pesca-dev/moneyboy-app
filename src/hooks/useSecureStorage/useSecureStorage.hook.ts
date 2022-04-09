/* eslint-disable no-restricted-imports */
import { SecureStorageItems } from '@moneyboy/api/SecureStorage';
import { SecureStorageContext } from '@moneyboy/contexts/secureStorageContext';
import { useContext } from 'react';

type SetSecureStorageFunction<T extends keyof SecureStorageItems> = (val: SecureStorageItems[T]) => void;
type DeleteSecureStorageFunction = () => void;

type GetSecureStorageItemFunction = <T extends keyof SecureStorageItems>(
  key: T,
) => [SecureStorageItems[T], SetSecureStorageFunction<T>, DeleteSecureStorageFunction];

type BatchSetSecureStorageFunction<T extends keyof SecureStorageItems> = (
  items: {
    key: T;
    value: SecureStorageItems[T];
  }[],
) => void;

type BatchDeleteSecureStorageFunction<T extends keyof SecureStorageItems> = (keys: T[]) => void;

export function useSecureStorage(): [
  GetSecureStorageItemFunction,
  BatchSetSecureStorageFunction<keyof Omit<SecureStorageItems, 'finished'>>,
  BatchDeleteSecureStorageFunction<keyof Omit<SecureStorageItems, 'finished'>>,
] {
  const { storage, batchSet, batchDelete } = useContext(SecureStorageContext);

  function getItem<T extends keyof SecureStorageItems>(
    key: T,
  ): [SecureStorageItems[T], SetSecureStorageFunction<T>, DeleteSecureStorageFunction] {
    const setStorage: SetSecureStorageFunction<T> = val => {
      batchSet([{ key, value: val }]);
    };

    const deleteStorage: DeleteSecureStorageFunction = () => batchDelete([key]);
    return [storage[key], setStorage, deleteStorage];
  }
  return [getItem, batchSet, batchDelete];
}

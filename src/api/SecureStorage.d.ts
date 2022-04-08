export type SecureStorageItems = {
  token?: string;
};

export type SecureStorageSetFunction = <T extends keyof SecureStorageItems>(
  key: T,
  value: SecureStorageItems[T],
) => void;

export type SecureStorageContextType = {
  storage: SecureStorageItems;
  set: SecureStorageSetFunction;
};

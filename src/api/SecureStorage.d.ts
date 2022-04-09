export type SecureStorageItems = {
  token?: string;
  access_token?: string;
  refresh_token?: string;
  user?: Pesca.UserProfileInformation;
  finished?: boolean;
};

export type SecureStorageSetFunction = <T extends keyof SecureStorageItems>(
  key: T,
  value: SecureStorageItems[T],
) => void;

export type SecureStorageDeleteFunction = <T extends keyof SecureStorageItems>(key: T) => void;

export type SecureStorageContextType = {
  storage: SecureStorageItems;
  set: SecureStorageSetFunction;
  delete: SecureStorageDeleteFunction;
};

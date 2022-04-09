export type SecureStorageItems = {
  token?: string;
  access_token?: string;
  refresh_token?: string;
  user?: Pesca.UserProfileInformation;
  finished?: boolean;
};

export type SecureStorageBatchSetFunction = <T extends keyof SecureStorageItems>(
  items: {
    key: T;
    value: SecureStorageItems[T];
  }[],
) => void;

export type SecureStorageBatchDeleteFunction = <T extends keyof SecureStorageItems>(keys: T[]) => void;

export type SecureStorageContextType = {
  storage: SecureStorageItems;
  batchSet: SecureStorageBatchSetFunction;
  batchDelete: SecureStorageBatchDeleteFunction;
};

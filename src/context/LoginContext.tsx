import { AuthData } from '@api/AuthData';
import { UserData } from '@api/UserData';
import React, { PropsWithChildren, useState } from 'react';

type AuthContextType = {
  /**
   * Flag, if user is logged in.
   */
  loggedIn: boolean;
  /**
   * Object with all relevant user data.
   */
  user?: UserData;
  /**
   * Try to log in with the given data.
   * @param data AuthData to log in with
   */
  login(data: AuthData): void;
  logout(): void;
};

/**
 * Context to use for authentication purposes.
 */
export const AuthContext = React.createContext<AuthContextType>({
  loggedIn: false,
  login(_data) {},
  logout() {},
});

type AuthContextProviderProps = {};

type AuthContextState = {
  loggedIn: boolean;
  user?: UserData;
};

/**
 * Provider for the authentication context.
 */
export function AuthContextProvider({ children }: PropsWithChildren<AuthContextProviderProps>) {
  const [authContextState, setAuthContextState] = useState<AuthContextState>({ loggedIn: false });

  function login({ username, password }: AuthData) {
    if (!username.trim().length || !password.trim().length) {
      return;
    }

    setAuthContextState({
      ...authContextState,
      loggedIn: true,
      user: {
        id: '1337',
        username,
      },
    });
  }

  function logout() {
    setAuthContextState({
      ...authContextState,
      loggedIn: false,
      user: undefined,
    });
  }

  const authContextData: AuthContextType = {
    ...authContextState,
    login,
    logout,
  };

  return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
}

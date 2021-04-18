import React, { PropsWithChildren, useEffect, useState } from 'react';

import { AuthData } from '@api/AuthData';
import { UserData } from '@api/UserData';
import { ParseContext } from '@context/ParseContext';

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
  login(data: AuthData): Promise<MaybeError<boolean>>;
  /**
   * Log a user out.
   */
  logout(): void;
  /**
   * Try to register a new user.
   */
  register(): Promise<MaybeError<boolean>>;
};

/**
 * Context to use for authentication purposes.
 */
export const AuthContext = React.createContext<AuthContextType>({
  loggedIn: false,
  async login(_data) {
    return [true];
  },
  logout() {},
  async register() {
    return [true];
  },
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
  // Get the Parse Context
  const Parse = React.useContext(ParseContext);

  const [authContextState, setAuthContextState] = useState<AuthContextState>({ loggedIn: false });

  /**
   * Try to authenticate the current user, if it exists.
   */
  async function tryToAuthCurrentUser() {
    const currentUser = await Parse?.getUser();

    if (currentUser && currentUser.authenticated()) {
      setAuthContextState({
        ...authContextState,
        loggedIn: true,
        user: {
          id: currentUser.id,
          username: currentUser.getUsername() as string,
        },
      });
    }
  }

  // Try to auth the user on app start
  useEffect(() => {
    tryToAuthCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Try to log a user in. It will also try to authenticate the user.
   */
  async function login({ username, password }: AuthData): Promise<MaybeError<boolean>> {
    // We only want valid userdata
    if (!username.trim().length || !password.trim().length) {
      return [false];
    }

    // Try to log in
    const [success, message] = (await Parse?.login(username, password)) ?? [
      false,
      'Internal error while communicating with server',
    ];

    // On error, return
    if (!success) {
      return [success, message];
    }
    await tryToAuthCurrentUser();

    return [true];
  }

  async function register(): Promise<MaybeError<boolean>> {
    return [true];
  }

  /**
   * Log the current user out.
   */
  async function logout() {
    await Parse?.logout();

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
    register,
  };

  return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
}

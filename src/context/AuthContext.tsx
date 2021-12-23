import { AuthData } from '@api/AuthData';
import { PescaContext } from '@context/PescaContext';
import React, { PropsWithChildren, useEffect, useState } from 'react';

type AuthContextType = {
  /**
   * Flag, if user is logged in.
   */
  loggedIn: boolean;
  /**
   * Flag, if initial auth is ready (i.e. app is fully loaded)
   */
  ready: boolean;
  /**
   * Object with all relevant user data.
   */
  user?: Pesca.UserProfileInformation;
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
  register(data: Pesca.RegistrationPayload): Promise<MaybeError<boolean>>;
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
  ready: true,
});

type AuthContextProviderProps = {};

type AuthContextState = {
  ready: boolean;
  loggedIn: boolean;
  user?: Pesca.UserProfileInformation;
};

/**
 * Provider for the authentication context.
 */
export const AuthContextProvider: React.FC<PropsWithChildren<AuthContextProviderProps>> = ({ children }) => {
  const Pesca = React.useContext(PescaContext);

  const [authContextState, setAuthContextState] = useState<AuthContextState>({ loggedIn: false, ready: false });

  /**
   * Try to authenticate the current user, if it exists.
   */
  async function tryToAuthCurrentUser() {
    const currentUser = await Pesca?.getUser();

    if (currentUser) {
      setAuthContextState({
        ...authContextState,
        loggedIn: true,
        ready: true,
        user: currentUser,
      });
    } else {
      setAuthContextState({
        ...authContextState,
        ready: true,
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
    const [success, message] = (await Pesca?.login(username, password)) ?? [
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

  async function register(data: Pesca.RegistrationPayload): Promise<MaybeError<boolean>> {
    // Simply forward call
    return Pesca?.register(data) ?? [false, 'Internal error while communicating with server'];
  }

  /**
   * Log the current user out.
   */
  async function logout() {
    await Pesca?.logout();

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
};

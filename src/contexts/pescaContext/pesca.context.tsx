import { PescaClient } from '@moneyboy/api/PescaClient';
import { useSecureStorage } from '@moneyboy/hooks/useSecureStorage';
import deepEqual from 'deep-equal';
import React, { PropsWithChildren, useCallback, useEffect } from 'react';

export const PescaContext = React.createContext<PescaClient | undefined>(undefined);

type PescaContextProviderProps = unknown;

export const PescaContextProvider: React.FC<PropsWithChildren<PescaContextProviderProps>> = ({ children }) => {
  // const httpClient = useRef(new HttpClient('https://moneyboy.pesca.dev', constants, EncryptedStorage));
  const apiUrl = 'https://moneyboy.pesca.dev';
  const [useSecureItem, batchSetSecureItems, batchDeleteSecureItems] = useSecureStorage();
  const [accessToken, setAccessToken] = useSecureItem('access_token');
  const [refreshToken] = useSecureItem('refresh_token');
  const [user, setUser] = useSecureItem('user');
  const [finished] = useSecureItem('finished');

  const request = useCallback(
    async (url: RequestInfo, options?: RequestInit) => fetch(`${apiUrl}/${url}`, options).catch(() => null),
    [],
  );

  /**
   * Perform a request to the backend and refresh the access token, if needed.
   *
   * @param uri uri from the API to access
   * @param options request options (i.e. headers, body, method etc)
   * @returns the response
   */
  const requestWithAuth = useCallback(
    async (uri: RequestInfo, options: RequestInit) => {
      // get access token from storage and add it to header
      // eslint-disable-next-line no-param-reassign
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      };

      // perform request
      let res = await request(uri, options);
      if (res?.status === 401) {
        // if request is unauthorized, get refresh token from storage
        const payload: Pesca.RefreshAccessTokenPayload = {
          refresh_token: refreshToken ?? '',
        };
        // try to get a new access token
        const refResult = await fetch(`${apiUrl}/auth/refresh`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }).catch(() => null);
        if (refResult?.status === 201) {
          // if sucessful, store new access token in storage...
          const newAccessToken: Pesca.RefreshAccessTokenDTO = await refResult.json();
          setAccessToken(newAccessToken.access_token);
          // ...and perform request again
          // eslint-disable-next-line no-param-reassign
          options.headers = {
            ...options.headers,
            Authorization: `Bearer ${newAccessToken.access_token}`,
          };
          res = await request(uri, options);
        }
      }
      return res;
    },
    [request, accessToken, refreshToken, setAccessToken],
  );

  const login = useCallback(
    async (username: string, password: string): Promise<MaybeError<boolean>> => {
      const body = JSON.stringify({
        username,
        password,
      });
      const result = await request('auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body,
      });

      if (result?.status !== 201) {
        return [false, result?.status === 401 ? 'Invalid username/password' : 'Internal error'];
      }

      const tokens: Pesca.LoginReturnDTO = await result.json();
      batchSetSecureItems([
        { key: 'access_token', value: tokens.access_token },
        { key: 'refresh_token', value: tokens.refresh_token },
      ]);
      return [true];
    },
    [request, batchSetSecureItems],
  );

  const logout = useCallback(async (): Promise<void> => {
    await requestWithAuth('auth/logout', {
      method: 'DELETE',
    });
    batchDeleteSecureItems(['access_token', 'refresh_token', 'user']);
  }, [requestWithAuth, batchDeleteSecureItems]);

  const register = useCallback(
    async (data: Pesca.RegistrationPayload): Promise<MaybeError<boolean>> => {
      const payload: Pesca.RegistrationPayload = data;

      const result = await request('auth/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (result?.status === 202) {
        return [true];
      }

      return [false, (await result?.json())?.message ?? 'Error during registration'];
    },
    [request],
  );

  useEffect(() => {
    if (user || accessToken || refreshToken) {
      requestWithAuth('users/profile', {}).then(async result => {
        let newUser: Pesca.UserProfileInformation | undefined;
        if (result?.status === 200) {
          newUser = await result.json();
          // store current user in memory
          if (!deepEqual(newUser, user)) {
            setUser(newUser);
          }
        } else if (result?.status !== 401) {
          // if we have no connection or another error happens (but we are NOT unauthorized), we use cached user
          newUser = user;
        } else {
          // if we are unauthorized, we simply delete all stored data, so we leave nothing behind after a logout
          batchDeleteSecureItems(['access_token', 'refresh_token', 'user']);
        }
      });
    }
  }, [batchDeleteSecureItems, requestWithAuth, setUser, user, accessToken, refreshToken]);

  const getUsers = useCallback(async (): Promise<Pesca.UserInformation[] | null> => {
    const result = await requestWithAuth('/users', {});
    if (result?.status === 200) {
      return result.json();
    }
    return null;
  }, [requestWithAuth]);

  const payments = {
    create: useCallback(
      async (payment: Pesca.PaymentCreateDTO): Promise<boolean> => {
        const result = await requestWithAuth('payments', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payment),
        });
        return result?.status === 201;
      },
      [requestWithAuth],
    ),
    getAll: useCallback(async (): Promise<Pesca.PaymentInformation[] | null> => {
      const result = await requestWithAuth('payments', {});
      if (result?.status === 200) {
        return result.json().then((fetchedPayments: Pesca.PaymentInformation[]) =>
          fetchedPayments.map(p => ({
            ...p,
            date: parseInt(p.date as unknown as string, 10),
          })),
        );
      }
      return null;
    }, [requestWithAuth]),
  };
  return (
    <PescaContext.Provider
      value={{
        getUsers,
        login,
        logout,
        payments,
        register,
        user,
        finished,
      }}>
      {children}
    </PescaContext.Provider>
  );
};

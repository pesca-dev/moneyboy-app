import EncryptedStorage from 'react-native-encrypted-storage';

import { PescaClient } from '@api/PescaClient';
import { RegistrationData } from '@api/RegistrationData';

import { HttpClient } from '@pesca/httpClient';

const constants = {
  storage: {
    access_token: 'access_token',
    refresh_token: 'refresh_token',
    user: 'user',
  },
};

/**
 * Create a new Parse Client.
 * @param appName name of the app to connect to
 * @param url url of the app
 * @returns a new instance of a Parse Client
 */
export default function createPescaClient(url: string): PescaClient {
  const httpClient = new HttpClient(url, constants, EncryptedStorage);

  async function login(username: string, password: string): Promise<MaybeError<boolean>> {
    const body = JSON.stringify({
      username,
      password,
    });
    const result = await httpClient.request('auth/login', {
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
    await EncryptedStorage.setItem(constants.storage.access_token, tokens.access_token);
    await EncryptedStorage.setItem(constants.storage.refresh_token, tokens.refresh_token);
    return [true];
  }

  async function logout(): Promise<void> {
    await httpClient.requestWithAuth('auth/logout', {
      method: 'DELETE',
    });
    await EncryptedStorage.removeItem(constants.storage.access_token);
    await EncryptedStorage.removeItem(constants.storage.refresh_token);
  }

  async function register({}: RegistrationData): Promise<MaybeError<boolean>> {
    return [false, 'Not Implemented'];
  }

  async function getUser(): Promise<Pesca.User | null> {
    const result = await httpClient.requestWithAuth('user/profile', {});
    let user: Pesca.User | null = null;
    if (result?.status === 200) {
      user = await result.json();
      // store current user in memory
      await EncryptedStorage.setItem(constants.storage.user, JSON.stringify(user));
    } else if (result?.status !== 401) {
      // if we have no connection or another error happens (but we are NOT unauthorized), we use cached user
      const userJSON = await EncryptedStorage.getItem(constants.storage.user);
      if (userJSON) {
        try {
          user = JSON.parse(userJSON);
        } catch {}
      }
    } else {
      // if we are unauthorized, we simply delete all stored data, so we leave nothing behind after a logout
      await EncryptedStorage.removeItem(constants.storage.access_token);
      await EncryptedStorage.removeItem(constants.storage.refresh_token);
      await EncryptedStorage.removeItem(constants.storage.user);
    }
    return user;
  }

  return Object.freeze({
    login,
    logout,
    register,
    getUser,
  });
}

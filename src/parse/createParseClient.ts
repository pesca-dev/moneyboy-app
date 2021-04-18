import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ParseClient } from '@api/ParseClient';
import { RegistrationData } from '@api/RegistrationData';

/**
 * Create a new Parse Client.
 * @param appName name of the app to connect to
 * @param url url of the app
 * @returns a new instance of a Parse Client
 */
export default function createParseClient(appName: string, url: string): ParseClient {
  // Basic setup for react native
  Parse.setAsyncStorage(AsyncStorage);
  Parse.initialize(appName);
  Parse.serverURL = url;
  // Allow unsafe current user, so we can retrieve it on startup
  Parse.User.enableUnsafeCurrentUser();

  async function login(username: string, password: string): Promise<MaybeError<boolean>> {
    try {
      await Parse.User.logIn(username, password);
    } catch (e) {
      return [false, e.message];
    }
    return [true];
  }

  async function logout(): Promise<void> {
    await Parse.User.logOut();
  }

  async function register({ username, password, email, displayName }: RegistrationData): Promise<MaybeError<boolean>> {
    const user = new Parse.User();
    user.set('username', username);
    user.set('password', password);
    user.set('email', email);
    user.set('displayName', displayName);

    try {
      await user.signUp();
    } catch (e) {
      return [false, e.message];
    }
    return [true];
  }

  async function getUser(): Promise<Parse.User | null> {
    return Parse.User.currentAsync();
  }

  return Object.freeze({
    login,
    logout,
    register,
    getUser,
  });
}

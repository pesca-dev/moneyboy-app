import Parse from 'parse/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ParseClient } from '@api/ParseClient';

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

  // TODO lome: do we need this? Or only use `Parse.User.currentAsync`
  let user: Parse.User | undefined;

  async function login(username: string, password: string): Promise<boolean> {
    try {
      user = await Parse.User.logIn(username, password);
    } catch {}
    return !!user;
  }

  async function logout(): Promise<void> {
    await Parse.User.logOut();
  }

  async function getUser(): Promise<Parse.User | null> {
    return Parse.User.currentAsync();
  }

  return Object.freeze({
    login,
    logout,
    getUser,
  });
}

/**
 * A client to interface with the parse API in a controlled way.
 */
export interface ParseClient {
  /**
   * Try to log a user in with the given auth data.
   * @param username username of the user
   * @param password password of the user
   */
  login(username: string, password: string): Promise<MaybeError<boolean>>;
  /**
   * Log the current user out.
   * Noop if no user is logged in.
   */
  logout(): Promise<void>;
  /**
   * Get the currently logged in user.
   *
   * @returns currently logged in user, or `null`, if no user is logged in
   */
  getUser(): Promise<Parse.User | null>;
}

/**
 * A client to interface with the backend API in a controlled way.
 *
 * @author Louis Meyer
 */
export interface PescaClient {
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
  getUser(): Promise<Pesca.UserProfileInformation | null>;

  /**
   * Try to register a new user.
   *
   * @param data data needed for registration
   */
  register(data: Pesca.RegistrationPayload): Promise<MaybeError<boolean>>;

  getUsers(): Promise<Pesca.UserInformation[] | null>;
}

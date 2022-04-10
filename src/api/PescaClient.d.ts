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

  user?: Pesca.UserProfileInformation | null;

  /**
   * Try to Register a new user.
   *
   * @param data data needed for registration
   */
  register(data: Pesca.RegistrationPayload): Promise<MaybeError<boolean>>;

  /**
   * Get all users visible.
   */
  getUsers(): Promise<Pesca.UserInformation[] | null>;

  payments: {
    /**
     * Create a payment.
     * @param payment information about the payment.
     */
    create(payment: Pesca.PaymentCreateDTO): Promise<boolean>;

    getAll(): Promise<Pesca.PaymentInformation[] | null>;
  };

  finished?: boolean;
}

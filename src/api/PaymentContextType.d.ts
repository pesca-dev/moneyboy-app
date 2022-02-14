export type PaymentContextType = {
  /**
   * All payments currently available in the app.
   */
  payments: Pesca.PaymentInformation[];
  /**
   * Request an update of all payments. This will lead to a network request.
   */
  update(): Promise<void>;
  /**
   * Create a new payment for another user.
   * @param payment payment to create
   */
  createPayment(payment: Pesca.PaymentCreateDTO): Promise<boolean>;
};

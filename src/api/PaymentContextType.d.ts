export type PaymentContextType = {
  payments: Pesca.PaymentInformation[];
  update(): Promise<void>;
  createPayment(payment: Pesca.PaymentCreateDTO): Promise<boolean>;
};

declare namespace Pesca {
  interface LoginReturnDTO {
    access_token: string;
    refresh_token: string;
  }

  interface UserInformation {
    id: string;
    username: string;
    displayName: string;
  }

  interface UserProfileInformation extends UserInformation {
    email: string;
  }

  interface RefreshAccessTokenPayload {
    refresh_token: string;
  }

  interface RefreshAccessTokenDTO {
    access_token: string;
  }

  interface RegistrationPayload {
    username: string;
    password: string;
    displayName: string;
    email: string;
  }

  export interface PaymentCreateDTO {
    /**
     * ID of the user this payment is issued for.
     */
    to: string;

    /**
     * Amount of this payment.
     */
    amount: number;

    /**
     * Date of this payment.
     */
    date: number;
  }
}

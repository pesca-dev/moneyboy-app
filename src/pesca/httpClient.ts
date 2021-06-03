type VariableKeys = {
  storage: {
    access_token: string;
    refresh_token: string;
    user: string;
  };
};

interface StorageProvider {
  setItem(key: string, value: string): Promise<void>;
  getItem(key: string): Promise<string | null>;
  removeItem(key: string): Promise<void>;
}

/**
 * Client for performing API requests for a given base-url.
 *
 * @author Louis Meyer
 */
export class HttpClient {
  constructor(
    private readonly apiUrl: string,
    private readonly keys: VariableKeys,
    private readonly storage: StorageProvider,
  ) {}

  public async request(url: RequestInfo, options?: RequestInit) {
    return fetch(`${this.apiUrl}/${url}`, options).catch(() => null);
  }

  /**
   * Perform a request to the backend and refresh the access token, if needed.
   *
   * @param uri uri from the API to access
   * @param options request options (i.e. headers, body, method etc)
   * @returns the response
   */
  public async requestWithAuth(uri: RequestInfo, options: RequestInit) {
    // get access token from storage and add it to header
    let access_token = (await this.storage.getItem(this.keys.storage.access_token)) ?? '';
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${access_token}`,
    };

    // perform request
    let res = await this.request(uri, options);
    if (res?.status === 401) {
      // if request is unauthorized, get refresh token from storage
      const refresh_token = (await this.storage.getItem(this.keys.storage.refresh_token)) ?? '';
      const payload: Pesca.RefreshAccessTokenPayload = {
        refresh_token,
      };
      // try to get a new access token
      const refResult = await fetch(`${this.apiUrl}/auth/refresh`, {
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
        await this.storage.setItem(this.keys.storage.access_token, newAccessToken.access_token);
        // ...and perform request again
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken.access_token}`,
        };
        res = await this.request(uri, options);
      }
    }
    return res;
  }
}

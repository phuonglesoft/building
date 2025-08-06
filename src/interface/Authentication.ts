export interface CustomCognitoAccessTokenPayload {
    sub: string;
    aud: string;
    iss: string;
    exp: number;
    iat: number;
    token_use: 'access';
    client_id: string;
    scope?: string;
    groups?: string[];
}

export interface UserPayload {
  sub: string;
  email?: string;
  groups?: string[];
  preferred_username?: string;
  eslint_config?: string;
}
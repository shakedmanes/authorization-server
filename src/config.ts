// config

import { join } from 'path';

const config = {
  // Expiration Times - format in seconds for mongoose TTL expiration field
  AUTH_CODE_EXPIRATION_TIME: 120, // 2 Minutes
  ACCESS_TOKEN_EXPIRATION_TIME: 180, // 3 Minutes
  REFRESH_TOKEN_EXPIRATION_TIME: 180, // 3 Minutes

  // Access Token Count Limit - Number of tokens limitation
  ACCESS_TOKEN_COUNT_LIMIT: 10,

  // Lengths
  AUTH_CODE_LENGTH: 50,
  ACCESS_TOKEN_LENGTH: 100,
  REFRESH_TOKEN_LENGTH: 50,
  CLIENT_ID_LENGTH: 40,
  CLIENT_SECRET_LENGTH: 100,
  AUDIENCE_ID_LENGTH: 30,
  REGISTRATION_TOKEN_LENGTH: 40,

  // Client Manager
  CLIENT_MANAGER_SCOPE: 'client_manager_special_scope',
  CLIENT_MANAGER_AUTHORIZATION_HEADER: 'authorization-registrer',
  CLIENT_MANAGER_PASSPORT_STRATEGY: 'client_manager_strategy', // Only client manager authentication
  CLIENT_MANAGER_PASSPORT_MANAGEMENT_STRATEGY: 'client_manager_management_strategy',

  /** Routes Configuration */
  OAUTH_ENDPOINT: '/oauth2',

  // OAuth2 Flows Routes
  OAUTH_AUTHORIZATION_ENDPOINT: '/authorize',
  OAUTH_TOKEN_ENDPOINT: '/token',
  OAUTH_TOKEN_INTROSPECTION_ENDPOINT: '/tokeninfo',
  OAUTH_TOKEN_USER_CONSENT_ENDPOINT: '/decision', // User decision endpoint
  OAUTH_USER_LOGIN_ENDPOINT: '/login',

  // OAuth2 Management Routes
  OAUTH_MANAGEMENT_ENDPOINT: '/register',

  // OAuth2 User Permission Management Routes
  OAUTH_PERMISSION_MANAGEMENT_ENDPOINT: '/user-permissions',

  // Authentication Routes
  AUTH_ENDPOINT: '/auth',
  AUTH_SHRAGA_ENDPOINT: '/shraga',
  AUTH_SHRAGA_CALLBACK_ENDPOINT: '/callback',

  // Well-known Routes for resource sharing (SSL Certificates, Public key, etc.)
  WELLKNOWN_ENDPOINT: '/.well-known',

  // Shraga Callback Route
  get SHRAGA_CALLBACK_ENDPOINT() {
    return `${this.OAUTH_ENDPOINT + this.OAUTH_AUTHORIZATION_ENDPOINT}`;
  },

  // Bcrypt
  BCRYPT_ROUNDS: 8,

  // Session
  SESSION_SECRET: 'bla_bla_secret_session_dont_tell_anyone',

  // MongoDB Url
  mongoUrl:
    `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.MONGO_URL}`,

  // SSL Configuration
  privateKeyPath: join(__dirname, 'certs/files/privatekey.pem'),
  publicKeyPath: join(__dirname, 'certs/files/publickey.pem'),
  certificatePath: join(__dirname, 'certs/files/certificate.pem'),

  // JWT Configuration
  issuerHostUri: `https://${process.env.HOSTNAME}`,
  jwtAlgorithm: 'RS256',
  jwksPath: join(__dirname, 'certs/files/jwks.json'),
};

export default config;

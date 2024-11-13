// Dans src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000',
  mapbox: {
    accessToken: 'your_mapbox_access_token',
  },
  GOOGLE_CLIENT_ID: 'your_google_client_id',
  GOOGLE_REDIRECT_URI: 'http://localhost:4200/auth/google',
};

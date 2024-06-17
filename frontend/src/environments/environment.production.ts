// Dans src/environments/environment.ts

export const environment = {
  production: true,
  apiUrl: 'http://localhost:5000',
  mapbox: {
    accessToken:
      // use env variable
      'MAPBOX_ACCESS_TOKEN',
  },
};

#!/bin/sh

cd src
mkdir environments
cd environments

echo "export const environment = {
  production: true,
  apiUrl: '"$API_URL"',
  mapbox: {
    accessToken:
      '"$MAPBOX_ACCESS_TOKEN"',
  },
  GOOGLE_CLIENT_ID: '"$GOOGLE_CLIENT_ID"',
  };" > environment.production.ts

echo 'Finished setting up environment'

exit 0

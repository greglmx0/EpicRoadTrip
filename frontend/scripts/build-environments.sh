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
  };" > environment.produtcion.ts

echo 'Finished setting up environment'

exit 0

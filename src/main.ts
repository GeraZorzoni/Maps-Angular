import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

Mapboxgl.accessToken =
  'pk.eyJ1IjoiZ3pvcnpvbmkiLCJhIjoiY2x3dWt4aGMxMGYxMDJtcjFhN2Y4MXdpcyJ9.1y5WGuhjtln5SJeqqE1_PA';

//Compruebo que el navagador soporta geolocalizacion

if (!navigator.geolocation) {
  alert('Navegador no soporta la Geolocation');
  throw new Error('Navegador no soporta la Geolocation');
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true,
  })
  .catch((err) => console.error(err));

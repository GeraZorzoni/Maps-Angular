import { Component } from '@angular/core';

import { MapsService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css',
})
export class BtnMyLocationComponent {
  constructor(
    private placesService: PlacesService,
    private mapService: MapsService
  ) {}

  goToMylocation() {
    if (!this.placesService.isUserLocationReady)
      throw Error('No Hay Unbiacion de Usuario');
    if (!this.mapService.isMapReady) throw Error('No hay mapa disponible');

    this.mapService.flyTo(this.placesService.useLocation!);
  }
}

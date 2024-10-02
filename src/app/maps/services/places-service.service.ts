import { Injectable } from '@angular/core';

//import { HttpClient } from '@angular/common/http';

import { MapsService } from './maps.service';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  public useLocation?: [number, number]; // ? asi acepta undefined
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  // constructor(private http: HttpClient) {
  //   this.gerUserLocation();
  // }

  constructor(
    private placesApi: PlacesApiClient,
    private mapService: MapsService
  ) {
    this.gerUserLocation();
  }

  public async gerUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      // mapbox trabaja primero con lon y luego lat, google maps es al reves
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve(this.useLocation);
        },
        (err) => {
          alert('No se pudo obtener la geolocalizacion');
          console.log(err);
          reject();
        }
      );
    });
  }

  getPlacesByQuery(query: string = '') {
    // todo: evaluar cuando es query es nulo

    if (query.length === 0) {
      this.places = [];
      this.isLoadingPlaces = false;
      return;
    }

    if (!this.useLocation) throw Error('No Hay useLocation');

    this.isLoadingPlaces = true;

    this.placesApi

      .get<PlacesResponse>(`/${query}.json`, {
        params: {
          proximity: this.useLocation.join(','),
        },
      })
      .subscribe((resp) => {
        this.isLoadingPlaces = false;
        this.places = resp.features;

        this.mapService.createMarkersFromPlaces(this.places, this.useLocation!);
      });
  }

  deletePlaces() {
    this.places = [];
  }
}

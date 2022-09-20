import { Injectable } from '@angular/core';
import { Geo } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class GeoLocationService {
  userLocation?: [number, number];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor() {
    this.getUserLocation();
  }

  getUserLocation(): Promise<[number, number]> {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          res(this.userLocation);
        },
        (err) => {
          alert('No se pudo obtener la dirección');
          console.log(err);
          rej();
        }
      );
    });
  }
}

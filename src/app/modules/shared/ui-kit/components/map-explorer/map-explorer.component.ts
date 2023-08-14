import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import L from 'leaflet';
import { IGeoLocation } from 'src/interfaces/geo-location';

@Component({
  selector: 'app-map-explorer',
  templateUrl: './map-explorer.component.html',
  styleUrls: ['./map-explorer.component.scss'],
})
export class MapExplorerComponent implements AfterViewInit {
  
  map: L.Map;
  @Output() selectedLocation = new EventEmitter<IGeoLocation>(null);

  constructor() { }

  async ngAfterViewInit() {
    try {
      const currentLocation = await this.getCurrentLocation();  
      await this.initMap(currentLocation);
    } catch (error) {
      window.alert(`Cannot get GeoLocation`);
      window.alert(error);
    }
  }

  async initMap(location: IGeoLocation) {
    this.map = L.map('map');
    this.centerMap(location);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  }

  onExploreHereClick() {
    const location = this.map.getCenter();
    this.selectedLocation.emit(location);
  }

  async onPositionClick() {
    const currentLocation = await this.getCurrentLocation();
    this.centerMap(currentLocation);
  }

  async getCurrentLocation(): Promise<IGeoLocation> {
    const { coords: { latitude: lat, longitude: lng } } = await Geolocation.getCurrentPosition();
    return { lat, lng };
  }

  centerMap(location: IGeoLocation) {
    this.map.setView({ lat: location.lat, lng: location.lng }, 14);
  }

}

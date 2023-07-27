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
  @Output() location = new EventEmitter<IGeoLocation>(null);

  constructor() { }

  ngAfterViewInit() {
    this.map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    // la vista non è ancora pronta, vedere la funzione ionViewDidEnter()
    setTimeout(() => {
      this.map.invalidateSize();
    }, 500)
  }

  onExploreHereClick() {
    const location = this.map.getCenter();
    this.location.emit(location);
  }

  async onPositionClick() {
    const { coords: { latitude, longitude } } = await Geolocation.getCurrentPosition();
    if (latitude && longitude) {
      this.map.flyTo({
        lat: latitude,
        lng: latitude
      }, 10);

      // this.map.setView({
      //   lat: latitude,
      //   lng: latitude
      // }, 10);
    }
  }

}

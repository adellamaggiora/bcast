import { AfterViewInit, Component } from '@angular/core';
import L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);

    // la vista non è ancora pronta, vedere la funzione ionViewDidEnter()
    setTimeout(() => {
      map.invalidateSize();
    }, 500)    
  }

}

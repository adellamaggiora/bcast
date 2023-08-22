import { Component, OnInit, Input } from '@angular/core';
import * as L from 'leaflet';
import { IGeoLocation } from 'src/interfaces/geo-location';


@Component({
  selector: 'app-map-preview',
  templateUrl: './map-preview.component.html',
  styleUrls: ['./map-preview.component.scss']
})
export class MapPreviewComponent implements OnInit {

  @Input() position: IGeoLocation; // Definizione dell'input

  ngOnInit() {
    const map = L.map('map-preview').setView(this.position, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

  }
}
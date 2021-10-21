import { Component, OnInit } from '@angular/core';

// La instalación que he hecho de mapbox ha sido a través de npm y he seguido las instrucciones de la documentación oficial: "npm install mapbox-gl --save" y "<link href='https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css' rel='stylesheet' />"

// Importo toda la librería (*) mapbox-gl y le pongo el alias mapboxgl
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
      #mapa {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class FullScreenComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('FullScreen');

    var map = new mapboxgl.Map({
      container: 'mapa',
      // Recordar ponerle un width y height al elemento contenedor del mapa para poder visualizarlo
      style: 'mapbox://styles/mapbox/streets-v11',
      // longitud y después latitud, al revés que GoogleMaps
      center: [-1.0733545057455198, 37.97249156714781],
      zoom: 18,
    });
  }
}

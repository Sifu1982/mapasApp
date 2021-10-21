import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

// El token necesario para usar la librería lo he guardado en las variables de entorno de Angular, tanto en desarrollo como en producción
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // Coloco el token de mapbox al inicializar la App para que esté disponible en todos sus componentes. El ngOnInit de app.component.ts es el primero que se dispara de todos los componentes.
  ngOnInit(): void {
    // (mapboxgl as any) es un truco para saltarme el tipado que viene por defecto de mapboxgl y que TypeScript no se queje.
    (mapboxgl as any).accessToken = environment.mapboxToken;
  }
}

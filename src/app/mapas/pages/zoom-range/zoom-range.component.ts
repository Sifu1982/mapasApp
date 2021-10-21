import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container {
        width: 100%;
        height: 100%;
      }

      .row {
        background-color: white;
        border-radius: 5px;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        position: fixed;
        z-index: 999;
        width: 400px;
      }
    `,
  ],
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  // @ViewChild('nombrePlantillaHtml') nombreVariable: ElementRef
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [-1.0733545057455198, 37.97249156714781];

  constructor() {}

  // Uso ngAfterViewInit porque si no divMapa sería undefined. Es undefined en el constructor y en el onInit => comprobado con console.log()
  ngAfterViewInit(): void {
    // console.log('AfterViewInit', this.divMapa);

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
    });

    // Creo un listener con el método on()
    this.mapa.on('zoom', (ev) => {
      // getZoom() me da el zoom actual del mapa
      this.zoomLevel = this.mapa.getZoom();
    });

    this.mapa.on('zoomend', (ev) => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18);
      }
    });

    //Movimiento del mapa
    this.mapa.on('move', (event) => {
      const target = event.target;
      // console.log(target.getCenter());
      const { lng, lat } = target.getCenter();
      this.center = [lng, lat];
    });
  }

  // Es una regla de oro acabar con los listeners cuando se destruye el componente para que en la aplicación no queden ejecuciones innecesarias al cambiar de componente.
  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  zoomOut() {
    // Método de mapboxgl.Map
    this.mapa.zoomOut();
  }

  zoomIn() {
    // Método de mapboxgl.Map
    this.mapa.zoomIn();
  }

  zoomCambio(valor: string) {
    this.mapa.zoomTo(Number(valor));
  }
}

import React from 'react';
import mapboxgl from 'mapbox-gl';
import { HomebaseProvider, useEntity, useTransact, useQuery } from 'homebase-react'

mapboxgl.accessToken = 'pk.eyJ1IjoiamgwMjc0IiwiYSI6ImNrazQzYXB6dTAybTUyd3Brc2UxM3lheXoifQ.UnPV6JVTC_J89V0q7Dz61w';

class Map extends React.Component {
  // Code from the next few steps will go here
  constructor(props) {
    super(props);
    this.state = {
    lng: -3.1999,
    lat: 55.9371, 
    zoom: 14
    };
    }

    componentDidMount() {
      this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/jh0274/ckkbnthqs12gi17mncdq2btlu',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
      })

      var div = window.document.createElement('div');

      var markers = {}
      markers[0] = [-3.1999,55.9371]
      markers[1] = [-3.1999,55.9351]

      var othermarkers = {}
      othermarkers[0] = [-3.2020,55.9371]
      othermarkers[1] = [-3.2020,55.9351]

      var bounds = new mapboxgl.LngLatBounds();
    
      div.innerHTML = "<a href='https://www.w3schools.com'>Mrs Brown's Bakery</a>"

      const popup = new mapboxgl.Popup({ offset: 30, focusAfterOpen: false }).setDOMContent(div);
      
      const marker = new mapboxgl.Marker({
        color: "#000"
        }).setLngLat(markers[0])
        .setPopup(popup)
        .addTo(this.map);

      marker.getElement().addEventListener('click', () => {
        const marker = new mapboxgl.Marker({
          color: "#000"
          }).setLngLat(markers[1])
          .setPopup(popup)
          .addTo(this.map);

        this.map.addLayer({
          'id': 'route',
          'type': 'line',
          'source': 'route',
          'layout': {
          'line-join': 'round',
          'line-cap': 'square'
          },
          'paint': {
          'line-color': '#000',
          'line-width': 4
          }
        });
      
        this.map.fitBounds(markers, { padding: 200 });

      });

      this.map.addControl(new mapboxgl.NavigationControl());

      this.map.on("load", () => {
        this.map.addSource('route', {
          'type': 'geojson',
          'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
          'type': 'LineString',
          'coordinates': [
          [-3.1999,55.9371],
          [-3.1999,55.9351]
          ]
          }
          }
        });
      })
    }

    render() {
      return (
      <div>
      <div ref={el => this.mapContainer = el} className="mapContainer" />
      </div>
      )
    }
}

  export default Map;
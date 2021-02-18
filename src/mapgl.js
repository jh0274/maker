import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { HomebaseProvider, useEntity, useTransact, useQuery } from 'homebase-react'

mapboxgl.accessToken = 'pk.eyJ1IjoiamgwMjc0IiwiYSI6ImNrazQzYXB6dTAybTUyd3Brc2UxM3lheXoifQ.UnPV6JVTC_J89V0q7Dz61w';

function Mapgl() {

  const [lng, setLng] = useState(-3.1999);
  const [lat, setLat] = useState(55.9371);
  const [zoom, setZoom] = useState(14);
  const node = useRef(null);

  const [businesses] = useQuery({
    $find: 'business',
    $where: { business: { name: '$any' } }
  })
 
  const [suppliers] = useQuery({
    $find: 'business',
    $where: { business: { supplies: '$any' } }
  })

  const [selectedbusiness, setselectedbusiness] = useState([]);
  

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: node.current,
      style: 'mapbox://styles/jh0274/ckkbnthqs12gi17mncdq2btlu',
      center: [lng, lat],
      zoom: zoom,
    });
  
    var div = window.document.createElement('div');

    var markers = {}
    markers[0] = [-3.1999,55.9371]
    markers[1] = [-3.1999,55.9351]

    var othermarkers = {}
    othermarkers[0] = [-3.2020,55.9371]
    othermarkers[1] = [-3.2020,55.9351]

    var bounds = new mapboxgl.LngLatBounds();
    
    function addMarkers(){

      if (selectedbusiness==""){
        businesses.forEach(function(bus){
          const popup = new mapboxgl.Popup({ offset: 30, focusAfterOpen: false })
            .setHTML("<a href='https://www.w3schools.com'>" + bus.get('name') + "</a>");
          const marker = new mapboxgl.Marker({
            color: "#000"
            }).setLngLat(bus.get('coordinates'))
            .setPopup(popup)
            .addTo(map);
          marker.getElement().addEventListener('click', () => {
            setselectedbusiness(bus);
            suppliers.forEach(function(supplier){
  
              console.log(supplier.get('supplies'));
              console.log(bus.get('id'));
              if (supplier.get('supplies') == bus.get('id')) {
                const suppliermarker = new mapboxgl.Marker({
                  color: "#ff0000"
                  }).setLngLat(supplier.get('coordinates'))
                  .addTo(map);
                  bounds.extend(supplier.get('coordinates'));
              }
            })
  
              map.addLayer({
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
          
              map.fitBounds(bounds, { padding: 200 });
          });
        })

      }
      
      
    }


    map.addControl(new mapboxgl.NavigationControl());

    map.on("load", () => {
      map.addSource('route', {
        'type': 'geojson',
        'data': {
        'type': 'Feature',
        'properties': {},
        'geometry': {
        'type': 'LineString',
        'coordinates': [
        [-3.1999,55.9371],
        [-3.1999,55.9311]
        ]
        }
        }
      });
      addMarkers();
    })

    }, [selectedbusiness, businesses, lat, lng, zoom, suppliers]);

console.log(selectedbusiness);
console.log(suppliers);

  return (
    <div>
      <div ref={node} className="mapContainer" />
    </div>
  );
}
export default Mapgl;
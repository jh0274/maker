  
import React from 'react'
import Stakeapp from './stakeapp';
import { HomebaseProvider, useEntity, useTransact, useQuery } from 'homebase-react'
import mapboxgl from 'mapbox-gl';

function App() {
  return (
    <HomebaseProvider config={config}>
      <Stakeapp />
    </HomebaseProvider>
  );
}

const config = {
  // Schema is only used to enforce 
  // unique constraints and relationships.
  // It is not a type system, yet.
  schema: {
    business: { 
      
    name: { unique: 'identity' },
    suppliers: { type: 'ref', cardinality: 'many' }
    
    }
  },
  // Initial data let's you conveniently transact some 
  // starting data on DB creation to hydrate your components.
  initialData: [
    {
      business: {
        id: -1,
        name: 'Make it', 
        coordinates: new mapboxgl.LngLat(-3.1999,55.9371)
      }
    }, {
      business: {
        id: -2,
        name: "Mrs Brown's Bakery",
        coordinates: new mapboxgl.LngLat(-3.1999,55.9351)
      }
    },{
      business: {
        id: -3,
        name: "Paper Place",
        coordinates: new mapboxgl.LngLat(-3.1999,55.9311)
      }
    },
    {
      business: {
        id: -4,
        supplies: 1,
        name: "Rock Place",
        coordinates: new mapboxgl.LngLat(-3.1999,55.9361)
      }
    },{
      business: {
        id: -5,
        supplies: 1,
        name: "Scissors Place",
        coordinates: new mapboxgl.LngLat(-3.1921,55.9341)
      }
    }
  ]
}

export default App;

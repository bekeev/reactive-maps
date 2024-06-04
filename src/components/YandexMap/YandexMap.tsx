import React, { useState } from 'react';
import { LngLat, YMapLocationRequest } from 'ymaps3';

import { Listeners } from './Listeners';
import { Clusterer } from './Clusterer';
import { MarkerProps } from '../Marker/Marker';
import { useYandexMaps } from '../../hooks/useYandexMaps';

const LOCATION: YMapLocationRequest = {
  center: [43.07678742815782, 44.05941536523786], // стартовая позиция [lng, lat]
  zoom: 16, // стартовый зум
};

type Props = {
  markers: MarkerProps[];
  onAddMarker: (coordinates: LngLat) => void;
  onRemoveMarker: (idx: string) => void;
};

export const YandexMap: React.FC<Props> = ({
  markers,
  onAddMarker,
  onRemoveMarker,
}) => {
  const [location, setLocation] = useState<any>(LOCATION);
  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapMarker,
    YMapListener,
    YMapControls,
    YMapGeolocationControl,
  } = useYandexMaps();

  if (
    !YMap ||
    !YMapDefaultSchemeLayer ||
    !YMapDefaultFeaturesLayer ||
    !YMapMarker ||
    !YMapListener ||
    !YMapControls ||
    !YMapGeolocationControl
  ) {
    return <div>Loading...</div>;
  }

  return (
    <YMap location={location}>
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
      <Clusterer markers={markers} onRemoveMarker={onRemoveMarker} />
      <Listeners onAddMarker={onAddMarker} setLocation={setLocation} />
      <YMapControls position="left">
        {/* Add the geolocation control to the map */}
        <YMapGeolocationControl />
      </YMapControls>
    </YMap>
  );
};

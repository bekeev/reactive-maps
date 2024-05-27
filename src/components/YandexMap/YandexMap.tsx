import React, { useState } from 'react';

import { Listeners } from './Listeners';
import { useYandexMaps } from '../../hooks/useYandexMaps';
import { Marker, MarkerProps } from '../Marker/Marker';
import { LngLat, YMapLocationRequest } from 'ymaps3';

const LOCATION: YMapLocationRequest = {
  center: [43.07678742815782, 44.05941536523786], // стартовая позиция [lng, lat]
  zoom: 16, // стартовый зум
};

type Props = {
  markers: MarkerProps[];
  onAddMarker: (coordinates: LngLat) => void;
  onRemoveMarker: (idx: number) => void;
};

export const YandexMap: React.FC<Props> = ({
  markers,
  onAddMarker,
  onRemoveMarker,
}) => {
  const [location, setLocation] = useState<YMapLocationRequest>(LOCATION);

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapMarker,
    YMapListener,
  } = useYandexMaps();

  if (
    !YMap ||
    !YMapDefaultSchemeLayer ||
    !YMapDefaultFeaturesLayer ||
    !YMapMarker ||
    !YMapListener
  ) {
    return <div>Loading...</div>;
  }

  return (
    <YMap location={location}>
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
      <Listeners onAddMarker={onAddMarker} setLocation={setLocation} />
      {markers.map((marker, idx) => {
        return (
          <Marker
            key={marker.coordinates.toString()}
            {...marker}
            onRemove={() => onRemoveMarker(idx)}
          />
        );
      })}
    </YMap>
  );
};

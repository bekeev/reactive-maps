import React, { useCallback, useMemo } from 'react';
import { Feature } from '@yandex/ymaps3-clusterer';
import { LngLat } from 'ymaps3';

import { Marker, MarkerProps } from '../Marker/Marker';
import { MarkerCluster } from '../MarkerCluster/MarkerCluster';
import { useYandexMaps } from '../../hooks/useYandexMaps';

type TProps = {
  markers: MarkerProps[];
  onRemoveMarker: (idx: string) => void;
};

export const Clusterer: React.FC<TProps> = ({ markers, onRemoveMarker }) => {
  const {
    YMapMarker,
    YMapClusterer,
    clusterByGrid,
    YMapFeatureDataSource,
    YMapLayer,
  } = useYandexMaps();

  /* здесь задается сетка для кластеризации в пикселях */
  const gridSizedMethod = useMemo(
    () => clusterByGrid?.({ gridSize: 128 }),
    [clusterByGrid],
  );

  const marker = useCallback(
    (feature: Feature & { markerProps: MarkerProps }) => (
      <Marker
        key={feature.id}
        {...feature.markerProps}
        onRemove={() => onRemoveMarker(feature.markerProps.id)}
      />
    ),
    [onRemoveMarker],
  );

  const cluster = useCallback((coordinates: LngLat, features: Feature[]) => {
    return (
      <MarkerCluster
        key={`${features[0].id}-${features.length}`}
        length={features.length}
        coordinates={coordinates}
      />
    );
  }, []);

  if (
    !YMapMarker ||
    !YMapClusterer ||
    !clusterByGrid ||
    !YMapFeatureDataSource ||
    !YMapLayer
  ) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <YMapFeatureDataSource id="clusterer-source" />
      <YMapLayer source="clusterer-source" type="markers" zIndex={1800} />
      <YMapClusterer
        marker={marker}
        cluster={cluster}
        method={gridSizedMethod}
        features={getPoints(markers)}
      />
    </>
  );
};

const getPoints = (markers: MarkerProps[]) => {
  return markers.map((marker, index) => ({
    type: 'Feature',
    id: index.toString(),
    geometry: { type: 'Point', coordinates: marker.coordinates },
    markerProps: marker,
  }));
};

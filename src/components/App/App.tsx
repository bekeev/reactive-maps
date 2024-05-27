import React, { useState } from 'react';
import { styled } from 'styled-components';

import { MarkersList } from '../MarkersList/MarkersList';
import { markerTemplates } from '../MarkersList/constants';
import { YandexMap } from '../YandexMap/YandexMap';
import { MarkerProps } from '../Marker/Marker';
import { LngLat } from 'ymaps3';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const App: React.FC = () => {
  const [settedMarkers, setSettedMarkers] = useState<MarkerProps[]>([]);
  const [activeMarkerTemplateIdx, setActiveMarkerTemplateIdx] = useState<
    number | undefined
  >();

  const handleAddMarker = (coordinates: LngLat) => {
    if (!activeMarkerTemplateIdx) {
      return;
    }

    const selectedMarkerTemplate = markerTemplates[activeMarkerTemplateIdx];

    setSettedMarkers((prevMarkers) => [
      ...prevMarkers,
      {
        coordinates: coordinates,
        title: selectedMarkerTemplate.name,
        //TODO можно добавить функционал описания маркера
        description: 'Можно реализовать функционал добавления описания',
        markerColor: selectedMarkerTemplate.iconColor,
        markerIcon: selectedMarkerTemplate.icon,
      },
    ]);

    setActiveMarkerTemplateIdx(undefined);
  };

  const handleRemoveMarker = (idx: number) => {
    setSettedMarkers((prevMarkers) => [
      ...prevMarkers.slice(0, idx),
      ...prevMarkers.slice(idx + 1),
    ]);
  };

  return (
    <Container>
      <MarkersList
        selectedMarkerIdx={activeMarkerTemplateIdx}
        setSelectedIdx={setActiveMarkerTemplateIdx}
      />
      <YandexMap
        markers={settedMarkers}
        onAddMarker={handleAddMarker}
        onRemoveMarker={handleRemoveMarker}
      />
    </Container>
  );
};

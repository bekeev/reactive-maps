import React from 'react';
import styled from 'styled-components';
import { LngLat } from 'ymaps3';

import { useYandexMaps } from '../../hooks/useYandexMaps';

const Circle = styled.div`
  color: #7234c3;
  border: 4px solid currentColor;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.7);

  height: 40px;
  width: 40px;
  padding: 8px;
  position: relative;
  transform: translate(-50%, -50%);
`;

const CircleContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 70%;
  border-radius: 50%;
  background-color: currentColor;
  transform: translate3d(-50%, -50%, 0);
`;

const CircleText = styled.span`
  font-size: 0.9em;
  color: #fff;
`;

type TProps = {
  key: string;
  length: number;
  coordinates: LngLat;
};

export const MarkerCluster: React.FC<TProps> = ({
  key,
  length,
  coordinates,
}) => {
  const { YMapMarker } = useYandexMaps();

  if (!YMapMarker) {
    return null;
  }

  return (
    <YMapMarker key={key} coordinates={coordinates} source="clusterer-source">
      <Circle>
        <CircleContent>
          <CircleText>{length}</CircleText>
        </CircleContent>
      </Circle>
    </YMapMarker>
  );
};

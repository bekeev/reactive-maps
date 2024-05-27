import React, { useState } from 'react';
import type { LngLat } from '@yandex/ymaps3-types';

import { useYandexMaps } from '../../hooks/useYandexMaps';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MarkerPopup } from './MarkerPopup';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { colorPalette } from '../../colorPalette';

const CustomMarker = styled(FontAwesomeIcon)<{ color: string }>`
  cursor: pointer;
  width: 40px;
  height: 40px;
  padding: 8px;
  color: ${({ color }) => color};

  border: 4px solid ${({ color }) => color};
  border-radius: 20px;
  background-color: ${colorPalette.background};

  transform: translate(-50%, -50%);
`;

export type MarkerProps = {
  coordinates: LngLat;
  title: string;
  description: string;
  zIndex?: number;
  markerColor: string;
  markerIcon: IconProp;
};

type Props = {
  onRemove: () => void;
};

export const Marker: React.FC<MarkerProps & Props> = (props) => {
  const { YMapMarker } = useYandexMaps();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  if (!YMapMarker) {
    return null;
  }

  return (
    <>
      <YMapMarker coordinates={props.coordinates}>
        <CustomMarker
          icon={props.markerIcon}
          color={props.markerColor}
          onClick={() => setIsPopupOpen(true)}
        />
      </YMapMarker>
      <MarkerPopup
        {...props}
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onRemove={props.onRemove}
      />
    </>
  );
};

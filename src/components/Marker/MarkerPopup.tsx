import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faTrash } from '@fortawesome/free-solid-svg-icons';

import { useYandexMaps } from '../../hooks/useYandexMaps';
import { colorPalette } from '../../colorPalette';
import { MarkerProps } from './Marker';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onRemove: () => void;
};

const Title = styled.div`
  color: ${colorPalette.primary};
  font-weight: 500;
  font-size: 18px;
`;

const Description = styled.div`
  color: ${colorPalette.secondary};
  font-size: 14px;
`;

const Popup = styled.div`
  border: 2px solid ${colorPalette.border};
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 12px;
  padding: 12px;
  position: absolute;
  top: -36px;
  left: 36px;
  width: 200px;
  background-color: ${colorPalette.popup};
`;

const CloseButton = styled(FontAwesomeIcon)`
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 10px;
  border-radius: 4px;
  background-color: ${colorPalette.button};
  height: 20px;
  width: 20px;

  &:hover {
    background-color: ${colorPalette.buttonHover};
  }
`;

const DeleteButton = styled(FontAwesomeIcon)`
  cursor: pointer;
  border-radius: 4px;
  background-color: ${colorPalette.border};
  color: ${colorPalette.accent};
  height: 16px;
  padding: 8px;

  &:hover {
    color: ${colorPalette.border};
    background-color: ${colorPalette.accent};
  }
`;

export const MarkerPopup: React.FC<MarkerProps & Props> = ({
  coordinates,
  title,
  description,
  zIndex,
  isOpen,
  onClose,
  onRemove,
}) => {
  const { YMapMarker } = useYandexMaps();

  if (!YMapMarker || !isOpen) {
    return null;
  }

  return (
    <YMapMarker
      coordinates={coordinates}
      zIndex={(zIndex ?? ymaps3.YMapMarker.defaultProps.zIndex) + 1_000}
      title={'blockBehaviorsblockBehaviorsblockBehaviorsblockBehaviors'}
      blockBehaviors
    >
      <Popup>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <CloseButton
          icon={faClose}
          color={colorPalette.iconSecondary}
          onClick={onClose}
        />
        <DeleteButton icon={faTrash} onClick={onRemove} />
      </Popup>
    </YMapMarker>
  );
};

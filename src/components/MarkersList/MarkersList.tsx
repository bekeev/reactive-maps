import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { colorPalette } from '../../colorPalette';
import { markerTemplates } from './constants';

const Container = styled.div`
  background-color: ${colorPalette.background};
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 24px;
  padding: 24px;
  position: absolute;
  opacity: 0.7;
  top: 0;
  transition: opacity 1s;
  right: 0;
  user-select: none;
  width: 200px;
  z-index: 1;

  &:hover {
    opacity: 1;
  }
`;

const MarkerContainer = styled.div<{
  isSelected: boolean;
  backgroundColor: string;
}>`
  background-color: ${({ isSelected, backgroundColor }) =>
    isSelected && backgroundColor};
  display: flex;
  gap: 8px;
  padding: 12px;
  border-radius: 12px;
`;

type Props = {
  selectedMarkerIdx?: number;
  setSelectedIdx: React.Dispatch<React.SetStateAction<number | undefined>>;
};

export const MarkersList: React.FC<Props> = ({
  selectedMarkerIdx,
  setSelectedIdx,
}) => {
  return (
    <Container>
      {markerTemplates.map(({ icon, name, iconColor }, index) => (
        <MarkerContainer
          key={name}
          isSelected={index === selectedMarkerIdx}
          onClick={() => setSelectedIdx(index)}
          backgroundColor={iconColor}
        >
          <FontAwesomeIcon
            icon={icon}
            color={
              index === selectedMarkerIdx
                ? colorPalette.iconSecondary
                : iconColor
            }
          />
          {name}
        </MarkerContainer>
      ))}
    </Container>
  );
};

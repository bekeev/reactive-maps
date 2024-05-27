import React, { useCallback } from 'react';
import { YMapLocationRequest } from 'ymaps3';
import { DomEvent, DomEventHandlerObject, LngLat } from '@yandex/ymaps3-types';
import { useYandexMaps } from '../../hooks/useYandexMaps';

type Props = {
  onAddMarker: (coordinates: LngLat) => void;
  setLocation: React.Dispatch<React.SetStateAction<YMapLocationRequest>>;
};

export const Listeners: React.FC<Props> = ({ onAddMarker, setLocation }) => {
  const { YMapListener } = useYandexMaps();

  const onFastClickListenerHandler = useCallback(
    (object: DomEventHandlerObject, event: DomEvent) => {
      if (object?.type !== 'marker' && event) {
        onAddMarker(event.coordinates);
      }
    },
    [onAddMarker],
  );

  if (!YMapListener) {
    return null;
  }

  return (
    <YMapListener
      onFastClick={onFastClickListenerHandler}
      onUpdate={setLocation}
    />
  );
};

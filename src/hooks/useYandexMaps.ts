import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';

export const useYandexMaps = () => {
  const [YMap, setYMap] = useState<any>(null);
  const [YMapDefaultSchemeLayer, setYMapDefaultSchemeLayer] =
    useState<any>(null);
  const [YMapDefaultFeaturesLayer, setYMapDefaultFeaturesLayer] =
    useState<any>(null);
  const [YMapMarker, setYMapMarker] = useState<any>(null);
  const [YMapListener, setYMapListener] = useState<any>(null);
  const [YMapDefaultMarker, setYMapDefaultMarker] = useState<any>(null);

  useEffect(() => {
    const loadMapModules = async () => {
      const ymaps3Reactify = await ymaps3.import('@yandex/ymaps3-reactify');

      const reactify = ymaps3Reactify.reactify.bindTo(React, ReactDOM);

      const {
        YMap,
        YMapDefaultSchemeLayer,
        YMapDefaultFeaturesLayer,
        YMapMarker,
        YMapListener,
      } = reactify.module(ymaps3);

      const { YMapDefaultMarker } = reactify.module(
        await ymaps3.import('@yandex/ymaps3-markers@0.0.1'),
      );

      setYMap(() => YMap);
      setYMapDefaultSchemeLayer(() => YMapDefaultSchemeLayer);
      setYMapDefaultFeaturesLayer(() => YMapDefaultFeaturesLayer);
      setYMapMarker(() => YMapMarker);
      setYMapListener(() => YMapListener);
      setYMapDefaultMarker(() => YMapDefaultMarker);
    };

    loadMapModules().catch((error) => console.error(error.message));
  }, []);

  return {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapMarker,
    YMapListener,
    YMapDefaultMarker,
  };
};

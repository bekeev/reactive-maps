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
  const [YMapClusterer, setYMapClusterer] = useState<any>(null);
  const [clusterByGrid, setClusterByGrid] = useState<any>(null);
  const [YMapFeatureDataSource, setYMapFeatureDataSource] = useState<any>(null);
  const [YMapLayer, setYMapLayer] = useState<any>(null);
  const [YMapFeature, setYMapFeature] = useState<any>(null);
  const [YMapControls, setYMapControls] = useState<any>(null);
  const [YMapGeolocationControl, setYMapGeolocationControl] =
    useState<any>(null);

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
        YMapFeatureDataSource,
        YMapLayer,
        YMapFeature,
        YMapControls,
      } = reactify.module(ymaps3);

      const { YMapDefaultMarker } = reactify.module(
        await ymaps3.import('@yandex/ymaps3-markers@0.0.1'),
      );

      const { YMapClusterer, clusterByGrid } = reactify.module(
        await ymaps3.import('@yandex/ymaps3-clusterer@0.0.1'),
      );

      const { YMapGeolocationControl } = reactify.module(
        await ymaps3.import('@yandex/ymaps3-controls@0.0.1'),
      );

      setYMap(() => YMap);
      setYMapDefaultSchemeLayer(() => YMapDefaultSchemeLayer);
      setYMapDefaultFeaturesLayer(() => YMapDefaultFeaturesLayer);
      setYMapMarker(() => YMapMarker);
      setYMapListener(() => YMapListener);
      setYMapDefaultMarker(() => YMapDefaultMarker);
      setYMapClusterer(() => YMapClusterer);
      setClusterByGrid(() => clusterByGrid);
      setYMapFeatureDataSource(() => YMapFeatureDataSource);
      setYMapLayer(() => YMapLayer);
      setYMapFeature(() => YMapFeature);
      setYMapControls(() => YMapControls);
      setYMapGeolocationControl(() => YMapGeolocationControl);
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
    YMapClusterer,
    clusterByGrid,
    YMapFeatureDataSource,
    YMapLayer,
    YMapFeature,
    YMapControls,
    YMapGeolocationControl,
  };
};

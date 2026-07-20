import React, {
  createContext,
  useMemo,
  useState,
} from 'react';

export const CoordonatesContext = createContext({
  coords: {
    longitude: 0,
    latitude: 0,
    longitudeDelta: 0,
    latitudeDelta: 0,
  },
  refCoords: {
    longitude: 0,
    latitude: 0,
    longitudeDelta: 0,
    latitudeDelta: 0,
  },
  saveCoords: () => {},
  saveMarkerCoords: () => {},
  forceSaveRefCoords: () => {},
});

const log = (...args) => {
  if (__DEV__) {
    console.log('[COORDS]', ...args);
  }
};

const CoordsProvider = ({
  children,
  value,
}) => {
  const { initDimensions, initialCoords } = value;

  const { width, height } =
    initDimensions;

  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.002;
  const LONGITUDE_DELTA =
    LATITUDE_DELTA * ASPECT_RATIO;

  const defaultCoords = useMemo(
    () => ({
      longitude:
        initialCoords.longitude,
      latitude:
        initialCoords.latitude,
      longitudeDelta:
        LONGITUDE_DELTA,
      latitudeDelta:
        LATITUDE_DELTA,
    }),
    [
      initialCoords,
      LONGITUDE_DELTA,
      LATITUDE_DELTA,
    ]
  );

  const [coords, setCoords] =
    useState(defaultCoords);

  const [refCoords, setRefCoords] =
    useState(defaultCoords);

  /**
   * Force une mise à jour des coordonnées
   * servant de référence pour le refresh
   * des marqueurs.
   */
  const forceSaveRefCoords = (
    newCoords = coords
  ) => {
    log('forceSaveRefCoords');

    setRefCoords({
      ...newCoords,
    });
  };

  /**
   * Utilisé lors de l'édition
   * d'un marqueur.
   */
  const saveMarkerCoords = newCoords => {
    log('saveMarkerCoords');

    setCoords(prev => ({
      ...prev,
      ...newCoords,
    }));
  };

  /**
   * Sauvegarde les coordonnées de la map.
   * Si le déplacement dépasse un seuil,
   * déclenche également une mise à jour
   * des coordonnées de référence.
   */
  const saveCoords = newCoords => {
    const longitudeDifference =
      Math.abs(
        refCoords.longitude -
          newCoords.longitude
      );

    const latitudeDifference =
      Math.abs(
        refCoords.latitude -
          newCoords.latitude
      );

    const NEED_REFRESH =
      longitudeDifference > 0.001 ||
      latitudeDifference > 0.001;

    if (NEED_REFRESH) {
      log(
        'Distance threshold reached, refreshing markers'
      );

      setRefCoords({
        ...newCoords,
      });
    }

    setCoords({
      ...newCoords,
    });
  };

  const contextValue = useMemo(
    () => ({
      coords,
      refCoords,
      saveCoords,
      forceSaveRefCoords,
      saveMarkerCoords,
    }),
    [coords, refCoords]
  );

  return (
    <CoordonatesContext.Provider
      value={contextValue}>
      {children}
    </CoordonatesContext.Provider>
  );
};

export default CoordsProvider;
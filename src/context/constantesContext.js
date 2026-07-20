import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { CoordonatesContext } from './coordonatesContext';
import fetcher from '../functions/fetcher';

export const ConstantesContext = createContext();

const EMPTY_MARKER = {
  id: 0,
  adresse: '',
  accesList: [],
};

const INITIAL_STATE = {
  markerList: [],
  showCreatMarkerModal: false,
  spinner: true,
  isConnected: false,
  selectedMarker: EMPTY_MARKER,
};

const log = (...args) => {
  if (__DEV__) {
    console.log('[CONSTANTES]', ...args);
  }
};

const ConstantesProvider = ({ children }) => {
  const [constantes, setConstantes] =
    useState(INITIAL_STATE);

  const { coords, refCoords } =
    useContext(CoordonatesContext);

  /**
   * Synchronise le state avec les données renvoyées
   * par l'API.
   */
  const syncMarkers = refresh => {
    if (!refresh) {
      setConstantes(prev => ({
        ...prev,
        spinner: false,
        isConnected: false,
      }));

      return false;
    }

    setConstantes(prev => ({
      ...prev,
      spinner: false,
      isConnected: true,
      markerList: [...refresh],
      selectedMarker: EMPTY_MARKER,
      showCreatMarkerModal: false,
    }));

    return true;
  };

  /**
   * Exécute une action API puis met à jour les marqueurs.
   */
  const apiAction = async (
    route,
    method,
    data
  ) => {
    try {
      setConstantes(prev => ({
        ...prev,
        spinner: true,
        isConnected: false,
      }));

      const response = await fetcher({
        route,
        method,
        data,
      });

      return syncMarkers(response?.refresh);
    } catch (error) {
      console.error(error);

      setConstantes(prev => ({
        ...prev,
        spinner: false,
      }));

      return false;
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                         Chargement initial des markers                      */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    const loadMarkers = async () => {
      if (constantes.showCreatMarkerModal) {
        return;
      }

      try {
        setConstantes(prev => ({
          ...prev,
          spinner: true,
          isConnected: false,
        }));

        const response = await fetcher({
          route: '/findAllMarkers&Acces',
          method: 'POST',
          data: refCoords,
        });

        setConstantes(prev => ({
          ...prev,
          spinner: false,
          isConnected: !!response,
          markerList: response || [],
        }));
      } catch (error) {
        console.error(error);

        setConstantes(prev => ({
          ...prev,
          spinner: false,
          isConnected: false,
        }));
      }
    };

    loadMarkers();
  }, [refCoords]);

  /* -------------------------------------------------------------------------- */
  /*                              UI Helpers                                    */
  /* -------------------------------------------------------------------------- */

  const fetchMode = () => {
    setConstantes(prev => ({
      ...prev,
      spinner: true,
      isConnected: false,
    }));
  };

  const refreshConstantes = () => {
    setConstantes(prev => ({ ...prev }));
  };

  const showFechedMarkers = data => {
    setConstantes(prev => ({
      ...prev,
      markerList: [...data],
      spinner: false,
      isConnected: true,
      showCreatMarkerModal: false,
    }));
  };

  const deselectMarker = () => {
    setConstantes(prev => ({
      ...prev,
      selectedMarker: EMPTY_MARKER,
    }));
  };

  const setSelectMarker = marker => {
    setConstantes(prev => ({
      ...prev,
      selectedMarker: marker,
    }));
  };

  const showCreateMarkerModale = () => {
    setConstantes(prev => ({
      ...prev,
      showCreatMarkerModal: true,
    }));
  };

  const hideCreateMarkerModale = () => {
    setConstantes(prev => ({
      ...prev,
      showCreatMarkerModal: false,
    }));
  };

  /* -------------------------------------------------------------------------- */
  /*                               MARKERS                                      */
  /* -------------------------------------------------------------------------- */

  const createMarker = async ({
    adresse,
    code,
    accesType,
  }) => {
    if (!code?.trim()) {
      alert('Vous devez entrer un code');
      return;
    }

    const response = await fetcher({
      route: '/createMarker',
      method: 'POST',
      data: {
        adresse,
        latitude: coords.latitude,
        longitude: coords.longitude,
        author: 'Jaffleman',
        acces: [
          {
            type: accesType,
            code,
          },
        ],
      },
    });

    syncMarkers(response?.refresh);
  };

  const updateMarker = async marker => {
    if (!marker?.id) {
      return;
    }

    await apiAction(
      '/updateMarker',
      'PUT',
      {
        isLast: true,
        marker: {
          ...marker,
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
      }
    );
  };

  const deleteMarker = async () => {
    const id =
      constantes.selectedMarker?.id;

    if (!id) {
      return;
    }

    await apiAction(
      '/deleteMarker',
      'DELETE',
      {
        isLast: true,
        marker: {
          id,
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
      }
    );
  };

  /* -------------------------------------------------------------------------- */
  /*                                 ACCES                                      */
  /* -------------------------------------------------------------------------- */

  const createAcces = async accesList => {
    if (!accesList?.length) {
      return;
    }

    await apiAction(
      '/createAcces',
      'POST',
      {
        isLast: true,
        accesList,
      }
    );
  };

  const updateAcces = async accesList => {
    if (!accesList?.length) {
      return;
    }

    await apiAction(
      '/updateAcces',
      'PUT',
      {
        isLast: true,
        accesList,
      }
    );
  };

  const deleteAcces = async accesList => {
    if (!accesList?.length) {
      return;
    }

    await apiAction(
      '/deleteAcces',
      'DELETE',
      {
        isLast: true,
        accesList,
      }
    );
  };

  /* -------------------------------------------------------------------------- */
  /*                                  Provider                                  */
  /* -------------------------------------------------------------------------- */

  return (
    <ConstantesContext.Provider
      value={{
        constantes,
        setConstantes,

        showFechedMarkers,
        fetchMode,
        refreshConstantes,

        createMarker,
        updateMarker,
        deleteMarker,

        createAcces,
        updateAcces,
        deleteAcces,

        setSelectMarker,
        deselectMarker,

        showCreateMarkerModale,
        hideCreateMarkerModale,
      }}>
      {children}
    </ConstantesContext.Provider>
  );
};

export default ConstantesProvider;
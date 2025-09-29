import { useEffect } from 'react';
import fetcher from '../functions/fetcher';

const useMarkers = (dataToFetch, constantes, setConstantes) => {
  useEffect(() => {
    if (Object.keys(dataToFetch).length) {
      setConstantes((prev) => ({ ...prev, spinner: true, isConnected: false }));
      fetcher(dataToFetch);
    }
  }, [dataToFetch]);
};

export default useMarkers;

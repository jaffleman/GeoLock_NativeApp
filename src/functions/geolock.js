import fetcher from './fetcher';

/* -------------------------------------------------------------------------- */
/*                                MARKERS API                                 */
/* -------------------------------------------------------------------------- */

async function getMarkersFromApi(coords) {
  const result = await fetcher({
    route: '/findAllMarkers&Acces',
    method: 'POST',
    data: coords,
  });

  if (!result?.isConnected) {
    return [];
  }

  return result.jData || [];
}

/* -------------------------------------------------------------------------- */
/*                                  GEOLOCK                                   */
/* -------------------------------------------------------------------------- */

const geolock = {
  /* ---------------------------------------------------------------------- */
  /*                              POSITION                                   */
  /* ---------------------------------------------------------------------- */

  getPosition(setDataToFetch, logMargin = '') {
    // à implémenter
  },

  /* ---------------------------------------------------------------------- */
  /*                               MARKERS                                   */
  /* ---------------------------------------------------------------------- */

  async getMarkers(coords) {
    return getMarkersFromApi(coords);
  },

  /* ---------------------------------------------------------------------- */
  /*                            CREATION MARKER                              */
  /* ---------------------------------------------------------------------- */

  async sendToBase(
    adresse,
    code,
    accesType,
    constantes,
    setConstantes
  ) {
    if (!code?.trim()) {
      alert('Vous devez entrer un code!');
      return false;
    }

    const result = await fetcher({
      route: '/create',
      method: 'POST',
      data: {
        adresse,
        latitude: constantes.coordonates.latitude,
        longitude: constantes.coordonates.longitude,
        acces: [
          {
            type: accesType,
            code,
          },
        ],
      },
    });

    if (!result?.isConnected) {
      return false;
    }

    setConstantes(prev => ({
      ...prev,
      showModal: false,
      spinner: false,
      isConnected: true,
    }));

    return true;
  },

  /* ---------------------------------------------------------------------- */
  /*                         COMPARAISON DE MARKERS                          */
  /* ---------------------------------------------------------------------- */

  objectComparator(source, alter) {
    if (
      typeof source !== 'object' ||
      typeof alter !== 'object' ||
      !source ||
      !alter
    ) {
      return {
        newMarker: {},
        newAcces: [],
        updatedAcces: [],
        deletedAcces: [],
      };
    }

    const newMarker = {};
    const newAcces = [];
    const updatedAcces = [];
    const deletedAcces = [];

    if (
      source.adresse?.trim() !==
      alter.adresse?.trim()
    ) {
      newMarker.id = source.id;
      newMarker.adresse = alter.adresse;
    }

    alter.accesList?.forEach(acces => {
      switch (acces.identifier) {
        case 0:
          deletedAcces.push({ ...acces });
          break;

        case 1:
          newAcces.push({ ...acces });
          break;

        case 2:
          updatedAcces.push({ ...acces });
          break;

        default:
          break;
      }
    });

    return {
      newMarker,
      newAcces,
      updatedAcces,
      deletedAcces,
    };
  },
};

export default geolock;
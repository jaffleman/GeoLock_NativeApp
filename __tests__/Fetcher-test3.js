import fetcher from '../src/functions/fetcher';
jest.setTimeout(15000); // 15 secondes pour tous les tests

jest.mock('@env', () => ({
  REACT_APP_ROUTE: 'https://ipv6.mock',
  LOCAL_APP_ROUTE2: 'https://ipv4.mock',
}));

let abortMock;
let clearTimeoutMock;
let fetchMock;

beforeEach(() => {
  abortMock = jest.fn();
  clearTimeoutMock = jest.fn();
  fetchMock = jest.fn();

  global.AbortController = function () {
    this.signal = { aborted: false };
  };
  global.AbortController.prototype.abort = abortMock;

  global.clearTimeout = clearTimeoutMock;
  global.fetch = fetchMock;
});

describe('fetcher', () => {
  it('should call callback with IPv6 response and abort IPv4', async () => {
    const mockCallback = jest.fn();

    fetchMock.mockImplementation((url) => {
      if (url.startsWith('https://api.jaffleman.tech/geolock/')) {
        return Promise.resolve({
          json: () => Promise.resolve({ success: 'ipv6 response' }),
        });
      }
      if (url.startsWith('http://82.64.128.239:3244/geolock/')) {
        return new Promise(() => {}); // IPv4 reste en attente
      }
    });

    await new Promise(resolve => {
      fetcher({
        route: '/test',
        method: 'POST',
        data: { key: 'value' },
        callback: result => {
          mockCallback(result);
          resolve();
        },
      }, '[TEST] ');
    });

    expect(mockCallback).toHaveBeenCalledWith({ success: 'ipv6 response' });
    expect(abortMock).toHaveBeenCalledWith('ipv6 request completed');
    expect(clearTimeoutMock).toHaveBeenCalled();
  });

  it('should call callback with IPv4 response and abort IPv6', async () => {
    const mockCallback = jest.fn();

    fetchMock.mockImplementation((url) => {
      if (url.startsWith('https://api.jaffleman.tech/geolock/')) {
        return new Promise(() => {}); // IPv6 reste en attente
      }
      if (url.startsWith('http://82.64.128.239:3244/geolock/')) {
        return Promise.resolve({
          json: () => Promise.resolve({ success: 'ipv4 response' }),
        });
      }
    });

    await new Promise(resolve => {
      fetcher({
        route: '/test',
        method: 'POST',
        data: { key: 'value' },
        callback: result => {
          mockCallback(result);
          resolve();
        },
      }, '[TEST] ');
    });

    expect(mockCallback).toHaveBeenCalledWith({ success: 'ipv4 response' });
    expect(abortMock).toHaveBeenCalledWith('ipv4 request completed');
    expect(clearTimeoutMock).toHaveBeenCalled();
  });

  it('should call callback with false when both requests fail', async () => {
    const mockCallback = jest.fn();

    fetchMock.mockRejectedValue(new TypeError('Network request failed'));

    await new Promise(resolve => {
      fetcher({
        route: '/test',
        method: 'POST',
        data: { key: 'value' },
        callback: result => {
          mockCallback(result);
          resolve();
        },
      }, '[TEST] ');
    });

    expect(mockCallback).toHaveBeenCalledWith(false);
    expect(clearTimeoutMock).toHaveBeenCalled();
  });

    it('should call callback with false when timeout is reached', async () => {
        jest.useFakeTimers(); // ✅ active les timers simulés

        const mockCallback = jest.fn();

        // Simule des requêtes qui ne répondent jamais
        fetchMock.mockImplementation(() => new Promise(() => {}));

        // Appel de la fonction
        fetcher({
            route: '/test',
            method: 'POST',
            data: { key: 'value' },
            callback: mockCallback,
        }, '[TEST] ');

        // Avance le temps de 10 secondes
        jest.advanceTimersByTime(10000);

        // Force l'exécution des timers
        jest.runOnlyPendingTimers();

        // Attend que le callback soit appelé
        await Promise.resolve();

        // Vérifications
        expect(mockCallback).toHaveBeenCalledWith(false);
        expect(abortMock).toHaveBeenCalledWith('over time');

        jest.useRealTimers(); // ✅ remet les timers réels
    });

  it('should handle empty data and still call callback', async () => {
    const mockCallback = jest.fn();

    fetchMock.mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ success: 'empty data response' }),
    }));

    await new Promise(resolve => {
      fetcher({
        route: '/test',
        method: 'POST',
        data: null,
        callback: result => {
          mockCallback(result);
          resolve();
        },
      }, '[TEST] ');
    });

    expect(mockCallback).toHaveBeenCalledWith({ success: 'empty data response' });
  });

  it('should use default callback if none is provided', async () => {
    fetchMock.mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve({ success: 'default callback response' }),
    }));
    const callback = jest.fn();

    await new Promise(resolve => {
      fetcher({
        route: '/test',
        method: 'POST',
        data: { key: 'value' },
      }, '[TEST] ');
      setTimeout(resolve, 0);
    });

    expect(clearTimeoutMock).toHaveBeenCalled();
  });
});
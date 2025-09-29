import fetcher from '../src/functions/fetcher';

global.fetch = jest.fn(); //

const mockCallback = jest.fn();

/**
 * Mock data and parameters for testing
 */
const mockData = { key: 'value' };
const mockRoute = 'testRoute';
const mockMethod = 'POST';

const mockResponse = [// Example response data
  {
    id: 1,
    latitude: 48.75839,
    longitude: 2.39559,
    accesList: [],
    adresse: 'Adresse 1',
    author: 'Author 1',
    createdDate: 'Date 1',
  },
];
const mockNoDataResponse = {};

describe('fetcher function', () => {
  beforeEach(() => {
    fetch.mockClear();
    mockCallback.mockClear();
  });

  test('should fetch successfully using IPv6', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => mockResponse,
    });

    await fetcher({
      route: mockRoute,
      method: mockMethod,
      data: mockData,
      callback: mockCallback,
    });

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining(mockRoute), expect.any(Object));
    expect(mockCallback).toHaveBeenCalledWith({
      isConnected: true,
      jData: mockResponse,
    });
  });

  test('should fallback to IPv4 if IPv6 fails', async () => {
    fetch
      .mockRejectedValueOnce(new Error('IPv6 failed'))
      .mockResolvedValueOnce({
        json: async () => mockResponse,
      });

    await fetcher({
      route: mockRoute,
      method: mockMethod,
      data: mockData,
      callback: mockCallback,
    });

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenCalledWith({
      isConnected: true,
      jData: mockResponse,
    });
  });

  test('should handle total failure of both IPv6 and IPv4', async () => {
    fetch
      .mockRejectedValueOnce(new Error('IPv6 failed'))
      .mockRejectedValueOnce(new Error('IPv4 failed'));

    await fetcher({
      route: mockRoute,
      method: mockMethod,
      data: mockData,
      callback: mockCallback,
    });

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(mockCallback).toHaveBeenCalledWith({
      isConnected: false,
      jData: {},
    });
  });

  test('should transform jData if acces_id is not present', async () => {
    const transformedResponse = [
      { id: 1, name: 'Marker 1' },
      { id: 2, name: 'Marker 2' },
    ];

    fetch.mockResolvedValueOnce({
      json: async () => transformedResponse,
    });

    await fetcher({
      route: mockRoute,
      method: mockMethod,
      data: mockData,
      callback: mockCallback,
    });

    expect(mockCallback).toHaveBeenCalledWith({
      isConnected: true,
      jData: transformedResponse,
    });
  });
});

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Map from './wayfinding/components/Map/map.tsx';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { PermissionsAndroid } from 'react-native';

// Mocking Mapbox and Geolocation
jest.mock('@rnmapbox/maps');
jest.mock('react-native-geolocation-service');

const mockStore = configureStore([]);
let store;

beforeEach(() => {
  store = mockStore({
    location: {
      userLocation: [0, 0],
      centerLocation: [0, 0],
      isSearching: false,
      zoomLevel: 10,
      viewMode: 'default'
      // ... other initial state values
    }
    // ... other slices of state
  });

  // Mock Permissions
  jest.spyOn(PermissionsAndroid, 'request').mockResolvedValue('granted');

  render(
    <Provider store={store}>
      <Map />
    </Provider>
  );
});

test('renders the Map component', async () => {
  const { getByTestId } = render(<Map />);
  await waitFor(() => {
    expect(getByTestId('map-view')).toBeTruthy();
  });
});



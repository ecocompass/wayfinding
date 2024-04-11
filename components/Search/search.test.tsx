import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SearchBox from '../wayfinding/components/Search/search.tsx'; 
import * as networkService from '../../services/network.service';
import debounce from 'lodash/debounce';

jest.mock('lodash/debounce', () => jest.fn((fn) => fn));
jest.mock('../../services/network.service');

const mockStore = configureStore([]);

describe('SearchBox Component', () => {
  let store;
  let mockDispatch;

  beforeEach(() => {
    store = mockStore({
      location: {
        isSearching: false,
        userLocation: [0, 0], // Sample longitude and latitude
        centerLocation: [0, 0],
      },
    });

    mockDispatch = jest.fn();
    store.dispatch = mockDispatch;

    networkService.geoCodeApi.mockResolvedValue({
      features: [
        { id: '1', properties: {}, center: [0, 0], text: 'Location 1', place_name: 'Address 1' },
        // Add more mock locations if necessary
      ],
    });
  });

  it('renders correctly and allows searching', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <SearchBox onLocationSelect={() => {}} />
      </Provider>
    );

    const input = getByPlaceholderText('Take me somewhere');
    fireEvent.changeText(input, 'Location 1');

    await waitFor(() => expect(debounce).toHaveBeenCalled());
    await waitFor(() => expect(networkService.geoCodeApi).toHaveBeenCalledWith('Location 1', '0,0'));

    const searchResult = getByText('Location 1');
    expect(searchResult).toBeTruthy();
  });

  it('responds to touch events correctly', async () => {
    const onLocationSelectMock = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <SearchBox onLocationSelect={onLocationSelectMock} />
      </Provider>
    );

    const input = getByPlaceholderText('Take me somewhere');
    fireEvent.changeText(input, 'Location 1');

    await waitFor(() => expect(networkService.geoCodeApi).toHaveBeenCalled());

    const searchResult = getByText('Location 1');
    fireEvent.press(searchResult);

    expect(onLocationSelectMock).toHaveBeenCalledWith(expect.objectContaining({
      id: '1',
      name: 'Location 1',
      address: 'Address 1',
      center: [0, 0]
    }));
  });

});

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PreviewNavigate from '../wayfinding/components/Map/preview-navigate.tsx'; // Update with correct path

const mockStore = configureStore([]);

describe('PreviewNavigate Component', () => {
  let store;
  let mockDispatch;

  beforeEach(() => {
    store = mockStore({
      location: {
        routes: {
          walk: 'some_route',
        },
      },
    });
    mockDispatch = jest.fn();
    store.dispatch = mockDispatch;
  });

  it('should render and allow path selection', () => {
    const onRenderMock = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <PreviewNavigate onRender={onRenderMock} />
      </Provider>
    );

    const driveButton = getByText('Drive');
    fireEvent.press(driveButton);

    expect(onRenderMock).toHaveBeenCalledWith('some_route');
  });

  it('should update view mode on button press', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <PreviewNavigate onRender={jest.fn()} />
      </Provider>
    );

    const closeButton = getByTestId('close-button'); // Ensure you add testID='close-button' to your X Button component
    fireEvent.press(closeButton);

    expect(mockDispatch).toHaveBeenCalledWith(updateViewMode(VIEWMODE.search));
  });

  // Add more tests as necessary
});

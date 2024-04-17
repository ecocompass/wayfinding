import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Preference from '../components/Preference/preference';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

let mockStore = configureMockStore();
const store=mockStore( [])

describe('Preference Component', () => {


  it('renders correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <GluestackUIProvider config={config}>
        <Preference />
        </GluestackUIProvider>
      </Provider>
    );

    expect(getByText('Set Your Preferences')).toBeTruthy();
   // expect(getByText('Biking')).toBeTruthy();
    // Add more assertions for other preferences
  });

 /*  it('toggles preference selection on press', () => {
    const { getByText, rerender } = render(
      <Provider store={store}>
        <Preference />
      </Provider>
    );

    const bikingPreference = getByText('Biking');
    fireEvent.press(bikingPreference);

    // Re-render to see if the state has updated
    rerender(
      <Provider store={store}>
        <Preference />
      </Provider>
    );

  });

  it('dispatches correct action on submit', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Preference />
      </Provider>
    );

    fireEvent.press(getByText('Submit'));

    const actions = store.getActions();
    expect(actions.length).toBe(1);
    expect(actions[0]).toEqual({
      // Expected action object
      type: 'YOUR_ACTION_TYPE',
      payload: {
        // Expected payload
      },
    });
  }); */
});

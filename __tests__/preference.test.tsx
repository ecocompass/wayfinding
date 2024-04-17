import React from 'react';
import { render, } from '@testing-library/react-native';

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
  });
});

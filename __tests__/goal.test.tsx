import React from 'react';
import { render, } from '@testing-library/react-native';

import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import Goals from '../components/Goals/user-goals';

let mockStore = configureMockStore();
const store=mockStore( [])

describe('Goal Component', () => {


  it('renders correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <GluestackUIProvider config={config}>
        <Goals />
        </GluestackUIProvider>
      </Provider>
    );

    expect(getByText('Set Your Weekly Goals')).toBeTruthy();
  });
});

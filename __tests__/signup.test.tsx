// AuthComponent.test.tsx
import React from "react";
import { render } from "@testing-library/react-native";

import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import Signup from "../components/Auth/signup";

let mockStore = configureMockStore();
const store = mockStore([])
describe("SignupComponent", () => {

  it('should render email and password fields', () => {
    const { getByPlaceholderText } = render(<Provider store={store}>   <GluestackUIProvider config={config}><Signup />   </GluestackUIProvider></Provider>);

    expect(getByPlaceholderText('Email')).toBeTruthy();
  });


});
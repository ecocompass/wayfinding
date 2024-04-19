// AuthComponent.test.tsx
import React from "react";
import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import Auth from "../components/Auth/login";

let mockStore = configureMockStore();
const store = mockStore([])
describe("AppComponent", () => {

  it('should render correctly', () => {
    const { getByPlaceholderText } = render(<Provider store={store}>   <GluestackUIProvider config={config}> <Auth/></GluestackUIProvider></Provider>);

    expect(getByPlaceholderText('Email')).toBeTruthy();
  });


});
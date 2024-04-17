// AuthComponent.test.tsx
import React from "react";
import { render } from "@testing-library/react-native";
import Map from "../components/Map/map";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

let mockStore = configureMockStore();
const store = mockStore([])
describe("MapComponent", () => {

  it('should render search box correctly', () => {
    const { getByPlaceholderText } = render(<Provider store={store}>   <GluestackUIProvider config={config}><Map />   </GluestackUIProvider></Provider>);

    expect(getByPlaceholderText('Take me somewhere')).toBeTruthy();
  });


});
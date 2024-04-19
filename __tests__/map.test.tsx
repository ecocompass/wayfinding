
import React from "react";
import { render } from "@testing-library/react-native";
import Map from "../components/Map/map";
import { Provider } from "react-redux";
import configureMockStore from 'redux-mock-store';
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import Profile from "../components/Settings/profile";

jest.mock('@rnmapbox/maps');
jest.mock('react-native-geolocation-service');
let mockStore = configureMockStore();
const store = mockStore({
    userDetails:{
        profile:{
            first_name:'',
            last_name:''
        }
    }
})
describe("MapComponent", () => {

    it('should render search box correctly', () => {
        const { getByText } = render(<Provider store={store}>   <GluestackUIProvider config={config}><Profile />   </GluestackUIProvider></Provider>);
        expect(getByText('+353 213193212')).toBeTruthy();
    });


});
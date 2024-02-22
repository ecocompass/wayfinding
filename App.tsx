import React, { useEffect, useState } from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import Map from "./components/Map/map";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from "./components/Auth/signup";
import Login from "./components/Auth/login"
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { Provider } from 'react-redux';
import store from './store';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <RootSiblingParent>
        <GluestackUIProvider config={config}>
          <NavigationContainer>
            <Stack.Navigator>
              {/* <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              /> */}
              <Stack.Screen name="Register"
              component={Signup}
              options={{ headerShown: false }}/>
              <Stack.Screen
                options={{ headerShown: false }}
                name="Map"
                component={Map}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </GluestackUIProvider>
      </RootSiblingParent>
    </Provider>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import Map from "./components/Map/map";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "./components/Auth/login";
import Signup from "./components/Auth/signup";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <RootSiblingParent>
      <GluestackUIProvider config={config}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="Map"
              component={Map}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </GluestackUIProvider>
    </RootSiblingParent>
  );
};

export default App;

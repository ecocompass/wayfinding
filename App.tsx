import React, { useEffect, useState } from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import Map from "./components/Map/map";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "./components/Auth/login";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Auth"
            component={Auth}
            /*  options={{ title: 'Welcome' }} */
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Map"
            component={Map}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import Map from "./components/Map/map";

const App = () => {
  return (
    <RootSiblingParent>
        <Map/>
    </RootSiblingParent>
  );
};

export default App;

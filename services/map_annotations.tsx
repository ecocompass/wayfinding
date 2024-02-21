/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import { ImageBackground } from "@gluestack-ui/themed";
import Mapbox from "@rnmapbox/maps";
import { View, Image,StyleSheet } from "react-native";

const defaultPointStyle = {
  height: 20,
  width: 20,
  backgroundColor: "#00cccc",
  borderRadius: 15,
  borderColor: "#fff",
  borderWidth: 1,
};

const customStyle = {
  width: 20,
  height: 20,
  backgroundColor: '#a55eea',
  borderRadius: 15,
  borderBottomEndRadius: 0,
  position:'relative',
  transform: [{rotateY: '45deg'}],
};


export function getPointAnnotation(options: any) {
  return (
    <Mapbox.PointAnnotation
      id={options.id}
      coordinate={options.coordinates}
      key={options.id}
    >
      <Mapbox.Callout title={'End'} style={{minWidth: 200}} />
    </Mapbox.PointAnnotation>
  );
}

export function getLineAnnotation(options: any) {
  return (
    <Mapbox.ShapeSource id="shapeSource" shape={options.route}>
      <Mapbox.LineLayer
        id="lineLayer"
        style={{
          lineWidth: 3,
          lineJoin: "bevel",
          lineColor: "#0000ff",
        }}
      />
    </Mapbox.ShapeSource>
  );
}

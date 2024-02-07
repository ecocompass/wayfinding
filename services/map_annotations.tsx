import Mapbox from "@rnmapbox/maps";
import { View } from "react-native";

const defaultPointStyle = {
  height: 20,
  width: 20,
  backgroundColor: "#00cccc",
  borderRadius: 15,
  borderColor: "#fff",
  borderWidth: 1,
};

export function getAnnotation(type: string, options: any) {
  switch (type) {
    case "POINT":
      return (
        <Mapbox.PointAnnotation
          id={options.currentLocation}
          coordinate={options.coordinates}
        >
          <View style={defaultPointStyle} />
        </Mapbox.PointAnnotation>
      );

    default:
      return;
  }
}

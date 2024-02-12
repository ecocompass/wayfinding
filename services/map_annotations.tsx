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

export function getPointAnnotation(options: any) {
  return (
    <Mapbox.PointAnnotation
      id={options.id}
      coordinate={options.coordinates}
      key={options.id}
    >
      <View style={defaultPointStyle} />
    </Mapbox.PointAnnotation>
  );
}

export function getLineAnnotation(options: any) {
  return(
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
  )
}

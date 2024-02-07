import React, { useEffect, useState } from "react";
import { StyleSheet, View, PermissionsAndroid, Platform } from "react-native";

import Geolocation from "react-native-geolocation-service";
import Toast from "react-native-root-toast";
import Mapbox from "@rnmapbox/maps";
import { getAnnotation } from "../../services";

Mapbox.setAccessToken(
  "pk.eyJ1IjoiZWxlY3Rybzc1IiwiYSI6ImNscnRlcWJ1eDAxN2QycW82cXp5MWZsbXMifQ.ZlRWWO347Yae46luSV8BCA"
);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: 900,
    width: 720,
  },
  map: {
    flex: 1,
  },
});

// Function to get permission for location from system
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Geolocation Permission",
        message: "Can we access your location?",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (granted === "granted") {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};

const Map = ({ navigation }: any) => {
  const [currentLocation, setCurrentLocation] = useState([0, 0]); // Longitude, Latitude

  //   let startingPoint = [-6.2653554, 53.324153];
  let destinationPoint = [-6.2650513, 53.3256942];

  useEffect(() => {
    if (Platform.OS === "android") {
      const result = requestLocationPermission().then((res) => {
        if (res) {
          Geolocation.getCurrentPosition(
            (position) => {
              setCurrentLocation([
                position.coords.longitude,
                position.coords.latitude,
              ]);
            },
            (error) => {
              console.log(error.code, error.message);
              setDefaultLocation();
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          );
        }
      });
    } else {
      setDefaultLocation();
    }
  }, []);

  const setDefaultLocation = () => {
    setCurrentLocation([0, 0]);
  };

  const getLocationData = async (data: any) => {
    try {
      // const response = await fetch('https://reactnative.dev/movies.json');

      const response = await fetch(
        `http://ecocompass.anupal.me/test-core?latitude=${encodeURIComponent(
          data.latitude
        )}&longitude=${encodeURIComponent(data.longitude)}`,
        { method: "GET" }
      );

      const json = await response.json();
      Toast.show(json.message, {
        duration: 10000,
      });
      console.log(json);
    } catch (error) {
      // console.error(error);
    } finally {
      // setLoading(false);
    }
  };

  const getUserClickLoc = function (loc) {
    let locObj = loc.nativeEvent.coordinate;
    getLocationData({
      latitude: locObj.latitude,
      longitude: locObj.longitude,
    });
  };

  const route: any = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [
            [-6.253514221969283, 53.34197087957193],
            [-6.254546411906972, 53.34218338120337],
            [-6.255037591946149, 53.34133336832366],
            [-6.255316230006258, 53.34081162120549],
            [-6.25694831451014, 53.34111464795052],
            [-6.2582200014513205, 53.341304780469216],
            [-6.258598167373265, 53.34016396778034],
            [-6.258777297322979, 53.339510363304754],
            [-6.260190443661884, 53.33982528301698],
            [-6.260688030400814, 53.33991441081503],
            [-6.261334893161802, 53.339058776262846],
          ],
        },
      },
    ],
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView style={styles.map}>
          <Mapbox.Camera
            zoomLevel={18}
            centerCoordinate={currentLocation}
            animationMode={"flyTo"}
            animationDuration={2000}
          />
          {getAnnotation("POINT", {
            coordinates: currentLocation,
            id: "currentLocation",
          })}
          <Mapbox.PointAnnotation
            id="destinationPointAnnotation"
            coordinate={destinationPoint}
          >
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: "#00cccc",
                borderRadius: 15,
                borderColor: "#fff",
                borderWidth: 1,
              }}
            />
          </Mapbox.PointAnnotation>
          {route && (
            <Mapbox.ShapeSource id="shapeSource" shape={route}>
              <Mapbox.LineLayer
                id="lineLayer"
                style={{
                  lineWidth: 3,
                  lineJoin: "bevel",
                  lineColor: "#0000ff",
                }}
              />
            </Mapbox.ShapeSource>
          )}
        </Mapbox.MapView>
      </View>
    </View>
  );
};

export default Map;

/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
import React, { useEffect, useState } from "react";
import { StyleSheet, View, PermissionsAndroid, Platform } from "react-native";

import Geolocation from "react-native-geolocation-service";

import Mapbox from "@rnmapbox/maps";
import { Icon, Input, InputField, InputIcon, InputSlot, SearchIcon, Textarea, TextareaInput } from "@gluestack-ui/themed";
import { SearchBar } from "react-native-screens";
import { getPointAnnotation, getLineAnnotation } from "../../services";

Mapbox.setAccessToken(
  "pk.eyJ1IjoiZWxlY3Rybzc1IiwiYSI6ImNscnRlcWJ1eDAxN2QycW82cXp5MWZsbXMifQ.ZlRWWO347Yae46luSV8BCA"
);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    bottom: '25%'
  },
  container: {
    height: '50%',
    width: '100%',
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
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: any) => {
    setSearchQuery(query);
    // Logic to handle search query with the map (e.g., filtering markers, searching locations) goes here
  };
  //   let startingPoint = [-6.2653554, 53.324153];
  let destinationPoint = [-6.2650513, 53.3256942];
  const [renderedPoints, setRenderedPoints] = useState<any>([])

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

  // sample route
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

  const userLocationUpdate = (data: any) => {
  };

  const getClickedPoint = (feature: any) => {
    setRenderedPoints([getPointAnnotation({id: 'abc', coordinates: feature.geometry.coordinates})])
  }

  const pointsArr = (coords: any, id: any) => {
    getPointAnnotation({
      coordinates: coords,
      id: id,
    })
  }

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView
          style={styles.map}
          onPress={getClickedPoint}
        >
          <Mapbox.Camera
            zoomLevel={14}
            centerCoordinate={currentLocation}
            animationMode={"flyTo"}
            animationDuration={2000}
          />
          {renderedPoints}
          <Mapbox.UserLocation onUpdate={userLocationUpdate} />
          {/* {route && getLineAnnotation({ route })} */}
        </Mapbox.MapView>
        <Input
          variant="rounded"
          size="md"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
          m="$2"
        ><InputSlot pl="$3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField placeholder="Search here baby..." />
        </Input>
      </View>
    </View>
  );
};

export default Map;

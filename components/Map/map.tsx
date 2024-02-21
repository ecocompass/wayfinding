/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
import React, { useEffect, useState } from "react";
import { StyleSheet, View, PermissionsAndroid, Platform, } from "react-native";

import Geolocation from "react-native-geolocation-service";

import Mapbox from "@rnmapbox/maps";
import { getPointAnnotation, getLineAnnotation } from "../../services";
import { SearchBox } from "../Search/search";
import { MAPBOX_PUBLIC_TOKEN } from "../../constants";
import { useSelector, useDispatch } from 'react-redux';
import { setCenter, setLocation, setSearchStatus } from "../../store/actions/setLocation";
import { Card, Heading, Text, Button, ButtonText } from "@gluestack-ui/themed";

Mapbox.setAccessToken(
  MAPBOX_PUBLIC_TOKEN
);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    bottom: '10%',
  },
  container: {
    height: '100%',
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
  let userLocation = useSelector((state: any) => {
    return state.location.userLocation}); // Longitude, Latitude

  let centerLocation = useSelector((state: any) => {
    return state.location.centerLocation
  });

  let isSearching = useSelector((state: any) => {
    return state.location.isSearching
  });

  let [isLocationSelected, setLocationCard] = useState(false)
  let [locationData, setLocationData] = useState<any>({})
  const dispatch = useDispatch();

  //   let startingPoint = [-6.2653554, 53.324153];
  let destinationPoint = [-6.2650513, 53.3256942];
  const [renderedPoints, setRenderedPoints] = useState<any>([])

  useEffect(() => {
    if (Platform.OS === "android") {
      const result = requestLocationPermission().then((res) => {
        if (res) {
          Geolocation.getCurrentPosition(
            (position) => {
              dispatch(setCenter([position.coords.longitude, position.coords.latitude]));
              dispatch(setLocation([position.coords.longitude, position.coords.latitude]));
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
    console.log('default')
    dispatch(setLocation([0,0]))
  };

  // sample route
  // const route: any = {
  //   type: "FeatureCollection",
  //   features: [
  //     {
  //       type: "Feature",
  //       properties: {},
  //       geometry: {
  //         type: "LineString",
  //         coordinates: [
  //           [-6.253514221969283, 53.34197087957193],
  //           [-6.254546411906972, 53.34218338120337],
  //           [-6.255037591946149, 53.34133336832366],
  //           [-6.255316230006258, 53.34081162120549],
  //           [-6.25694831451014, 53.34111464795052],
  //           [-6.2582200014513205, 53.341304780469216],
  //           [-6.258598167373265, 53.34016396778034],
  //           [-6.258777297322979, 53.339510363304754],
  //           [-6.260190443661884, 53.33982528301698],
  //           [-6.260688030400814, 53.33991441081503],
  //           [-6.261334893161802, 53.339058776262846],
  //         ],
  //       },
  //     },
  //   ],
  // };

  const userLocationUpdate = (data: any) => {
  };

  const selectLocation = (data: any) => {
    setLocationData(data);
    dispatch(setSearchStatus(false))
    setRenderedPoints([getPointAnnotation({id: 'abc', coordinates: data.center})])
  }

  const getClickedPoint = (feature: any) => {
    dispatch(setCenter(feature.geometry.coordinates))
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
            centerCoordinate={centerLocation}
            animationMode={"flyTo"}
            animationDuration={1000}
          />
          {renderedPoints}
          <Mapbox.UserLocation onUpdate={userLocationUpdate} />
          {/* {route && getLineAnnotation({ route })} */}
        </Mapbox.MapView>
        <SearchBox onLocationSelect={selectLocation}/>
        {!isSearching && locationData.name?
        (<Card size="md" variant="elevated" m="$2">
          <Heading mb="$1" size="md">
            {locationData.name}
          </Heading>
          <Text size="sm" mb="$5">{locationData.address}</Text>
          <Button py="$2" px="$4">
            <ButtonText size="sm">Directions</ButtonText>
          </Button>
        </Card>) : (<></>)
        }
      </View>
    </View>
  );
};

export default Map;

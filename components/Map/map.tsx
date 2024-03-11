/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
import React, { useEffect, useState } from "react";
import { StyleSheet, View, PermissionsAndroid, Platform, } from "react-native";

import Geolocation from "react-native-geolocation-service";

import Mapbox from "@rnmapbox/maps";
import { getPointAnnotation, getLineAnnotation, getPolyLineAnnotation, revertCoordinates } from "../../services";
import { SearchBox } from "../Search/search";
import { MAPBOX_PUBLIC_TOKEN } from "../../constants";
import { useSelector, useDispatch } from 'react-redux';
import { setCenter, setLocation, setSearchStatus, setZoom } from "../../store/actions/setLocation";
import { Card, Heading, Text, Button, ButtonText } from "@gluestack-ui/themed";
import { geoCodeApi, getPath } from "../../services/network.service";
import { ZOOMADJUST } from "../../store/actions";

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
  let camRef = null;
  let userLocation = useSelector((state: any) => {
    return state.location.userLocation
  }); // Longitude, Latitude

  let centerLocation = useSelector((state: any) => {
    return state.location.centerLocation
  });

  let isSearching = useSelector((state: any) => {
    return state.location.isSearching
  });

  let zoomLevel = useSelector((state: any) => {
    return state.location.zoomLevel
  });

  let [isLocationSelected, setLocationCard] = useState(false)
  let [locationData, setLocationData] = useState<any>({})
  let [renderedRoute, setRenderedRoute] = useState<any>([])
  const dispatch = useDispatch();
  const getGeoLocation = () => {
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
  //   let startingPoint = [-6.2653554, 53.324153];
  let destinationPoint = [-6.2650513, 53.3256942];
  const [renderedPoints, setRenderedPoints] = useState<any>([])

  useEffect(() => {
    if (Platform.OS === "android") {
      const result = requestLocationPermission().then((res) => {
        if (res) {
          getGeoLocation();
        }
      });
    } else {
      getGeoLocation();
    }
  }, []);

  const setDefaultLocation = () => {
    console.log('default')
    dispatch(setLocation([0, 0]))
  };

  const userLocationUpdate = (data: any) => {
  };

  const selectLocation = (data: any) => {
    setLocationData(data);
    dispatch(setSearchStatus(false))
    setRenderedPoints([getPointAnnotation({ id: 'abc', coordinates: data.center })])
  }

  const fetchLocationDetails = async (coordinateArr: any) => {
    const response = await geoCodeApi(coordinateArr.join(','))
    setLocationData({ name: response.features[0].text, address: response.features[0].place_name })
  }

  const getClickedPoint = (feature: any) => {
    dispatch(setCenter(feature.geometry.coordinates));
    setRenderedPoints([getPointAnnotation({ id: 'abc', coordinates: feature.geometry.coordinates })]);
    fetchLocationDetails(feature.geometry.coordinates)
  }

  const renderPath = () => {
    getPath({ startCoordinates: userLocation.join(','), endCoordinates: centerLocation.join(',') })
      .then((body: any) => {
        setRenderedRoute(body.shortestPathCoordinates);
        this.camRef.fitBounds(userLocation, centerLocation, [120, 120], 500)
      })
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
            ref={(c) => (this.camRef = c)}
            zoomLevel={zoomLevel}
            centerCoordinate={centerLocation}
            animationMode={"flyTo"}
            animationDuration={1000}
          />
          {renderedPoints}
          <Mapbox.UserLocation onUpdate={userLocationUpdate} />
          {renderedRoute.length ? (getLineAnnotation(renderedRoute)) : <></>}
        </Mapbox.MapView>
        <SearchBox onLocationSelect={selectLocation} />
        {!isSearching && locationData.name ?
          (<Card size="md" variant="elevated" m="$2">
            <Heading mb="$1" size="md">
              {locationData.name}
            </Heading>
            <Text size="sm" mb="$5">{locationData.address}</Text>
            <Button py="$2" px="$4" onPress={() => { renderPath() }}>
              <ButtonText size="sm">Directions</ButtonText>
            </Button>
          </Card>) : (<></>)
        }
      </View>
    </View>
  );
};

export default Map;

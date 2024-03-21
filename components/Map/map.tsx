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
import { MAPBOX_PUBLIC_TOKEN, VIEWMODE } from "../../constants";
import { useSelector, useDispatch } from 'react-redux';
import { Card, Heading, Text, Button, ButtonText, Box, Fab, FabIcon, Menu, MenuItem, MenuIcon, MenuItemLabel, Icon, HStack, ButtonIcon, CloseIcon } from "@gluestack-ui/themed";
import { Settings, LocateFixed, GlobeIcon, MousePointer2, CircleUser, BookmarkCheck, Navigation, Compass, Car, LogOut, Bookmark } from 'lucide-react-native';
import { getRoutes, getSaveLocationsAPI, setCenter, setLocation, setSearchStatus, setZoom, updateViewMode } from "../../store/actions/setLocation";
import { logoutAction } from '../../store/actions/auth';
import { geoCodeApi, getPath } from "../../services/network.service";
import { ZOOMADJUST } from "../../store/actions";
import { PreviewNavigate } from "./preview-navigate";
import * as RootNavigation from '../../components/Navigation/RootNavigator';
import SavedLocationModal from "../Modals/saved_location_modal";
import { ToggleLocationModal } from "../../store/actions/modal";

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

  let viewMode = useSelector((state: any) => {
    return state.location.viewMode
  });

  let [pointViewed, setPointViewed] = useState([])

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
    dispatch(setLocation([0,0]))
  };

  const userLocationUpdate = (data: any) => {
  };

  const selectLocation = (data: any) => {
    setPointViewed(data.center);
    this.camRef.flyTo(data.center, 500);
    setLocationData(data);
    dispatch(setSearchStatus(false))
    setRenderedPoints([getPointAnnotation({ id: 'abc', coordinates: data.center })])
  }

  const fetchLocationDetails = async (coordinateArr: any) => {
    const response = await geoCodeApi(coordinateArr.join(','))
    setLocationData({name: response.features[0].text, address: response.features[0].place_name, coordinates: response.features[0].center});
  }

  const getClickedPoint = (feature: any) => {
    // use ref for flyto
    // dispatch(setCenter(feature.geometry.coordinates));
    setPointViewed(feature.geometry.coordinates);
    this.camRef.flyTo(feature.geometry.coordinates, 500)
    setRenderedPoints([getPointAnnotation({id: 'abc', coordinates: feature.geometry.coordinates})]);
    fetchLocationDetails(feature.geometry.coordinates)
  }

  const getPaths = () => {
    dispatch(getRoutes({startCoordinates: userLocation.join(','), endCoordinates: pointViewed.join(",")}))
    // dispatch(updateViewMode(VIEWMODE.preview))
    // getPath({startCoordinates: userLocation.join(','), endCoordinates: pointViewed.join(",")})
    //   .then((body: any) => {
    //     setRenderedRoute(body.shortestPathCoordinates);
    //     this.camRef.fitBounds(userLocation, pointViewed, [120, 120], 500)
    //   })
  }

  const onPathRender = (routeArr) => {
    setRenderedRoute(routeArr);
    this.camRef.fitBounds(userLocation, pointViewed, [120, 120], 500)
  }

  const onLogout = () => {
    dispatch(logoutAction())
  }

  const cancelSearch = () => {
    // null data point.
    setLocationData(null);
    dispatch(setSearchStatus(false));
    setPointViewed([]);
    this.camRef.flyTo(userLocation, 500)
    setRenderedPoints([]);
    setRenderedRoute([]);
  }

  const pointsArr = (coords: any, id: any) => {
    getPointAnnotation({
      coordinates: coords,
      id: id,
    })
  }

  const openSaveLocationModal = (locationData:any) => {
    // open modal
    dispatch(ToggleLocationModal({visibility: true, data: locationData}))

  }

  return (
    <View style={styles.page}>
      <View style={styles.container}>
      <Menu
        placement="bottom"
        $py="$0"
        trigger={({ ...triggerProps }) => {
          return (
            <Fab size="lg" allowAsProps={true} isHovered={false} placement="top left" mt="$20" isPressed={false} {...triggerProps} >
              <FabIcon as={ Settings } size="xl"/>
            </Fab>
          )
        }}
      >
        <MenuItem key="profile" textValue="profile"  onPress={()=>{ RootNavigation.navigate('Profile', {})}}>
          <Icon as={CircleUser} size="md" mr="$2" />
          <MenuItemLabel size="md">Profile</MenuItemLabel>
        </MenuItem>
        <MenuItem key="locs" textValue="locs" onPress={() => {
          dispatch(getSaveLocationsAPI());
          navigation.navigate('Saved Locations')
          }}>
          <Icon as={BookmarkCheck} size="md" mr="$2" />
          <MenuItemLabel size="md">Saved Locations</MenuItemLabel>
        </MenuItem>
        <MenuItem key="trips" textValue="trips">
          <Icon as={Car} size="md" mr="$2" />
          <MenuItemLabel size="md">Your Trips</MenuItemLabel>
        </MenuItem>
        <MenuItem key="logout" textValue="logout" onPress={() => {onLogout()}}>
          <Icon as={LogOut} size="md" mr="$2" />
          <MenuItemLabel size="md">Logout</MenuItemLabel>
        </MenuItem>
      </Menu>
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
        <Box>
          <Fab size="lg" placement="bottom right" onPress={() => {
            this.camRef.flyTo(centerLocation, 500)
          }}>
            <FabIcon as={ LocateFixed } size="xl"/>
          </Fab>
        </Box>
        {(viewMode === VIEWMODE.search) ? (<SearchBox onLocationSelect={selectLocation} camRef={this.camRef}/>) : (<></>)}
        {!isSearching && locationData?.name && viewMode === VIEWMODE.search ?
        (<Card size="md" variant="elevated" m="$2">
          <HStack space="4xl">
            <Heading mb="$1" size="md">
              {locationData.name}
            </Heading>
            <Button onPress={() => {openSaveLocationModal(locationData)}}  variant="outline" borderColor="transparent">
                <ButtonIcon as={Bookmark}/>
              </Button>
          </HStack>
          <Text size="sm" mb="$5">{locationData.address}</Text>
          <HStack>
            <Button py="$2" px="$4" action="negative" onPress={() => {cancelSearch()}}>
              <ButtonText size="sm">Cancel</ButtonText>
              <ButtonIcon as={CloseIcon} ml="$2"/>
            </Button>
            <Button py="$2" px="$4" ml="$2" onPress={() => {getPaths()}}>
              <ButtonText size="sm">Directions</ButtonText>
              <ButtonIcon as={Compass} ml="$2"/>
            </Button>
          </HStack>
        </Card>) : (<></>)}
        {(viewMode === VIEWMODE.preview) ? (
          <PreviewNavigate onRender={onPathRender}/>
        ) : (<></>)}
        {locationData.name ? <SavedLocationModal/> : <></>}
      </View>
    </View>
  );
};

export default Map;

/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable quotes */
import React, { useEffect, useState } from "react";
import { StyleSheet, View, PermissionsAndroid, Platform, } from "react-native";

import Geolocation from "react-native-geolocation-service";

import Mapbox from "@rnmapbox/maps";
import { getPointAnnotation, getLineAnnotation, navPointAnnotation } from "../../services";
import { SearchBox } from "../Search/search";
import { MAPBOX_PUBLIC_TOKEN, VIEWMODE, offlineMessage, onlineMessage } from "../../constants";
import { useSelector, useDispatch } from 'react-redux';
import { Card, Heading, Text, Button, ButtonText, Box, Fab, FabIcon, Menu, MenuItem, MenuIcon, MenuItemLabel, Icon, HStack, ButtonIcon, CloseIcon, StarIcon } from "@gluestack-ui/themed";
import { Settings, LocateFixed, GlobeIcon, MousePointer2, CircleUser, BookmarkCheck, Navigation, Compass, Car, LogOut, Bookmark, BookMarked, AlignStartVertical, HistoryIcon, MessageCircleWarningIcon } from 'lucide-react-native';
import { getRoutes, getSaveLocationsAPI, setCenter, setLocation, setUserLocation, setSearchStatus, setZoom, updateViewMode, updateTripDetails, updateUserDirectionView, showToast, hideToast } from "../../store/actions/setLocation";
import { logoutAction } from '../../store/actions/auth';
import { geoCodeApi, getPath } from "../../services/network.service";
import { ZOOMADJUST } from "../../store/actions";
import { PreviewNavigate } from "./preview-navigate";
import * as RootNavigation from '../../components/Navigation/RootNavigator';
import SavedLocationModal from "../Modals/saved_location_modal";
import { ToggleIncidentModal, ToggleLocationModal } from "../../store/actions/modal";
import { CommonActions, useFocusEffect, useRoute } from "@react-navigation/native";
import WeatherComponent from "../Weather/weather";
import IncidentModal from "../Modals/incident_modal";
import { offlineManager } from '@rnmapbox/maps';
import NetInfo from '@react-native-community/netinfo';


// coordinates for simulating a path
// const simulateUserLoc = [
//   [
//       -6.2530686,
//       53.3414913
//   ],
//   [
//       -6.2529774,
//       53.3414625
//   ],
//   [
//       -6.2530577,
//       53.3413376
//   ],
//   [
//       -6.2531049,
//       53.3412537
//   ],
//   [
//       -6.2539325,
//       53.3414201
//   ],
//   [
//       -6.2539452,
//       53.3414438
//   ],
//   [
//       -6.2539178,
//       53.3414968
//   ],
//   [
//       -6.253902,
//       53.3415257
//   ],
//   [
//       -6.2539225,
//       53.3415304
//   ],
//   [
//       -6.2536966,
//       53.341948
//   ],
//   [
//       -6.2544412,
//       53.3421001
//   ],
//   [
//       -6.2545008,
//       53.3421098
//   ],
//   [
//       -6.2545131,
//       53.3421124
//   ],
//   [
//       -6.254564,
//       53.342123
//   ],
//   [
//       -6.2546001,
//       53.3421305
//   ],
//   [
//       -6.2546356,
//       53.3421378
//   ],
//   [
//       -6.2546751,
//       53.342146
//   ],
//   [
//       -6.2550021,
//       53.3415482
//   ]
// ]

Mapbox.setAccessToken(
  MAPBOX_PUBLIC_TOKEN
);
//const simulateUserLoc: any = []
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

const Map = ({ route, navigation }: any) => {
  let camRef = null;
  let mapRef = null;
  let userLocation = useSelector((state: any) => {
    return state.location.userLocation
  });

  let isViewUserDirection = useSelector((state: any) => {
    return state.location.isViewUserDirection;
  })

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

  let userPrefs = useSelector((state: any) => {
    return state.userDetails.pref
  })

  let [pointViewed, setPointViewed] = useState([])
  let [downloadBounds, setDownloadBounds] = useState<any>({})

  let [isLocationSelected, setLocationCard] = useState(false)
  let [locationData, setLocationData] = useState<any>({})
  let [renderedRoute, setRenderedRoute] = useState<any>([])
  let [navPoints, setNavPoints] = useState<any>([]);
  const dispatch = useDispatch();
  const getGeoLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        dispatch(setCenter([position.coords.longitude, position.coords.latitude]));
        dispatch(setUserLocation([position.coords.longitude, position.coords.latitude]));
      },
      (error) => {
        console.log(error.code, error.message);
        setDefaultLocation();
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
  const [renderedPoints, setRenderedPoints] = useState<any>([])
  const [psuedoIndex, setPseudoIndex] = useState<any>(0)
  const [connectionStatus, setConnectionStatus] = useState(false);
  let flag = false;
  const CheckConnectivity = () => {
    NetInfo.addEventListener((state: any) => {
      const connected = state.isConnected;
      if (connected) {
        dispatch(showToast(onlineMessage, "success"));
        setTimeout(() => dispatch(hideToast()), 3000);
      }
      if (!connected) {
        dispatch(showToast(offlineMessage, 'error'));
        setTimeout(() => dispatch(hideToast()), 3000);
      }

      setConnectionStatus(state.isConnected);
    });
  };
  useEffect(() => {
    CheckConnectivity();
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
    dispatch(setUserLocation([0, 0]))
  };

  const userLocationUpdate = (data: any) => {
    if (viewMode === VIEWMODE.navigate) {
      dispatch(setUserLocation([data.coords.longitude, data.coords.latitude]))
      // comment in for simulation mode
      // dispatch(setUserLocation(simulateUserLoc[psuedoIndex]))
      // setPseudoIndex(psuedoIndex + 1);
    }
  };

  const onRegionChange = (data) => {
    if (viewMode === VIEWMODE.downloadMap) {
      console.log(data.properties.bounds)
      setDownloadBounds(data.properties.bounds)
    }
  }

  const selectLocation = (data: any) => {
    setPointViewed(data.center);
    this.camRef.flyTo(data.center, 500);
    setLocationData(data);
    dispatch(setSearchStatus(false))
    setRenderedPoints([getPointAnnotation({ id: 'abc', coordinates: data.center })])
  }

  const fetchLocationDetails = async (coordinateArr: any, isFromSaved: boolean = false) => {
    const response = await geoCodeApi(coordinateArr.join(','))
    setLocationData({ name: response.features[0].text, address: response.features[0].place_name, coordinates: response.features[0].center, isFromSaved });
    if (isFromSaved) {
      setPointViewed(route.params.locData);
      this.camRef.flyTo(route.params.locData, 500);
      setRenderedPoints([getPointAnnotation({ id: 'abc', coordinates: route.params.locData })])
    }
  }

  const getClickedPoint = (feature: any) => {
    if (viewMode !== VIEWMODE.navigate || viewMode !== VIEWMODE) {
      setPointViewed(feature.geometry.coordinates);
      this.camRef.flyTo(feature.geometry.coordinates, 500)
      setRenderedPoints([getPointAnnotation({ id: 'abc', coordinates: feature.geometry.coordinates })]);
      fetchLocationDetails(feature.geometry.coordinates);
    }
  }

  const getPaths = () => {
    dispatch(getRoutes({ startCoordinates: userLocation.join(','), endCoordinates: pointViewed.join(",") }))
  }

  const onPointsRender = (routeArr) => {
    let navPointArr: any = []
    routeArr.forEach((route) => {
      if (route.mode === 'bus' || route.mode === 'luas') {
        navPointArr.push({
          coords: route.pathPointList[0],
          name: route.startStopName,
        });
      }
    });
    setNavPoints(navPointArr);
  }

  const onPathRender = (routeArr) => {
    setRenderedRoute(routeArr);
    this.camRef.fitBounds(userLocation, pointViewed, [120, 120], 500)
  }

  const onLogout = () => {
    dispatch(logoutAction())
  }

  const cancelSearch = () => {
    dispatch(setSearchStatus(false));
    setLocationData(null);
    setPointViewed([]);
    this.camRef.flyTo(userLocation, 500)
    setRenderedPoints([]);
    setRenderedRoute([]);
  }

  const openSaveLocationModal = (locationData: any) => {
    // open modal
    dispatch(ToggleLocationModal({ visibility: true, data: locationData }))

  }

  useFocusEffect(() => {
    if (route?.params.isFromSaved) {
      fetchLocationDetails(route.params.locData, true)
      navigation.setParams({ isFromSaved: false });
    }
  })

  const tripStart = async (startLocation: any) => {
    try {
      const response = await geoCodeApi(startLocation.join(','))
      let tripData = {
        start: {
          coordinates: response.features[0].center,
          location_name: response.features[0].text
        },
        end: {
          coordinates: locationData.coordinates,
          location_name: locationData.name
        },
        startTime: new Date().getTime()
      }
      dispatch(updateUserDirectionView());
      dispatch(updateTripDetails(tripData))
    } catch (err) {
      console.log(err, 'could not fetch loation details')
    }
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
                <FabIcon as={Settings} size="xl" />
              </Fab>
            )
          }}
        >
            <MenuItem key="profile" textValue="profile" onPress={() => { RootNavigation.navigate('Profile', {}) }}>
            <Icon as={CircleUser} size="md" mr="$2" color={'black'} />
            <MenuItemLabel size="md">Profile</MenuItemLabel>
          </MenuItem>
          <MenuItem key="goals" textValue="goals" onPress={() => { RootNavigation.navigate('ReadGoals', {}) }}>
            <Icon as={StarIcon} size="md" mr="$2" color={'black'} />
            <MenuItemLabel size="md">Your Goals</MenuItemLabel>
          </MenuItem>
          <MenuItem key="locs" textValue="locs" onPress={() => {
            dispatch(getSaveLocationsAPI());
            navigation.navigate('Saved Locations')
          }}>
            <Icon as={BookmarkCheck} size="md" mr="$2" color={'black'} />
            <MenuItemLabel size="md">Saved Locations</MenuItemLabel>
          </MenuItem>
          <MenuItem key="history" textValue="triphistory" onPress={() => { RootNavigation.navigate('TripHistory', {}) }}>
          <Icon as={HistoryIcon} size="md" mr="$2" color={'black'} />
            <MenuItemLabel size="md">Trips Completed</MenuItemLabel>
          </MenuItem>
          <MenuItem key="pref" textValue="preferences" onPress={() => { RootNavigation.navigate('Preference', {}) }}>
            <AlignStartVertical color={'black'} style={{ marginRight: 5, height: 18, width: 18 }} />
            <MenuItemLabel size="md">Preferences</MenuItemLabel>
          </MenuItem>
          <MenuItem key="incident" textValue="preferences" onPress={() => { if (viewMode === VIEWMODE.navigate) dispatch(ToggleIncidentModal({visibility: true})) }}>
            <Icon as={MessageCircleWarningIcon} size="md" mr="$2" color={'black'} />
            <MenuItemLabel size="md">Report Incident</MenuItemLabel>
        </MenuItem>
          <MenuItem key="logout" textValue="logout" onPress={() => { onLogout() }}>
            <Icon as={LogOut} size="md" mr="$2" color={'black'} />
            <MenuItemLabel size="md">Logout</MenuItemLabel>
          </MenuItem>
        </Menu>
        <Mapbox.MapView
          style={styles.map}
          onPress={getClickedPoint}
          compassEnabled={true}
          logoEnabled={false}
          onCameraChanged={onRegionChange}
          ref={(c) => (this.mapRef = c)}
        >
          <Mapbox.Camera
            ref={(c) => (this.camRef = c)}
            zoomLevel={zoomLevel}
            centerCoordinate={centerLocation}
            animationMode={"flyTo"}
            animationDuration={1000}
            followUserLocation={viewMode === VIEWMODE.navigate}
          />
          {renderedPoints}
          <Mapbox.UserLocation
            onUpdate={userLocationUpdate}
            showsUserHeadingIndicator={isViewUserDirection}
            minDisplacement={4}/>
          { renderedRoute.length ? (getLineAnnotation(renderedRoute)) : <></>}
        </Mapbox.MapView>
        <Box>
          <Fab size="lg" placement="bottom right" onPress={() => {
            this.camRef.flyTo(centerLocation, 500)
          }}>
            <FabIcon as={LocateFixed} size="xl" />
          </Fab>
        </Box>
        {(viewMode === VIEWMODE.search) ? (<SearchBox onLocationSelect={selectLocation} camRef={this.camRef} />) : (<></>)}
        {!isSearching && locationData?.name && viewMode === VIEWMODE.search ?
          (<Card size="md" variant="elevated" m="$2">
            <HStack space="4xl">
              <Heading mb="$1" size="md">
                {locationData.name}
              </Heading>
              {(!locationData.isFromSaved) ? (<Button onPress={() => { openSaveLocationModal(locationData) }} variant="outline" borderColor="transparent">
                <ButtonIcon as={Bookmark} />
              </Button>) : (<Button variant="outline" borderColor="transparent">
                <ButtonIcon as={BookMarked} />
              </Button>)}
            </HStack>
            <Text size="sm" mb="$5">{locationData.address}</Text>
            <WeatherComponent />
            <HStack>
              <Button py="$2" px="$4" action="negative" onPress={() => { cancelSearch() }}>
                <ButtonText size="sm">Cancel</ButtonText>
                <ButtonIcon as={CloseIcon} ml="$2" />
              </Button>
              <Button py="$2" px="$4" ml="$2" onPress={() => { getPaths() }}>
                <ButtonText size="sm">Directions</ButtonText>
                <ButtonIcon as={Compass} ml="$2" />
              </Button>
            </HStack>
          </Card>) : (<></>)}
        {(viewMode === VIEWMODE.preview || viewMode === VIEWMODE.navigate || viewMode === VIEWMODE.navigateEnd) ? (
          <PreviewNavigate
            onRender={onPathRender}
            onPointsRender={onPointsRender}
            destinationName={locationData.name}
            camRef={this.camRef}
            onTripStart={tripStart}
            onReroute={getPaths}
            />
        ) : (<></>)}
        {locationData && locationData.name ? <SavedLocationModal /> : <></>}
      </View>
    </View>
  );
};

export default Map;

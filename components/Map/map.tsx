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
import { MAPBOX_PUBLIC_TOKEN, VIEWMODE } from "../../constants";
import { useSelector, useDispatch } from 'react-redux';
import { Card, Heading, Text, Button, ButtonText, Box, Fab, FabIcon, Menu, MenuItem, MenuIcon, MenuItemLabel, Icon, HStack, VStack, ButtonIcon, CloseIcon, StarIcon } from "@gluestack-ui/themed";
import { Settings, LocateFixed, GlobeIcon, MousePointer2, CircleUser, BookmarkCheck, Navigation, Compass, Car, LogOut, Bookmark, BookMarked, AlignStartVertical, Download, DownloadIcon, Trash2Icon } from 'lucide-react-native';
import { getRoutes, getSaveLocationsAPI, setCenter, setLocation, setUserLocation, setSearchStatus, setZoom, updateViewMode, updateTripDetails, updateUserDirectionView, showToast } from "../../store/actions/setLocation";
import { logoutAction } from '../../store/actions/auth';
import { geoCodeApi, getPath } from "../../services/network.service";
import { ZOOMADJUST } from "../../store/actions";
import { PreviewNavigate } from "./preview-navigate";
import * as RootNavigation from '../../components/Navigation/RootNavigator';
import SavedLocationModal from "../Modals/saved_location_modal";
import { ToggleLocationModal } from "../../store/actions/modal";
import { CommonActions, useFocusEffect, useRoute } from "@react-navigation/native";
import WeatherComponent from "../Weather/weather";
import { offlineManager } from '@rnmapbox/maps';

const simulateUserLoc = [
    
]

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

const Map = ({ route, navigation }: any) => {
  let camRef = null;
  let userLocation = useSelector((state: any) => {
    return state.location.userLocation
  }); // Longitude, Latitude

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
  //   let startingPoint = [-6.2653554, 53.324153];
  let destinationPoint = [-6.2650513, 53.3256942];
  const [renderedPoints, setRenderedPoints] = useState<any>([])
  const [psuedoIndex, setPseudoIndex] = useState<any>(0)

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
    dispatch(setUserLocation([0,0]))
  };

  const userLocationUpdate = (data: any) => {
    // dispatch(setUserLocation([data.coords.longitude, data.coords.latitude]))
    if (viewMode === VIEWMODE.navigate) {
        dispatch(setUserLocation(simulateUserLoc[psuedoIndex]))
        setPseudoIndex(psuedoIndex + 1);
    }
  };

  const onDownloadMap = () => {
    dispatch(updateViewMode(VIEWMODE.downloadMap))
  }

  const onDowloadRegion = () => {
    const progressListener = (offlineRegion, status) => {
      console.log("success ",offlineRegion, status)
      if (status.state === 'comlplete') {
        dispatch(showToast("Region Downloaded Successfully", "success"));
      }
    };
    const errorListener = (offlineRegion, err) => console.log(offlineRegion, err);

    offlineManager.createPack({
      name: 'region_1',
      styleURL: 'https://api.mapbox.com/styles/v1/electro75/cluqv0agq008c01qz5w5i535j/wmts?access_token=pk.eyJ1IjoiZWxlY3Rybzc1IiwiYSI6ImNscnRlcWJ1eDAxN2QycW82cXp5MWZsbXMifQ.ZlRWWO347Yae46luSV8BCA',
      minZoom: 14,
      maxZoom: 20,
      bounds: [downloadBounds.ne, downloadBounds.sw],

    }, progressListener, errorListener)

  }

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
    // use ref for flyto
    // dispatch(setCenter(feature.geometry.coordinates));
    setPointViewed(feature.geometry.coordinates);
    this.camRef.flyTo(feature.geometry.coordinates, 500)
    setRenderedPoints([getPointAnnotation({ id: 'abc', coordinates: feature.geometry.coordinates })]);
    fetchLocationDetails(feature.geometry.coordinates);
  }

  const getPaths = () => {
    dispatch(getRoutes({ startCoordinates: userLocation.join(','), endCoordinates: pointViewed.join(",") }))
    // dispatch(updateViewMode(VIEWMODE.preview))
    // getPath({startCoordinates: userLocation.join(','), endCoordinates: pointViewed.join(",")})
    //   .then((body: any) => {
    //     setRenderedRoute(body.shortestPathCoordinates);
    //     this.camRef.fitBounds(userLocation, pointViewed, [120, 120], 500)
    //   })
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
          <MenuItem key="trips" textValue="trips">
            <Icon as={Car} size="md" mr="$2" color={'black'} />
            <MenuItemLabel size="md">Your Trips</MenuItemLabel>
          </MenuItem>
          <MenuItem key="pref" textValue="preferences" onPress={() => { RootNavigation.navigate('Preference', {}) }}>
            <Icon as={AlignStartVertical} size="md" mr="$2" color={'black'} />
            <MenuItemLabel size="md">Preferences</MenuItemLabel>
          </MenuItem>
          <MenuItem key="offlineMap" textValue="preferences" onPress={() => { onDownloadMap() }}>
            <Icon as={Download} size="md" mr="$2" color={'black'} />
            <MenuItemLabel size="md">Download Map</MenuItemLabel>
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
        >
          <Mapbox.Camera
            ref={(c) => (this.camRef = c)}
            zoomLevel={zoomLevel}
            centerCoordinate={centerLocation}
            animationMode={"flyTo"}
            animationDuration={1000}
            // followUserLocation={viewMode === VIEWMODE.navigate}
          />
          {renderedPoints}
          <Mapbox.UserLocation onUpdate={userLocationUpdate} showsUserHeadingIndicator={isViewUserDirection}/>
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
            <WeatherComponent lon={locationData.coordinates[0]} lat={locationData.coordinates[1]} />
          </Card>) : (<></>)}
        {(viewMode === VIEWMODE.preview || viewMode === VIEWMODE.navigate || viewMode === VIEWMODE.navigateEnd) ? (
          <PreviewNavigate
            onRender={onPathRender}
            onPointsRender={onPointsRender}
            destinationName={locationData.name}
            camRef={this.camRef}
            onTripStart={tripStart}/>
        ) : (<></>)}
        {locationData.name ? <SavedLocationModal /> : <></>}
        {(viewMode === VIEWMODE.downloadMap) ? (
          <Card size="md" variant="elevated" m="$2">
          <HStack space="4xl" justifyContent="space-between" >
            <Heading mb="$1" size="md">
              Download Map Region
            </Heading>
            <Button py="$2" px="$4" action="negative" onPress={() => { dispatch(updateViewMode(VIEWMODE.search)) }}>
                <ButtonIcon as={CloseIcon} />
            </Button>
          </HStack>
          <Text size="sm" mb="$4">Adjust the map according to the region that you want to download</Text>
          <HStack>
            <Button py="$2" px="$4" action="negative" onPress={() => { offlineManager.deletePack('region_1').then(res => {console.log(res)}).catch(err => console.log(err)) }}>
              <ButtonText size="sm">Delete Maps</ButtonText>
              <ButtonIcon as={Trash2Icon} ml="$2" />
            </Button>
            <Button py="$2" px="$4" ml="$2" onPress={() => { onDowloadRegion() }}>
              <ButtonText size="sm">Download</ButtonText>
              <ButtonIcon as={DownloadIcon} ml="$2" />
            </Button>
          </HStack>
        </Card>
        ): (<></>)}
      </View>
    </View>
  );
};

export default Map;

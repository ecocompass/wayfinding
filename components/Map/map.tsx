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
import { Card, Heading, Text, Button, ButtonText, Box, Fab, FabIcon, Menu, MenuItem, MenuIcon, MenuItemLabel, Icon, HStack, ButtonIcon, CloseIcon } from "@gluestack-ui/themed";
import { Settings, LocateFixed, GlobeIcon, MousePointer2, CircleUser, BookmarkCheck, Navigation, Compass, Car, LogOut, Bookmark, BookMarked } from 'lucide-react-native';
import { getRoutes, getSaveLocationsAPI, setCenter, setUserLocation, setSearchStatus, setZoom, updateViewMode } from "../../store/actions/setLocation";
import { logoutAction } from '../../store/actions/auth';
import { geoCodeApi, getPath } from "../../services/network.service";
import { ZOOMADJUST } from "../../store/actions";
import { PreviewNavigate } from "./preview-navigate";
import * as RootNavigation from '../../components/Navigation/RootNavigator';
import SavedLocationModal from "../Modals/saved_location_modal";
import { ToggleLocationModal } from "../../store/actions/modal";
import { CommonActions, useFocusEffect, useRoute } from "@react-navigation/native";

const simulateUserLoc = [
    [
        -6.255602,
        53.354628
    ],
    [
        -6.2566922,
        53.3542033
    ],
    [
        -6.2568923,
        53.3542062
    ],
    [
        -6.2577742,
        53.3539903
    ],
    [
        -6.2581941,
        53.3538836
    ],
    [
        -6.2584321,
        53.3538163
    ],
    [
        -6.2585731,
        53.3537759
    ],
    [
        -6.2591722,
        53.3535786
    ],
    [
        -6.2594117,
        53.3534972
    ],
    [
        -6.259676,
        53.3533742
    ],
    [
        -6.2598384,
        53.3533038
    ],
    [
        -6.2600954,
        53.3531925
    ],
    [
        -6.260124,
        53.3532166
    ],
    [
        -6.2601604,
        53.3532472
    ],
    [
        -6.2601739,
        53.3532587
    ],
    [
        -6.2603399,
        53.3531826
    ],
    [
        -6.26050348,
        53.35310526
    ],
    [
        -6.2600708,
        53.3532365
    ],
    [
        -6.2597497,
        53.3533023
    ],
    [
        -6.2595508,
        53.3532253
    ],
    [
        -6.2591311,
        53.3523809
    ],
    [
        -6.2581821,
        53.3501969
    ],
    [
        -6.258,
        53.349766
    ],
    [
        -6.257629,
        53.3488613
    ],
    [
        -6.2576119,
        53.3487287
    ],
    [
        -6.2575375,
        53.3483084
    ],
    [
        -6.2573878,
        53.3479981
    ],
    [
        -6.2573532,
        53.3478381
    ],
    [
        -6.2572746,
        53.3470786
    ],
    [
        -6.2570228,
        53.3458648
    ],
    [
        -6.2571208,
        53.345704
    ],
    [
        -6.2574967,
        53.3455553
    ],
    [
        -6.2586132,
        53.345204
    ],
    [
        -6.2589621,
        53.3450021
    ],
    [
        -6.2590963,
        53.3449041
    ],
    [
        -6.2593661,
        53.3445633
    ],
    [
        -6.2591948,
        53.3440371
    ],
    [
        -6.2591696,
        53.3438815
    ],
    [
        -6.2592345,
        53.3434257
    ],
    [
        -6.2592269,
        53.34328
    ],
    [
        -6.2578509,
        53.3429402
    ],
    [
        -6.2577596,
        53.3428511
    ],
    [
        -6.2577542,
        53.3427454
    ],
    [
        -6.2584932,
        53.3402385
    ],
    [
        -6.2586791,
        53.3395785
    ],
    [
        -6.2587612,
        53.3394983
    ],
    [
        -6.2589833,
        53.3394491
    ],
    [
        -6.2604007,
        53.3397926
    ],
    [
        -6.2605908,
        53.3398062
    ],
    [
        -6.2607571,
        53.3397401
    ],
    [
        -6.2611276,
        53.339291
    ],
    [
        -6.262316,
        53.3377942
    ],
    [
        -6.2623943,
        53.3377174
    ],
    [
        -6.2625536,
        53.3375975
    ],
    [
        -6.2629086,
        53.337119
    ],
    [
        -6.2631879,
        53.3364315
    ],
    [
        -6.263275,
        53.3359084
    ],
    [
        -6.2632451,
        53.3354047
    ],
    [
        -6.26303,
        53.3343862
    ],
    [
        -6.26272474216131,
        53.3336463449954
    ],
    [
        -6.2626171,
        53.3333651
    ],
    [
        -6.2624459,
        53.3329569
    ],
    [
        -6.2620841,
        53.3328093
    ],
    [
        -6.2614124,
        53.3328206
    ],
    [
        -6.2607608,
        53.3328231
    ],
    [
        -6.2605711,
        53.3327669
    ],
    [
        -6.2604486,
        53.3326604
    ],
    [
        -6.2603665,
        53.3323664
    ],
    [
        -6.2602963,
        53.3321767
    ],
    [
        -6.2601192,
        53.3319975
    ],
    [
        -6.2594101,
        53.3317369
    ],
    [
        -6.2592161,
        53.3316404
    ],
    [
        -6.2590639,
        53.3314855
    ],
    [
        -6.2588517,
        53.3309679
    ],
    [
        -6.2584985,
        53.3304566
    ],
    [
        -6.2582306,
        53.3301919
    ],
    [
        -6.257861,
        53.3298224
    ],
    [
        -6.2576377,
        53.3295663
    ],
    [
        -6.2571804,
        53.3289595
    ],
    [
        -6.2569993,
        53.328656
    ],
    [
        -6.2568659,
        53.3284092
    ],
    [
        -6.2566572,
        53.3279465
    ],
    [
        -6.2566011,
        53.3277957
    ],
    [
        -6.2565118,
        53.3275285
    ],
    [
        -6.2564338,
        53.327264
    ],
    [
        -6.2560933,
        53.3260685
    ],
    [
        -6.255652,
        53.3245133
    ],
    [
        -6.2549411,
        53.3219722
    ],
    [
        -6.2546904,
        53.3210663
    ],
    [
        -6.2538938,
        53.3181913
    ],
    [
        -6.2534261,
        53.3164812
    ],
    [
        -6.2530777,
        53.3152398
    ],
    [
        -6.2519599,
        53.3112127
    ],
    [
        -6.2517976,
        53.3105116
    ],
    [
        -6.2517435,
        53.3101492
    ],
    [
        -6.25167339021973,
        53.3096723883979
    ],
    [
        -6.2512849,
        53.3065624
    ],
    [
        -6.2507967,
        53.3024306
    ],
    [
        -6.2507018,
        53.301591
    ],
    [
        -6.2505849,
        53.3006455
    ],
    [
        -6.2495644,
        53.2972667
    ],
    [
        -6.2482784,
        53.2953292
    ],
    [
        -6.2474155,
        53.2942905
    ],
    [
        -6.2444559,
        53.2918852
    ],
    [
        -6.24286,
        53.2907074
    ],
    [
        -6.2400159,
        53.2885485
    ],
    [
        -6.2386064,
        53.2874702
    ],
    [
        -6.2362808,
        53.2857955
    ],
    [
        -6.2357562,
        53.2855353
    ],
    [
        -6.2344148,
        53.2849446
    ],
    [
        -6.2330434,
        53.2844894
    ],
    [
        -6.2277236,
        53.2833875
    ],
    [
        -6.226348,
        53.2832134
    ],
    [
        -6.2250521,
        53.283093
    ],
    [
        -6.2229587,
        53.2829393
    ],
    [
        -6.2210957,
        53.2826903
    ],
    [
        -6.219499,
        53.2823661
    ],
    [
        -6.218332,
        53.2820638
    ],
    [
        -6.2116756,
        53.2798834
    ],
    [
        -6.2161726,
        53.2813725
    ],
    [
        -6.2128742,
        53.2802891
    ],
    [
        -6.2109757,
        53.2796582
    ],
    [
        -6.2106206,
        53.279547
    ],
    [
        -6.2075288,
        53.2785644
    ],
    [
        -6.2052043,
        53.2777957
    ],
    [
        -6.20463866558514,
        53.2776047340549
    ],
    [
        -6.204574391,
        53.27767443
    ], 
  [
      -6.255602,
      53.354628
  ],
  [
      -6.2566922,
      53.3542033
  ],
  [
      -6.2568923,
      53.3542062
  ],
  [
      -6.2560402,
      53.3530263
  ],
  [
      -6.2555708,
      53.3523453
  ],
  [
      -6.2549947,
      53.3515298
  ],
  [
      -6.2545108,
      53.350878
  ],
  [
      -6.2544851,
      53.3508434
  ],
  [
      -6.2544091,
      53.3507411
  ],
  [
      -6.2543745,
      53.3506908
  ],
  [
      -6.2543489,
      53.3506536
  ],
  [
      -6.2540211,
      53.350177
  ],
  [
      -6.2538576,
      53.3499392
  ],
  [
      -6.2537104,
      53.3497213
  ],
  [
      -6.2537498,
      53.3496237
  ],
  [
      -6.2537875,
      53.3495734
  ],
  [
      -6.2538177,
      53.3495413
  ],
  [
      -6.2539185,
      53.349484
  ],
  [
      -6.254017,
      53.3494511
  ],
  [
      -6.2544406,
      53.3493236
  ],
  [
      -6.2546664,
      53.3492539
  ],
  [
      -6.2547137,
      53.3492125
  ],
  [
      -6.2547325,
      53.3491959
  ],
  [
      -6.2547584,
      53.349171
  ],
  [
      -6.2548039,
      53.3490853
  ],
  [
      -6.2548278,
      53.3490402
  ],
  [
      -6.2548513,
      53.3490006
  ],
  [
      -6.2548989,
      53.3488304
  ],
  [
      -6.254946,
      53.3486617
  ],
  [
      -6.2549455,
      53.3486352
  ],
  [
      -6.2549494,
      53.3485299
  ],
  [
      -6.2549481,
      53.3484474
  ],
  [
      -6.2551524,
      53.3483442
  ],
  [
      -6.2551417,
      53.3483186
  ],
  [
      -6.2551381,
      53.3483056
  ],
  [
      -6.2551263,
      53.3482695
  ],
  [
      -6.255117,
      53.3482293
  ],
  [
      -6.2551245,
      53.3481994
  ],
  [
      -6.255177,
      53.3481923
  ],
  [
      -6.2557925,
      53.3481223
  ],
  [
      -6.2558646,
      53.3481128
  ],
  [
      -6.2563689,
      53.3480465
  ],
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

  let [pointViewed, setPointViewed] = useState([])

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
  const [psuedoIndex, setPseudoIndex] = useState<number>(0)

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

  const selectLocation = (data: any) => {
    console.log(data);
    setPointViewed(data.center);
    this.camRef.flyTo(data.center, 500);
    setLocationData(data);
    dispatch(setSearchStatus(false))
    setRenderedPoints([getPointAnnotation({ id: 'abc', coordinates: data.center })])
  }

  const fetchLocationDetails = async (coordinateArr: any, isFromSaved: boolean = false) => {
    const response = await geoCodeApi(coordinateArr.join(','))
    setLocationData({name: response.features[0].text, address: response.features[0].place_name, coordinates: response.features[0].center, isFromSaved});
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
    setRenderedPoints([getPointAnnotation({id: 'abc', coordinates: feature.geometry.coordinates})]);
    fetchLocationDetails(feature.geometry.coordinates);
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

  const openSaveLocationModal = (locationData:any) => {
    // open modal
    dispatch(ToggleLocationModal({visibility: true, data: locationData}))

  }

  useFocusEffect(() => {
    if (route?.params.isFromSaved) {
      fetchLocationDetails(route.params.locData, true)
      navigation.setParams({isFromSaved: false});
    }
  })

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
          compassEnabled={true}
          logoEnabled={false}
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
          {/* {navPoints.length ? (navPointAnnotation(navPoints)) : <></> } */}
          <Mapbox.UserLocation onUpdate={userLocationUpdate} showsUserHeadingIndicator={isViewUserDirection}/>
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
            {(!locationData.isFromSaved)? (<Button onPress={() => {openSaveLocationModal(locationData)}}  variant="outline" borderColor="transparent">
                <ButtonIcon as={Bookmark}/>
              </Button>) : (<Button  variant="outline" borderColor="transparent">
                <ButtonIcon as={BookMarked}/>
              </Button>)}
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
        {(viewMode === VIEWMODE.preview || viewMode === VIEWMODE.navigate) ? (
          <PreviewNavigate onRender={onPathRender} onPointsRender={onPointsRender} destinationName={locationData.name} camRef={this.camRef}/>
        ) : (<></>)}
        {locationData.name ? <SavedLocationModal/> : <></>}
      </View>
    </View>
  );
};

export default Map;

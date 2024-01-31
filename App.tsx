/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  Button,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import Geolocation from 'react-native-geolocation-service';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken('pk.eyJ1IjoiYWdyYXdhc2EiLCJhIjoiY2xyeXdtbGgyMHVhMTJxbnV4dWQyeXFiNCJ9.EBZDzXD0wMCa6hQNAn-4Xg');


const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: 900,
    width: 720,
  },
  map: {
    flex: 1
  }
});
// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   const [isLoading, setLoading] = useState(true);
//   const [data, setData] = useState<Movie[]>([]);

//   // get data at app start
//   const getMovies = async () => {
//     try {
//       const response = await fetch('https://reactnative.dev/movies.json');
//       const json = await response.json();
//       setData(json.movies);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   useEffect(() => {
//     getMovies();
//   }, []);

//   if (isLoading) {
//     return (
//       <ScrollView>
//         <Section title="Getting Movies">Loading...</Section>
//       </ScrollView>
//     );
//   } else {
//     const { width, height } = Dimensions.get("window");
//     return (
//       <ScrollView>
//         <Section title="Sahil">{data[0].title}</Section>
//         <MapView
//           provider={PROVIDER_GOOGLE}
//           initialRegion={{
//             latitude: 53.3498,
//             longitude: -6.2603,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//           style={{
//             width,
//             height,
//           }}
//         />
//       </ScrollView>
//     );
//   }
// }
// function to check permissions and get Location

// Function to get permission for location
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

const App = () => {
  const [location, setLocation] = useState({latitude: 0, longitude: 0});
  const [currentLocation, setCurrentLocation] = useState([0, 0]); // Longitude, Latitude

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then(granted => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        }
      });
    } else {
      getCurrentLocation();
    }
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setCurrentLocation([position.coords.longitude, position.coords.latitude]);
        console.log("Pos:",position)
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const getLocationData = async (data: any) => {
    try {
      // const response = await fetch('https://reactnative.dev/movies.json');

      const response = await fetch(
        `http://ecocompass.anupal.me/test-core?latitude=${encodeURIComponent(data.latitude)}&longitude=${encodeURIComponent(data.longitude)}`, { method: "GET"})

      const json = await response.json();
      Toast.show(json.message, {
        duration: 10000
      })
      console.log(json)
    } catch (error) {
      // console.error(error);
    } finally {
      // setLoading(false);

    }
  };
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            console.log("Pos2",position);
            console.log(currentLocation)
            
        //    getLocationData({latitude: position.coords.latitude, longitude: position.coords.longitude});
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            // setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };
  if (!location.latitude) {
    return (
      <RootSiblingParent>
        <View style={styles.container}>
          <Text>Welcome!</Text>
          <View
            style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
            <Button title="Get Location" onPress={getLocation} />
          </View>
        </View>
      </RootSiblingParent>
    );
  } else {
    const { width, height } = Dimensions.get("window");
    const userRegion = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 90.0922,
      longitudeDelta: 66.0421,
    };

    const getUserClickLoc = function(loc) {
      let locObj = loc.nativeEvent.coordinate;
      getLocationData({latitude: locObj.latitude, longitude: locObj.longitude});
    }

    return (
      <RootSiblingParent>
        
        {/*   <MapView
            provider={PROVIDER_GOOGLE}
            initialRegion={userRegion}
            style={{
              width,
              height,
            }}
            onPress={getUserClickLoc}>
            <Marker coordinate={userRegion} />
          </MapView> */}
          <View style={styles.page}>
           <View style={styles.container}>
        
            {/* <Marker coordinate={userRegion} /> */}
              <Mapbox.MapView style={styles.map}>
              <Mapbox.Camera
          zoomLevel={10}
          centerCoordinate={currentLocation}
          animationMode={'flyTo'}
          animationDuration={2000}
         // centerCoordinate={[-74.0060, 40.7128]} // Long, Lat of New York City
        />
        <Mapbox.PointAnnotation
           id="currentLocation"
           coordinate={currentLocation}
        >
          <View style={{
            height: 30,
            width: 30,
            backgroundColor: '#00ff00',
            borderRadius: 15,
            borderColor: '#fff',
            borderWidth: 3,
          }} />
        </Mapbox.PointAnnotation>
      </Mapbox.MapView>
            </View>
            </View>
      </RootSiblingParent>
    );
  }
};

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/
export default App; 

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
      console.error(error);
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
            getLocationData({latitude: position.coords.latitude, longitude: position.coords.longitude});
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
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    return (
      <RootSiblingParent>
        <ScrollView>
          <MapView
            provider={PROVIDER_GOOGLE}
            initialRegion={userRegion}
            style={{
              width,
              height,
            }}>
            <Marker coordinate={userRegion} />
          </MapView>
        </ScrollView>
      </RootSiblingParent>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;

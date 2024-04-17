//import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

global.navigator = {
    geolocation: {
      clearWatch: jest.fn(),
      getCurrentPosition: jest.fn((success, failure, options) => {
        success({
          coords: {
            longitude: 60,
            latitude: 60,
          },
        });
      }),
      stopObserving: jest.fn(),
      watchPosition: jest.fn(),
    },
  };
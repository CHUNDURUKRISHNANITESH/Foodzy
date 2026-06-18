import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
//import RNLocation from 'react-native-location';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//adb shell input keyevent 82
//adb uninstall com.foodzy

type LocationType = {
  latitude: number;
  longitude: number;
} | null;

// RNLocation.configure({
//   distanceFilter: 0,
// });

export default function PaymentSuccessScreen() {
  const navigation = useNavigation<any>();

  const [currentLocation, setCurrentLocation] =
    useState<LocationType>(null);
  useEffect(() => {
    const loadLocation = async () => {
      const savedLocation =
        await AsyncStorage.getItem('userLocation');

      if (savedLocation) {
        setCurrentLocation(JSON.parse(savedLocation));
      }
    };

    loadLocation();
  }, []);

  const handleTrackOrder = () => {
    // if (!currentLocation) {
    //   Alert.alert(
    //     'Location unavailable',
    //     'Please allow location access first.'
    //   );
    //   return;
    // }

    navigation.navigate('trackOrder');

    // navigation.navigate('trackOrder', {
    //   userLocation: currentLocation,
    // });

  };

  //const subscriptionRef = useRef<null | (() => void)>(null);

  // useEffect(() => {
  //   const startTracking = async () => {
  //     const granted = await RNLocation.requestPermission({
  //       ios: 'whenInUse',
  //       android: { detail: 'fine' },
  //     });

  //     // if (!permission) {
  //     //   Alert.alert('Permission denied');
  //     //   return;
  //     // }

  //     if (granted) {
  //       RNLocation.subscribeToLocationUpdates((locations) => {
  //         const { latitude, longitude } = locations[0];
  //         console.log(granted)
  //         console.log(latitude, longitude);
  //         setCurrentLocation({ latitude, longitude });
  //       });
  //     }

  //     // subscriptionRef.current = RNLocation.subscribeToLocationUpdates(
  //     //   (locations) => {
  //     //     if (!locations?.length) return;

  //     //     const { latitude, longitude } = locations[0];
  //     //     console.log("here I am")
  //     //     console.log(latitude, longitude)

  //     //     setCurrentLocation({ latitude, longitude });
  //     //   }
  //     // );
  //   };

  //   startTracking();

  //   // return () => {
  //   //   if (subscriptionRef.current) {
  //   //     subscriptionRef.current();
  //   //     console.log(subscriptionRef.current())
  //   //   }
  //   // };
  // }, []);

  // const handleTrackOrder = () => {
  //   if (!currentLocation) {
  //     Alert.alert('Location not ready yet');
  //     return;
  //   }

  //   navigation.navigate('trackOrder', {
  //     userLocation: currentLocation,
  //   });
  // };

  return (
    <View style={styles.container}>
      <Image
        style={styles.walletImage}
        source={require('../assets/walletCongratulate.png')}
      />

      <View style={styles.box}>
        <Text style={styles.congratulate}>Congratulations</Text>
        <Text style={styles.success}>
          Order has successfully placed, click Track order
        </Text>
      </View>

      <TouchableOpacity style={styles.track} onPress={handleTrackOrder}>
        <Text style={styles.trackOrder}>TRACK ORDER</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white'
  },

  walletImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 130
  },

  box: {
    alignItems: 'center',
    marginTop: 20,
  },

  congratulate: {
    fontSize: 28,
    fontFamily: 'Sen-Bold',
    color: '#181C2E',
  },

  success: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#7E8A97',
    lineHeight: 24,
    width: 250,
    fontFamily: 'Sen-Regular'
  },
  payScreen: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    marginTop: 30
  },
  track: {
    backgroundColor: '#FF7622',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 110,
    paddingVertical: 20,
    marginTop: 200
  },
  trackOrder: {
    color: 'white',
    fontFamily: 'Sen-Medium',
    fontSize: 16,
  }
})
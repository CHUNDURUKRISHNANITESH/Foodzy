import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image } from 'react-native';
import { useLocation } from '../context/LocationContext';
import RNLocation from 'react-native-location';
import { Alert, Linking } from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

type LocationAccessNavProp = StackNavigationProp<RootStackParamList, 'LocationAccess'>;
//adb shell input keyevent 82
RNLocation.configure({
  distanceFilter: 0,
});

const LocationAccessScreen = () => {
  const navigation = useNavigation<LocationAccessNavProp>();
  useEffect(() => {
    checkLocationPermission();
  }, []);
  const { setUserLocation } = useLocation();

  // const handleAccessLocation = async () => {
  //   await AsyncStorage.setItem('offerShownAfterLogin', 'false');
  //   navigation.replace('Home');
  // };

  const handleAccessLocation = async () => {
    try {
      const granted = await RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'fine',
        },
      });

      if (!granted) {
        return;
      }

      const latestLocation = await RNLocation.getLatestLocation({
        timeout: 10000,
      });
      console.log("I am here")
      console.log(latestLocation)

      if (!latestLocation) {
        Alert.alert('Unable to fetch location');
        return;
      }

      
      navigation.replace('Home');
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccessLocationButton = async () => {
    const granted = await RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'fine',
      },
    });

    if (granted) {
      handleAccessLocation();
    } else {
      Alert.alert(
        'Location Permission Required',
        'Please enable location permission from Settings.',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Open Settings',
            onPress: () => Linking.openSettings(),
          },
        ]
      );
    }
  };

  const checkLocationPermission = async () => {
    const status = await check(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );

    switch (status) {
      case RESULTS.GRANTED:
        console.log('Permission granted');
        break;

      case RESULTS.DENIED:
        const result = await request(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );

        console.log('Request result:', result);
        break;

      case RESULTS.BLOCKED:
        console.log("permission blocked")
        Alert.alert(
          'Permission Blocked',
          'Please enable location permission from Settings.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
          ]
        );
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Maps.png')} style={styles.map}></Image>
      <TouchableOpacity style={styles.button} onPress={handleAccessLocationButton}>
        <Text style={styles.buttonText}>ACCESS LOCATION</Text>
        <Image source={require('../assets/Map_Pin.png')}></Image>
      </TouchableOpacity>
      <Text style={styles.infoText}>
        DFOOD WILL ACCESS YOUR LOCATION ONLY WHILE USING THE APP.
      </Text>
    </View>
  );
};

export default LocationAccessScreen;

const styles = StyleSheet.create({

  map: {
    width: '90%',
    height: '39%',
    marginTop: '40%'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#FF6600',
    paddingVertical: 18,
    paddingHorizontal: 65,
    borderRadius: 15,
    marginTop: '13%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Sen-Bold'
  },
  infoText: {
    textAlign: 'center',
    color: '#555',
    fontSize: 16,
    marginTop: '12%',
    width: '90%',
    fontFamily: 'Sen-Medium'
  },
});

import React, { useState } from 'react'
import { View, Image, Text, TouchableOpacity, Dimensions, Alert, PermissionsAndroid, Platform } from 'react-native'
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';

//adb shell input keyevent 82

type LocationType = {
  latitude: number;
  longitude: number;
} | null;

export default function PaymentSuccessScreen() {
  const navigation = useNavigation<any>();
  const { width, height } = Dimensions.get('window');
  const [currentLocation, setCurrentLocation] =
    useState<LocationType>(null);

  const handleTrackOrder = () => {
    navigation.navigate('trackOrder', {
      userLocation: {
        latitude: 17.385044,
        longitude: 78.486671,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.walletImage} source={require('../assets/walletCongratulate.png')}></Image>
      <View style={styles.box}>
        <Text style={styles.congratulate}>Congratulations</Text>
        <Text style={styles.success}>Order has successfully placed, you can check order status by clicking Track order</Text>
      </View>
      <TouchableOpacity style={styles.track} onPress={handleTrackOrder}>
        <Text style={styles.trackOrder}>TRACK ORDER</Text>
      </TouchableOpacity>
    </View>
  )
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
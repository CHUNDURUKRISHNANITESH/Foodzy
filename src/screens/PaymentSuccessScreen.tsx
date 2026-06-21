import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useOrder } from '../context/OrderContext';
import { useCart } from '../context/Cart';

//adb shell input keyevent 82
//adb uninstall com.foodzy

type LocationType = {
  latitude: number;
  longitude: number;
} | null;

export default function PaymentSuccessScreen() {
  const navigation = useNavigation<any>();
  const { setOrderPlaced } = useOrder();
  const { clearCart } = useCart();

  useEffect(() => {
    setOrderPlaced(true);
  }, []);

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
    navigation.navigate('trackOrder');
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.walletImage}
        source={{ uri: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847378/walletCongratulate_xtljkm.png' }}
      />

      <View style={styles.box}>
        <Text style={styles.congratulate}>Congratulations</Text>
        <Text style={styles.success}>
          Order has successfully placed, click Track order
        </Text>
      </View>

      <TouchableOpacity activeOpacity={0.9} style={styles.track} onPress={handleTrackOrder}>
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
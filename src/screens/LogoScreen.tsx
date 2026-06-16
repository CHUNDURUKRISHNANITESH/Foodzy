
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import RadialPattern from '../components/RadialPattern';
import { Image } from 'react-native';

type RootStackParamList = {
  Logo: undefined;
  Favorites: undefined;
  Chef: undefined;
  Delivery: undefined;
  Login: undefined;
};

type ScreenNavigationProp<T extends keyof RootStackParamList> = StackNavigationProp<
  RootStackParamList,
  T
>;

type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<RootStackParamList, T>;

type LogoScreenProps = {
  navigation: ScreenNavigationProp<'Logo'>;
  route: ScreenRouteProp<'Logo'>;
};

export default function LogoScreen({ navigation }: LogoScreenProps) {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, { toValue: 20, duration: 1000, useNativeDriver: true }),
        Animated.timing(animation, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ])
    ).start();

    const timer = setTimeout(() => {
      navigation.replace('Favorites');
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.center}>
      <Image source={require('./Logo.png')} style={{ marginTop: '80%' }} />
      <Image source={require('../assets/ellipse.png')} style={styles.ellipse} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  ellipse: {
    marginTop: '40%',
    marginLeft: '45%'
  }
});




import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import RadialPattern from '../components/RadialPattern';
import { Image } from 'react-native';

const { width, height } = Dimensions.get('window');

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
      <Image source={{uri:'https://res.cloudinary.com/diazmm0lw/image/upload/v1781849243/Logo_bzchck.png'}} style={{ marginTop: '80%', width:width*0.33, height:height*0.07 }} />
      <Image source={{uri:'https://res.cloudinary.com/diazmm0lw/image/upload/v1781847266/ellipse_n4mqvq.png'}} style={styles.ellipse} />
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
    width:width*0.6,
    height:height*0.29,
    marginTop: '40%',
    marginLeft: '45%'
  }
});



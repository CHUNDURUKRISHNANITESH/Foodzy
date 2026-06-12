import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LocationAccessNavProp = StackNavigationProp<RootStackParamList, 'LocationAccess'>;

const LocationAccessScreen = () => {
  const navigation = useNavigation<LocationAccessNavProp>();

  const handleAccessLocation = async () => {
  await AsyncStorage.setItem('offerShownAfterLogin', 'false');
  navigation.replace('Home');
};

  // const handleAccessLocation = () => {
  //   navigation.navigate('Home'); 
  // };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/Maps.png')} style={styles.map}></Image>
      <TouchableOpacity style={styles.button} onPress={handleAccessLocation}>
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

  map:{
    width:'90%',
    height:'39%',
    marginTop:'40%'
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
    flexDirection:'row',
    alignItems:'center',
    gap:'10%'
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
    marginTop:'12%',
    width:'90%',
    fontFamily: 'Sen-Medium'
  },
});


import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Pagination from '../components/Pagination';
import { ScreenProps } from '../navigation/types';
import { Image } from 'react-native';
//adb shell input keyevent 82
export default function FavoritesScreen({ navigation }: ScreenProps<'Favorites'>) {
  return (
    <View style={styles.center}>
      <Image source={require('../assets/favorites.png')} style={styles.favorite}/>
      <Text style={styles.title}>All your favorites</Text>
      <Text style={styles.subtitle}>
        Get all your loved foods in one place, you just place the order we do the rest
      </Text>

      <Pagination total={3} currentIndex={0} />

      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Chef')} style={styles.next}>
          <Text style={styles.textNext}>NEXT</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.skip}>
          <Text style={styles.textSkip}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', backgroundColor:'white' },
  title: { fontSize: 24, fontWeight: 'bold',marginTop:30, marginBottom: 30, textAlign: 'center' },
  subtitle: {fontFamily:'', fontSize: 16, color: '#646982', textAlign: 'center', marginBottom: 20, width:'80%', lineHeight:25 },

  favorite:{
    width:'100%', 
    height:'40%',
    marginTop:'10%'
  },
  next: { backgroundColor: '#FF7622', marginTop:'14%', paddingHorizontal: '37%', borderRadius: 8, paddingVertical:'5%' },
  skip: {padding: 12, marginTop:'5%', alignItems:'center'},
  textNext: { color: 'white', fontWeight: 'bold' },
  textSkip: { color: 'grey', fontWeight: 'bold' },
});



// import { Dimensions } from 'react-native';

// const { width, height } = Dimensions.get('window');

// const styles = StyleSheet.create({

//   center: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },

//   title: {
//     fontSize: width * 0.065,
//     fontWeight: 'bold',
//     marginTop: height * 0.035,
//     marginBottom: height * 0.035,
//     textAlign: 'center',
//   },

//   subtitle: {
//     fontSize: width * 0.042,
//     color: '#646982',
//     textAlign: 'center',
//     marginBottom: height * 0.025,
//     width: width * 0.8,
//     lineHeight: height * 0.035,
//   },

//   favorite: {
//     width: width,
//     height: height * 0.4,
//     marginTop: height * 0.1,
//   },

//   next: {
//     backgroundColor: '#FF7622',
//     marginTop: height * 0.14,
//     paddingHorizontal: width * 0.37,
//     paddingVertical: height * 0.025,
//     borderRadius: width * 0.02,
//   },

//   skip: {
//     padding: width * 0.03,
//     marginTop: height * 0.02,
//     alignItems: 'center',
//   },

//   textNext: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: width * 0.04,
//   },

//   textSkip: {
//     color: 'grey',
//     fontWeight: 'bold',
//     fontSize: width * 0.04,
//   },

// });


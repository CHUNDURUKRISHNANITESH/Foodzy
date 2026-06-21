import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { ScreenProps } from '../navigation/types';
import Pagination from '../components/Pagination';
import { Image } from 'react-native';


export default function ChefScreen({ navigation }: ScreenProps<'Chef'>) {
  return (
    <View style={styles.center}>
      <Image source={{
        uri: 'https://res.cloudinary.com/diazmm0lw/image/upload/v1781846704/chef_vpwtju.webp',
      }} style={styles.favorite} />
      <Text style={styles.title}>Order from chosen chef</Text>
      <Text style={styles.subtitle}>
        Get all your loved foods in one place, you just place the order we do the rest

      </Text>

      <Pagination total={3} currentIndex={1} />

      <View>
        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Delivery')} style={styles.next}>
          <Text style={styles.textNext}>NEXT</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Login')} style={styles.skip}>
          <Text style={styles.textSkip}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', backgroundColor: 'white' },
  logo: { fontSize: 40, fontWeight: 'bold', marginBottom: 20 },
  semiCircle: {
    width: 200,
    height: 100,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    backgroundColor: 'orange',
  },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 30, marginBottom: 30, textAlign: 'center' },
  subtitle: { fontSize: 16, color: 'gray', textAlign: 'center', marginBottom: 20, width: '80%', lineHeight: 25 },

  favorite: {
    width: '100%',
    height: '44%',
    marginTop: '2%'
  },
  next: { backgroundColor: '#FF7622', marginTop: '14%', paddingHorizontal: '37%', borderRadius: 8, paddingVertical: '5%' },
  skip: { padding: 12, marginTop: '5%', alignItems: 'center' },
  textNext: { color: 'white', fontWeight: 'bold' },
  textSkip: { color: '#646982', fontWeight: 'bold', fontFamily: 'sen' },
});
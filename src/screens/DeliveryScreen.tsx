import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Pagination from '../components/Pagination';
import { ScreenProps } from '../navigation/types';
import { Image } from 'react-native';

export default function DeliveryScreen({ navigation }: ScreenProps<'Delivery'>) {
  return (
    <View style={styles.center}>
      <Image source={require('../assets/delivery.png')} style={styles.favorite}/>
      <Text style={styles.title}>Free delivery offers</Text>
      <Text style={styles.subtitle}>
        Get all your loved foods in one place, you just place the order we do the rest
      </Text>

      <Pagination total={3} currentIndex={2} />

      <View>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.next}>
          <Text style={styles.textNext}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', backgroundColor:'white' },
  logo: { fontSize: 40, fontWeight: 'bold', marginBottom: 20 },
  semiCircle: {
    width: 200,
    height: 100,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    backgroundColor: 'orange',
  },
 title: { 
  fontSize: 24, 
  fontWeight: 'bold',
  marginTop:30, 
  marginBottom: 30, 
  textAlign: 'center' 
},
  subtitle: { 
    fontSize: 16, 
    color: 'gray', 
    textAlign: 'center', 
    marginBottom: 20, 
    width:'80%', 
    lineHeight:25 
  },

  favorite:{
    width:'100%', 
    height:'40%',
     marginTop:'10%'
  },
  next: { backgroundColor: '#FF7622', marginTop:'14%', paddingHorizontal: '35%', borderRadius: 8, paddingVertical:'5%' },
  textNext: { color: 'white', fontWeight: 'bold' },
});
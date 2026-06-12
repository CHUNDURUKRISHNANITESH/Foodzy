import React from 'react';
import { View, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SocialIcons() {
  return (
    <View style={styles.socialRow}>
      <View style={[styles.circle, { backgroundColor: '#3b5998' }]}>
        <FontAwesome name="facebook" size={20} color="white" />
      </View>
      <View style={[styles.circle, { backgroundColor: '#1DA1F2' }]}>
        <FontAwesome name="twitter" size={20} color="white" />
      </View>
      <View style={[styles.circle, { backgroundColor: 'black' }]}>
        <Ionicons name="logo-apple" size={20} color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  circle: {
    width: 68,
    height: 68,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});














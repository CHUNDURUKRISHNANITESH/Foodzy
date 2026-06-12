import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  total: number;
  currentIndex: number;
};

export default function Pagination({ total, currentIndex }: Props) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            { backgroundColor: i === currentIndex ? '#FF7622' : '#FFE1CE' }, 
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginVertical: 20 },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 5,
  },
});
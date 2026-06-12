import React from 'react';
import { View } from 'react-native';
import Svg, { Line } from 'react-native-svg';

export default function RadialPattern() {
  const lines = Array.from({ length: 30 });
  const radius = 200; 
  const angleStep = (Math.PI / 2) / lines.length;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Svg height={radius} width={radius}>
        {lines.map((_, i) => {
          const angle = i * angleStep;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          const color = `rgba(255,140,0,${1 - i / lines.length})`;

          return (
            <Line
              key={i}
              x1={0}
              y1={radius}
              x2={x}
              y2={radius - y}
              stroke={color}
              strokeWidth={2 + i * 0.2}
            />
          );
        })}
      </Svg>
    </View>
  );
}
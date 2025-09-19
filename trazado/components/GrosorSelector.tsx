import React from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

interface GrosorSelectorProps {
  size: number;
  setSize: (value: number) => void;
}

export default function GrosorSelector({ size, setSize }: GrosorSelectorProps) {
  return (
    <View style={{ width: 200, alignItems: 'center', marginBottom: 16 }}>
      <Text style={{
        fontFamily: 'GilroyBold',
        fontSize: 22,
        color: '#2D3A4A',
        marginBottom: 4
      }}>
        Grosor: {size}
      </Text>
      <Slider
        minimumValue={2}
        maximumValue={24}
        step={1}
        value={size}
        onValueChange={setSize}
        minimumTrackTintColor="#FFD700"
        maximumTrackTintColor="#2D3A4A"
        thumbTintColor="#2D3A4A"
        style={{ width: 180 }}
      />
    </View>
  );
}

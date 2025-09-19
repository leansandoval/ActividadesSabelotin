import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

interface LetterSelectorProps {
  letters: string[];
  selectedLetter: string;
  setSelectedLetter: (letter: string) => void;
  clearFn: (() => void) | null;
  setStrokes: (strokes: any[]) => void;
  setResult: (result: string | null) => void;
}

export default function LetterSelector({
  letters,
  selectedLetter,
  setSelectedLetter,
  clearFn,
  setStrokes,
  setResult
}: LetterSelectorProps) {
  const currentIndex = letters.indexOf(selectedLetter);

  const goPrev = () => {
    const prevIndex = (currentIndex - 1 + letters.length) % letters.length;
    setSelectedLetter(letters[prevIndex]);
    setStrokes([]);
    setResult(null);
    if (clearFn) clearFn();
  };

  const goNext = () => {
    const nextIndex = (currentIndex + 1) % letters.length;
    setSelectedLetter(letters[nextIndex]);
    setStrokes([]);
    setResult(null);
    if (clearFn) clearFn();
  };

  const visibleLetters = [];
  for (let i = 0; i < 5; i++) {
    visibleLetters.push(letters[(currentIndex + i) % letters.length]);
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
      <TouchableOpacity
        onPress={goPrev}
        style={{
          padding: 8,
          borderRadius: 16,
          backgroundColor: '#FFD700',
          marginRight: 8,
          elevation: 2,
        }}>
        <Text style={{ fontSize: 24 }}>{'⬅️'}</Text>
      </TouchableOpacity>
      {visibleLetters.map((letter) => (
        <TouchableOpacity
          key={letter}
          onPress={() => {
            setSelectedLetter(letter);
            setStrokes([]);
            setResult(null);
            if (clearFn) clearFn();
          }}
          style={{
            backgroundColor: selectedLetter === letter ? '#FFD700' : '#FFF',
            padding: 12,
            borderRadius: 16,
            marginRight: 8,
            borderWidth: selectedLetter === letter ? 3 : 1,
            borderColor: '#2D3A4A',
            elevation: 3,
          }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#2D3A4A',
          }}>
            {letter}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={goNext}
        style={{
          padding: 8,
          borderRadius: 16,
          backgroundColor: '#FFD700',
          marginLeft: 8,
          elevation: 2,
        }}>
        <Text style={{ fontSize: 24 }}>{'➡️'}</Text>
      </TouchableOpacity>
    </View>
  );
}
import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';

export default function App() {
  const length = 4;
  const [pin, setPin] = useState(Array(length).fill(''));
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (text.length > 1) text = text.slice(-1);

    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);

    // Move to next input
    if (text && index < length - 1) {
      inputs.current[index + 1].focus();
    }

    // Check if all fields are filled
    if (newPin.every(val => val !== '')) {
      Alert.alert('PIN Entered', newPin.join(''));
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && pin[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {pin.map((value, index) => (
        <TextInput
          key={index}
          style={styles.input}
          keyboardType="number-pad"
          maxLength={1}
          value={value}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          ref={(ref) => inputs.current[index] = ref}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 150,
    gap: 15,
  },
  input: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 22,
    backgroundColor: '#fff',
  },
});

import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Background from '../common/Background';


export default function Lockscreen() {
  const actions = [
    { icon: <Ionicons name="cellular" size={28} color="#e14412" />, label: 'Airtime' },
     { icon: <MaterialIcons name="tv" size={28} color="#e14412" />, label: 'Data' },
    { icon: <MaterialIcons name="phone-android" size={28} color="#e14412" />, label: 'Support' },
    { icon: <Entypo name="dots-three-horizontal" size={28} color="#e14412" />, label: 'More Data' },
  ];

  const length = 4;
  // State to hold the PIN input
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
      console.log('PIN Entered', newPin.join(''));
     }
   };
 
   const handleKeyPress = (e, index) => {
     if (e.nativeEvent.key === 'Backspace' && pin[index] === '' && index > 0) {
       inputs.current[index - 1].focus();
     }
   };
 

  return (
    <Background>
      <Text style={styles.title}>Quick Actions</Text>
      <View style={styles.grid}>
        {actions.map((action, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            {action.icon}
            <Text style={styles.label}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

     <View style={styles.pinContainer}>
          {pin.map((value, index) => (
            <TextInput
              key={index}
              secureTextEntry={true}
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

      <TouchableOpacity style={styles.fingerprintContainer}>
        <Image
          source={{ uri: 'https://img.icons8.com/ios-filled/100/ffffff/fingerprint.png' }}
          style={styles.fingerprint}
        />
      </TouchableOpacity>
    </Background>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 18,
    marginBottom: 40,
  },
  card: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    elevation: 3,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    color: '#111',
    fontWeight: '500',
  },
  pinInput: {
  
  },
  fingerprintContainer: {
    alignItems: 'center',
  },
  fingerprint: {
    width: 50,
    height: 50,
    opacity: 0.85,
  },
  input: {
      backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    marginHorizontal: 5,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
});
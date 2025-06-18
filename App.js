import { StyleSheet, View } from 'react-native';
import Lockscreen from './src/components/auth/Lockscreen';

 function App() {
  return  (
  <View style={styles.container}>
    <Lockscreen />
  </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }
});


export default App;
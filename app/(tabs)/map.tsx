import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native'
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

export default function TabMapScreen() {

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();

    console.log(location);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map</Text>
      {errorMsg && <Text>{errorMsg}</Text>}
      
      {location && <MapView style={StyleSheet.absoluteFill}
        initialRegion={{
          latitude: location?.coords.latitude ?? 0,
          longitude: location?.coords.longitude ?? 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        
      />}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

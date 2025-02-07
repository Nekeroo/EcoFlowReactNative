import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native'
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

interface NominatimPlace {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  type: string;
}

export default function TabMapScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [places, setPlaces] = useState<NominatimPlace[]>([]);

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      // Une fois la localisation obtenue, chercher les points d'intérêt
      if (location) {
        fetchNearbyPlaces(location.coords.latitude, location.coords.longitude);
      }
    }

    getCurrentLocation();
  }, []);

  const fetchNearbyPlaces = async (latitude: number, longitude: number) => {
    try {
      // Recherche des points de recyclage dans un rayon de 5km
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=recycling&lat=${latitude}&lon=${longitude}&radius=5000`
      );
      const data = await response.json();
      setPlaces(data);
      console.log(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des points d\'intérêt:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map</Text>
      {errorMsg && <Text>{errorMsg}</Text>}
      
      {location && (
        <MapView 
          style={StyleSheet.absoluteFill}
          initialRegion={{
            latitude: location?.coords.latitude ?? 0,
            longitude: location?.coords.longitude ?? 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChangeComplete={(region) => {
            fetchNearbyPlaces(region.latitude, region.longitude);
          }}
        >
          {/* Marqueur pour la position actuelle */}
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Ma position"
            pinColor="blue"
          />

          {/* Marqueurs pour les points d'intérêt */}
          {places.map((place, index) => (
            <Marker
              key={place.place_id}
              coordinate={{
                latitude: parseFloat(place.lat),
                longitude: parseFloat(place.lon),
              }}
              title={place.display_name}
              description={place.type}
            />
          ))}
        </MapView>
      )}
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

import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { useLocation } from "@/hooks/useLocation";
import { useOSMData } from "@/hooks/useOSMDATA";

export default function TabMapScreen() {
  const { location, errorMsg } = useLocation();
  const { markers, loading } = useOSMData(location?.coords.latitude, location?.coords.longitude);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map</Text>
      {errorMsg && <Text>{errorMsg}</Text>}
      
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      
      {location && (
        <MapView
          style={StyleSheet.absoluteFill}
          initialRegion={{
            latitude: location?.coords.latitude ?? 0,
            longitude: location?.coords.longitude ?? 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{ latitude: marker.lat, longitude: marker.lon }}
              title={marker.name}
              description={marker.tags.amenity || "Type inconnu"}
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
    fontWeight: "bold",
  },
});

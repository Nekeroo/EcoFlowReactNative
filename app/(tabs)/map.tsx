import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import MapView, {
  Callout,
  Marker,
  Region,
} from "react-native-maps";
import { useLocation } from "@/hooks/useLocation";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  defineMarkerAdress,
  OSMNode,
  fetchOSMData,
} from "@/services/osmService";
import Checkbox from "expo-checkbox";
import { handleOpenMaps } from "@/services/mapService";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const DEFAULT_AMENITIES = [
  { key: "recycling", label: "Point de collecte" },
  { key: "waste_basket", label: "Poubelle publique" },
  { key: "waste_disposal", label: "Conteneur poubelles" },
];

const DEFAULT_RECYCLING_TYPE = [
  { key: "batteries", label: "Batteries" },
  { key: "books", label: "Livres" },
  { key: "cans", label: "Cannettes" },
  { key: "cartons", label: "Boîte en Carton" },
  { key: "cardboard", label: "Carton" },
  { key: "clothes", label: "Vêtements" },
  { key: "electrical_appliances", label: "Appareils électriques" },
  { key: "glass_bottles", label: "Bouteilles en verre" },
  { key: "green_waste", label: "Déchets verts" },
  { key: "magazines", label: "Magazines" },
  { key: "newspaper", label: "Journaux" },
  { key: "paper", label: "Papier" },
  { key: "paper_packaging", label: "Emballages en papier" },
  { key: "plastic", label: "Plastique" },
  { key: "plastic_bottles", label: "Bouteilles en plastique" },
  { key: "plastic_packaging", label: "Emballages en plastique" },
  { key: "scrap_metal", label: "Métaux" },
  { key: "small_appliances", label: "Petits appareils électroménagers" },
  { key: "waste", label: "Déchets divers" },
  { key: "wood", label: "Bois" },
];

export default function TabMapScreen() {
  const { location, errorMsg } = useLocation();
  const [region, setRegion] = useState<Region | null>(null);
  const [markerAddresses, setMarkerAddresses] = useState<
    Record<number, string>
  >({});
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    DEFAULT_AMENITIES.map((a) => a.key)
  );
  const [selectedRecyclingType, setSelectedRecyclingType] = useState<string[]>(
    DEFAULT_RECYCLING_TYPE.map((r) => r.key)
  );
  const [modalVisible, setModalVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [markers, setMarkers] = useState<OSMNode[]>([]);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["75%","90%"], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  useEffect(() => {
    if (location) {
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [location]);

  useEffect(() => {
    if (region) {
      fetchData();
    }
  }, [region, selectedAmenities, selectedRecyclingType]);

  async function fetchData() {
    setLoading(true);
    const newMarkers = await fetchOSMData({
      lat: region!.latitude,
      lon : region!.longitude,
      amenities : selectedAmenities,
      recyclingFilters:  selectedRecyclingType}
    );
    setMarkers(newMarkers);
    setLoading(false);
  }

  function toggleAmenity(key: string) {
    setSelectedAmenities((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  }

  function toggleRecyclingType(key: string) {
    setSelectedRecyclingType((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  }

  const handleBottomSheetPress = useCallback((index: number) => {
    console.log("call");
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

  const handleBottomSheetClose = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map</Text>
      {errorMsg && <Text>{errorMsg}</Text>}
      {/* Bouton de sélection des filtres */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => handleBottomSheetPress(0)}
      >
        <Text style={styles.filterButtonText}>Filtres</Text>
      </TouchableOpacity>
      {location && (
        <MapView
          showsCompass={true}
          style={StyleSheet.absoluteFill}
          initialRegion={{
            latitude: location?.coords.latitude ?? 0,
            longitude: location?.coords.longitude ?? 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onRegionChangeComplete={setRegion}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
            pinColor="blue"
          />
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{ latitude: marker.lat, longitude: marker.lon }}
              title={marker.name}
              description={marker.tags.amenity || "Type inconnu"}
              onPress={() => defineMarkerAdress(marker, setMarkerAddresses)}
            >
              <Callout
                onPress={() =>
                  handleOpenMaps(
                    marker.lat,
                    marker.lon,
                    marker.name ?? "Nom inconnu"
                  )
                }
              >
                <View style={{ padding: 5 }}>
                  <Text style={{ fontWeight: "bold" }}>{marker.name}</Text>
                  <Text>
                    {markerAddresses[marker.id] ?? "Adresse en cours..."}
                  </Text>
                  <Text>Cliquez pour voir l'itinéraire</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
      {/* Loader en haut à gauche */}
      {loading && (
        <ActivityIndicator size="large" color="#FFFFFF" style={styles.loader} />
      )}
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
      >
        <BottomSheetView style={styles.bottomSheet}>
          <Text style={styles.modalTitleCentered}>
            Choisissez les types de recyclage
          </Text>

          {/* Liste des catégories (amenities) */}
          <FlatList
            data={DEFAULT_AMENITIES}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <View style={styles.checkboxContainer}>
                <Checkbox
                  value={selectedAmenities.includes(item.key)}
                  onValueChange={() => toggleAmenity(item.key)}
                />
                <Text style={styles.checkboxLabel}>{item.label}</Text>
              </View>
            )}
            scrollEnabled={false} // Empêche la FlatList d’avoir son propre scroll
            contentContainerStyle={styles.listContainer}
            style={{width: "90%", maxHeight: "20%"}}
          />

          {/* Séparateur visuel */}
          <View style={styles.separator} />

          <Text style={styles.modalTitleCentered}>
            Choisissez les matériaux recyclés
          </Text>

          {/* Liste des types de recyclage */}
          <FlatList
            data={DEFAULT_RECYCLING_TYPE}
            keyExtractor={(item) =>
              Array.isArray(item.key) ? item.key[0] : item.key
            }
            renderItem={({ item }) => (
              <View style={styles.checkboxContainer}>
                <Checkbox
                  value={selectedRecyclingType.includes(item.key)}
                  onValueChange={() => toggleRecyclingType(item.key)}
                />
                <Text style={styles.checkboxLabel}>{item.label}</Text>
              </View>
            )}
            scrollEnabled={true}
            style={{ maxHeight: "45%", width: "90%" }}
            contentContainerStyle={styles.listContainer}
          />

          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              handleBottomSheetClose();
            }}
          >
            <Text style={styles.modalButtonText}>Appliquer</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
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
    textAlign: "center",
    marginVertical: 10,
  },
  filterButton: {
    position: "absolute",
    bottom: 80,
    right: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    zIndex: 999,
  },
  filterButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loader: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scrollContainer: {
    flexGrow: 0,
    paddingBottom: 20,
  },bottomSheet: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  modalTitleCentered: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    width: "100%",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    marginVertical: 5,
  },
  checkboxLabel: {
    marginLeft: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
    width: "100%",
  },
  modalButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  listContainer: {
    alignItems: "flex-start",
    width: "100%",
  },
});

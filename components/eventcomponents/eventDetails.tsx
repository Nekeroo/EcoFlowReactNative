import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { EventComponentProps } from "./event";
import { handleOpenMaps } from "@/services/mapService";
import { defineCoordinatesByAddress } from "@/services/osmService";
import { useState } from "react";
import useUserStore from "@/store/userStore";
import useEventStore from "@/store/eventStore";
import { EventDetailsProps } from "@/app/(tabs)/events";

export default function EventDetails({ event, onClose }: EventDetailsProps) {
  const [loading, setLoading] = useState(false);

  const { user } = useUserStore();

  const { deleteEvent, getEvent } = useEventStore();

  function handleClickOnAdress(props: { address: string; city: string }) {
    setLoading(true);
    console.log("event : ", props);
    defineCoordinatesByAddress(props).then((result) => {
      if (result) {
        handleOpenMaps(result.lat, result.lon, "");
      } else {
        console.error("Aucune coordonnée trouvée pour cette adresse.");
      }
      setLoading(false);
    });
  }

  return (
    <View style={styles.container}>
      {!loading && 
        <View>
          <Text style={styles.title}>{event.name}</Text>
          <TouchableOpacity
            onPress={() =>
              handleClickOnAdress({ address: event.address, city: event.city })
            }>
            <Text style={styles.address}>
              📍 {event.address}, {event.city}
            </Text>
          </TouchableOpacity>
          {event.description && (
            <Text>
              📝
              <Text style={styles.description}> {event.description}</Text>
            </Text>
          )}
          <Text style={styles.participants}>
            👥 {event.nbUsers} participants
          </Text>
          <Text style={styles.eventDate}>
            🗓️ {event.date}
          </Text>
            <TouchableOpacity
              onPress={() => {
                deleteEvent(event.id ?? 0, user?.id ?? 0)
                getEvent()
                onClose()
              }
              }
            >
              <Text>Supprimer</Text>
            </TouchableOpacity>
        </View>
      }

      {loading && (
        <View>
          <ActivityIndicator
            size="large"
            color="#dbdbdb"
            style={StyleSheet.absoluteFill}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 10,
    paddingBottom: "100%",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  address: {
    fontSize: 18,
    color: "#555",
    marginBottom: 8,
  },
  participants: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007AFF",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#666",
    marginTop: 8,
    paddingHorizontal: 10,
  },
  eventDate: {
    fontSize: 16,
    color: "#333",
    marginTop: 5,
  }
});

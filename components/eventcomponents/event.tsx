import { Event } from "@/constants/models/event";
import { View, Text, StyleSheet } from "react-native";

export interface EventComponentProps {
  event: Event;
}

export default function EventComponent({ event }: EventComponentProps) {

  return (
        <View style={styles.container}>
          <Text style={styles.eventName}>{event.name}</Text>
          <Text style={styles.address}>📍 {event.address}</Text>
          <Text style={styles.participants}>👥 {event.nbUsers} participants</Text>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(246, 246, 246)", // Fond blanc pour contraste
    borderRadius: 10, // Coins arrondis
    padding: 15, // Espacement intérieur
    marginVertical: 8, // Espacement entre les événements
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, // Effet d'ombre pour donner du relief
    shadowRadius: 4,
    elevation: 3, // Ombre pour Android
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  participants: {
    fontSize: 14,
    color: "#007AFF", // Couleur bleue pour mettre en valeur les participants
    fontWeight: "bold",
  },
  
});

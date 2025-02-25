import { View, Text, StyleSheet } from "react-native";
import { EventComponentProps } from "./event";

export default function EventDetails({ event }: EventComponentProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{event.name}</Text>
            <Text style={styles.address}>📍 {event.address}</Text>
            {event.description && (
                <Text >📝  
                    <Text style={styles.description}>  {event.description}</Text>
                </Text>
            )}
            <Text style={styles.participants}>👥 {event.nbUsers} participants</Text>
            
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
});

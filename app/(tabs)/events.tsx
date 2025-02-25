import EventComponent from '@/components/eventcomponents/event';
import EventDetails from '@/components/eventcomponents/eventDetails';
import { Event } from '@/constants/models/event';
import { useEvent } from '@/hooks/useEvent';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRef, useMemo, useState, useCallback } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TabEventsScreen() {

  const { events } = useEvent();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["60%", "85%"], []);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleOnPress = useCallback((event: Event) => {
    console.log("click", event);
    console.log("Bottom Sheet Ref ", bottomSheetRef.current)
    setSelectedEvent(event);
    if (bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(1);
    }
    else {
      console.log("No bottomSheetRef")
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Évènements</Text>
      <View style={styles.separator} />
      <ScrollView style={styles.scrollView}>
        {events.map((event) => (
          <View key={event.id}>
            <TouchableOpacity onPress={() => handleOnPress(event)}>
              <EventComponent event={event}></EventComponent>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Déplace la BottomSheet en dehors de la boucle */}
        <BottomSheet
          snapPoints={snapPoints}
          index={-1}
          ref={bottomSheetRef}
          enablePanDownToClose={true}
          onClose={() => setSelectedEvent(null)}
        >
          <BottomSheetView style={styles.bottomSheet}>
            {selectedEvent ? <EventDetails event={selectedEvent} /> : <Text>Aucun événement sélectionné</Text>}
          </BottomSheetView>
        </BottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomSheet: {
    backgroundColor: "rgb(246, 246, 246)",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  scrollView: {
    width: "90%",
  }
});

import EventComponent from '@/components/eventcomponents/event';
import EventDetails from '@/components/eventcomponents/eventDetails';
import { Event } from '@/constants/models/event';
import useEventStore from '@/store/eventStore';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TabEventsScreen() {

  const { events, isLoading, getEvent } = useEventStore();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["60%", "85%"], []);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Charger les événements lors du montage du composant
  useEffect(() => {
    getEvent();
  }, [getEvent]);

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    await getEvent();
    setRefreshing(false);
  };
  

  const handleOnPress = useCallback((event: Event) => {
    console.log("click", event);
    setSelectedEvent(event);
    if (bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(1);
    } else {
      console.log("No bottomSheetRef");
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Évènements</Text>
      <View style={styles.separator} />
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <ScrollView 
          style={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={"black"}/>
          }
        >
          {events && events.map((event) => (
            <View key={event.id}>
              <TouchableOpacity onPress={() => handleOnPress(event)}>
                <EventComponent event={event} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
      {/* BottomSheet en dehors de la boucle */}
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

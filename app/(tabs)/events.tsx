import CreateEventScreen from '@/components/eventcomponents/createevent';
import EventComponent from '@/components/eventcomponents/event';
import EventDetails from '@/components/eventcomponents/eventDetails';
import { Event } from '@/constants/models/event';
import useEventStore from '@/store/eventStore';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, RefreshControl, Button } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export interface EventDetailsProps {
  event: Event;
  onClose: Function
}

export default function TabEventsScreen() {

  const { events, isLoading, getEvent } = useEventStore();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["60%", "85%"], []);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showCreateEvent, setShowCreateEvent] = useState(false);

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

  const openCreateEvent = () => {
    setShowCreateEvent(true);
  }
  
  const closeCreateEvent = () => {
    setShowCreateEvent(false);
  }

  const onCloseBottomSheetView = () => {
    bottomSheetRef.current?.close();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Évènements</Text>
      <View style={styles.separator} />
      {isLoading &&
        <ActivityIndicator size="large" color="#000" /> }
      
      { !isLoading && events!!.length == 0 && <Text>Aucun élément trouvé</Text>}

      { !isLoading && events!!.length >= 0 &&
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
      }

      <TouchableOpacity 
        style={styles.buttonCreate}
        onPress={openCreateEvent}>
        <Text>Créer</Text>
      </TouchableOpacity>

      <CreateEventScreen onClose={closeCreateEvent} visible={showCreateEvent} />

      <BottomSheet
        snapPoints={snapPoints}
        index={-1}
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        onClose={() => setSelectedEvent(null)}
      >
        <BottomSheetView style={styles.bottomSheet}>
          {selectedEvent ? <EventDetails event={selectedEvent} onClose={onCloseBottomSheetView}/> : <Text>Aucun événement sélectionné</Text>}
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
  },
  buttonCreate: {
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
  }
});

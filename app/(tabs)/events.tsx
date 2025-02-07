import EventComponent from '@/components/eventcomponents/event';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function TabEventsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Évènements</Text>
      <View style={styles.separator}/>
      <ScrollView>
        <EventComponent/>
        <EventComponent/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

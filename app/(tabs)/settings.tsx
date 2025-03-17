import Login from '@/components/login/login';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Details from '@/components/userDetails/details'

export default function TabSettingsScreen() {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user : ', user);
      setUser(user);
    })
  }, [])

  const disconnect = () => {
    FIREBASE_AUTH.signOut;
    setUser(null)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paramètres</Text>
      <View style={styles.separator}/>
      { user ? 
      <>
      <Button title='Deconnexion' onPress={disconnect}/>
      <Details user={user}></Details>
       </>
       : <Login></Login> }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 80
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

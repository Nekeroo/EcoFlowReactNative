import { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import useUserStore from "@/store/userStore"
import Register from "./register";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Récupération des méthodes login et register depuis le store
  const { login: loginStore } = useUserStore();

  const signIn = async () => {
    setLoading(true);
    try {
      const success = await loginStore({ mail: email, password: password });
      if (!success) {
        alert("Mail ou mot de passe incorrect.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      alert("Une erreur est survenue lors de la connexion.");
    } finally {
      setLoading(false);
    }
  };

  const openRegister = () => {
    setShowRegister(true);
  };

  // Ferme le composant Register
  const closeRegister = () => {
    setShowRegister(false);
  };
  return (
    <View style={styles.loginView}>
      <TextInput
        value={email}
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#666"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        value={password}
        style={styles.input}
        secureTextEntry={true}
        placeholder="Mot de passe"
        placeholderTextColor="#666"
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Button title="Se connecter" onPress={signIn} />
          <Text>Vous n'avez pas encore rejoint EcoFlow ? </Text>
          <Button title="S'enregistrer" onPress={openRegister} />
        </>
      )}
      <Register visible={showRegister} onClose={closeRegister} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginView: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
    width: '80%'
  },
  input: {
    marginVertical: 4,
    height: 50,
    width: "100%",
    borderRadius: 5,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
});

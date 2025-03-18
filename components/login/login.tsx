import { login, register } from "@/services/authentService";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    try {
      const success = await login({ mail: email, password: password });
      console.log(success);
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
  const signUp = async () => {
    setLoading(true);
    try {
      const success = register({
        lastName: "tata",
        firstName: "toto",
        mail: email,
        password: password,
      });
      console.log(success);
      alert("Regardez vos mails ! ");
    } catch (error) {
      console.log(error);
      alert("Saisissez des informations valides.");
    } finally {
      setLoading(false);
    }
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
      ></TextInput>
      <TextInput
        value={password}
        style={styles.input}
        secureTextEntry={true}
        placeholder="Mot de passe"
        placeholderTextColor="#666"
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
      ></TextInput>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Button title="Se connecter" onPress={signIn} />
          <Text>Vous n'avez pas encore rejoint EcoFlow ? </Text>
          <Button title="S'enregistrer" onPress={signUp} />
        </>
      )}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  loginView: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginVertical: 4,
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderRadius: 1,
    padding: 10,
  },
});

import { User } from "@/constants/models/user";
import useUserStore from "@/store/userStore";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

interface DetailsProps {
  user: User;
}

const Details = (props: DetailsProps) => {
  const { user: user, updateUser: update } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState(props.user.mail);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSave = async () => {

    const updatedUser = await update({
      id: user?.id ?? 0,
      userInput: {
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        mail: email,
        password: password,
      },
    });
    setIsEditing(false);
    setPassword("");
  };

  return (
    <View style={styles.container}>
      {!isEditing ? (
        <>
          <Text style={styles.title}>
            Bienvenue {props.user.firstName} {props.user.lastName}
          </Text>
          <Text style={styles.text}>Email : {props.user.mail}</Text>
          <TouchableOpacity
            onPress={() => setIsEditing(true)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Editer</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
    <Text style={styles.title}>Édition des informations</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {error && <Text style={styles.error}>{error}</Text>}
          <TouchableOpacity onPress={handleSave} style={styles.button}>
            <Text style={styles.buttonText}>Sauvegarder</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsEditing(false)}
            style={[styles.button, styles.cancelButton]}
          >
            <Text style={styles.buttonText}>Annuler</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 4,
    marginBottom: 8,
  },
  cancelButton: {
    backgroundColor: "#888",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
});

export default Details;

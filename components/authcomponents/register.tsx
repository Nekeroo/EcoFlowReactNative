import React, { useState } from "react";
import { Modal, View, Text, TextInput, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import useUserStore from "@/store/store";

interface RegisterProps {
  visible: boolean;
  onClose: () => void;
}

const Register = ({ visible, onClose }: RegisterProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Récupération de la méthode register depuis le store
  const { register: registerStore } = useUserStore();

  const handleRegister = async () => {
    setLoading(true);
    try {
      const success = await registerStore({
        firstName,
        lastName,
        mail,
        password,
      });
      console.log(success)
      if (success) {
        onClose();
      } else {
        alert("Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      alert("Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>X</Text>
          </Pressable>
          <Text style={styles.title}>Inscription</Text>
          <TextInput
            style={styles.input}
            placeholder="Prénom"
            placeholderTextColor="#666"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Nom"
            placeholderTextColor="#666"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#666"
            autoCapitalize="none"
            value={mail}
            onChangeText={setMail}
          />
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            placeholderTextColor="#666"
            secureTextEntry={true}
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Pressable style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>S'enregistrer</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  closeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Register;

import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";

export default function TabCreateEventScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>();

  const onSubmit = (data: FormInput) => {
    console.log("Données soumises :", data);
    reset(); 
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Créer ton Événement !</Text>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextInput
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              value={field.value}
              placeholder="Ex: Collecte"
              placeholderTextColor="#666"
              style={styles.input}
            />
          )}
        />
        {errors.name && <Text style={styles.error}>Ce champ est requis</Text>}

        <Controller
          name="address"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextInput
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              value={field.value}
              placeholder="Ex: Lieu"
              placeholderTextColor="#666"
              style={styles.input}
            />
          )}
        />
        {errors.address && <Text style={styles.error}>Ce champ est requis</Text>}

      <Controller
          name="description"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextInput
              multiline={true}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              value={field.value}
              placeholder="Ex: Regroupement pour une collecte déchets"
              placeholderTextColor="#666"
              style={styles.description}
            />
          )}
        />
        {errors.description && <Text style={styles.error}>Ce champ est requis</Text>}

        
        <Controller
          name="nbUsers"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextInput
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              value={field.value?.toString() || ""}
              keyboardType="numeric"
              placeholder="Ex: 20"
              placeholderTextColor="#666"
              style={styles.input}
            />
          )}
        />
        {errors.address && <Text style={styles.error}>Ce champ est requis</Text>}


        {/* Bouton de validation */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>Enregistrer l'évènement</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22, // Taille plus grande pour bien mettre en avant le titre
    textAlign: "center", // Centré sur l’écran // Couleur sombre pour une bonne lisibilité
    marginVertical: 20, // Espacement en haut et en bas
  },
  formContainer: {
    width: "85%", 
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4, 
    alignItems: "center"
  },
  input: {
    width: "100%", 
    height: 45, 
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#007bff", 
    width: "75%",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    width: "100%", 
    height: 120, // Hauteur plus grande pour saisir plusieurs lignes
    backgroundColor: "#fff", // Fond blanc
    borderRadius: 5, // Coins arrondis
    padding: 10, // Espacement interne
    borderWidth: 1, // Bordure fine
    borderColor: "gray", // Bordure grise claire
    textAlignVertical: "top", // Alignement du texte en haut
    paddingHorizontal: 10,
    marginVertical: 10,
    textAlign: "left",
  },
});

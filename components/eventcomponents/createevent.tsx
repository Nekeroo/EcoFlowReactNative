import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Controller, useForm } from "react-hook-form";
import useEventStore from "@/store/eventStore";
import useUserStore from "@/store/userStore";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker'

type FormInput = {
  name: string;
  address: string;
  city: string;
  nbUsers: number;
  description?: string;
  date: Date;
};

interface CreateEventProps {
  visible: boolean;
  onClose: () => void;
}

export default function CreateEventScreen({
  visible,
  onClose,
}: CreateEventProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInput>();

  const [date, setDate] = useState(new Date())

  const { createEvent } = useEventStore();

  const { user } = useUserStore();

  const onSubmit = (data: FormInput) => {
    createEvent({
      name: data.name,
      address: data.address,
      city: data.city,
      nbUsers: data.nbUsers,
      description: data.description ?? "",
      date: data.date.toLocaleDateString("fr-FR"),
      id_member: user?.id ?? 0,
    });
    reset();
    onClose();
    alert("Evènement crée !");
  };

  return (
    <Modal visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
          >
            <View style={styles.closeButtonWrapper}>
                  <TouchableOpacity
                    onPress={onClose}
                    style={styles.closeButton}
                  >
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>✕</Text>
                  </TouchableOpacity>
                </View>
            {user ? (
              <>
                
                <ScrollView
                  contentContainerStyle={styles.scrollContainer}
                  keyboardShouldPersistTaps="handled"
                >
                  <View>
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
                    {errors.name && (
                      <Text style={styles.error}>Ce champ est requis</Text>
                    )}

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
                    {errors.address && (
                      <Text style={styles.error}>Ce champ est requis</Text>
                    )}

                    <Controller
                      name="city"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <TextInput
                          onBlur={field.onBlur}
                          onChangeText={field.onChange}
                          value={field.value}
                          placeholder="Ex: Ville"
                          placeholderTextColor="#666"
                          style={styles.input}
                        />
                      )}
                    />
                    {errors.city && (
                      <Text style={styles.error}>Ce champ est requis</Text>
                    )}

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
                    {errors.description && (
                      <Text style={styles.error}>Ce champ est requis</Text>
                    )}

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
                    {errors.nbUsers && (
                      <Text style={styles.error}>Ce champ est requis</Text>
                    )}

                    <Controller
                      name="date"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <DateTimePicker
                          value={field.value || new Date()}
                          mode="date"
                          display="default"
                          onChange={(event, selectedDate) => {
                            if (selectedDate) {
                              field.onChange(selectedDate);
                              setDate(selectedDate)
                            }
                          }}
                        />
                      )}
                    />


                    {errors.date && (
                      <Text style={styles.error}>Ce champ est requis</Text>
                    )}

                    {/* Bouton de validation */}
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleSubmit(onSubmit)}
                    >
                      <Text style={styles.buttonText}>
                        Enregistrer l'évènement
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </>
            ) : (
              <View
                style={{
                  flex: 1,
                  alignContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Text>Connectez-vous afin de créer un évènement !</Text>
              </View>
            )}
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonWrapper: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
  },
  closeButton: {
    backgroundColor: "#eee",
    borderRadius: 20,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    textAlign: "center",
    marginVertical: 20,
  },
  formContainer: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
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
    width: "100%",
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
    height: 120,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    textAlignVertical: "top",
    paddingHorizontal: 10,
    marginVertical: 10,
    textAlign: "left",
  },
  notLoggedIn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

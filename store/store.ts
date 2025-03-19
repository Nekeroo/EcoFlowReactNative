import {create} from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthInput, login, RegisterInput, UpdateInput, updateUser } from "@/services/authentService";
import axios from "axios";
import { User } from "@/constants/models/user";

export interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (input: AuthInput) => Promise<User | false>;
  register: (input: RegisterInput) => Promise<User | false>;
  logout: () => void;
  updateUser: (input : UpdateInput) => Promise<User | null>; 
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isLoading: false,
        error: null,

        login: async (input: AuthInput) => {
          set({ isLoading: true, error: null });
          try {
            const user = await login(input);
            if (user != null) {
              set({ user, isLoading: false });
              return user;
            } else {
              set({ isLoading: false, error: "Échec de l'authentification" });
              return false;
            }
          } catch (error) {
            set({ isLoading: false, error: "Erreur lors de l'authentification" });
            return false;
          }
        },

        register: async (input: RegisterInput) => {
          set({ user: null, isLoading: true, error: null });
          try {
            const response = await axios.post<User>(
              "https://ecoflow.mathieugr.fr/auth/register",
              input
            );

            console.log(response.status)
            console.log(response.data)
            if (response.status === 202 && response.data) {
              set({ user: response.data, isLoading: false, error: null});
              return response.data;
            } else {
              set({ isLoading: false, error: "Échec de l'inscription" });
              return false;
            }
          } catch (error) {
            set({ isLoading: false, error: "Erreur lors de l'inscription" });
            return false;
          }
        },

        logout: () => set({ user: null, error: null }),

        updateUser: async (updateInput: UpdateInput) => {
          set({ isLoading: true, error: null });
          try {
            const updatedUser = await updateUser(updateInput);
            if (updatedUser) {
              // Mise à jour du state avec les nouvelles informations utilisateur
              set({ user: { ...get().user, ...updatedUser }, isLoading: false });
              return updatedUser;
            } else {
              set({ isLoading: false, error: "Échec de la mise à jour" });
              return null;
            }
          } catch (error) {
            set({ isLoading: false, error: "Erreur lors de la mise à jour" });
            return null;
          }
        },
      }),
      { 
        name: "userStore",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);

export default useUserStore;

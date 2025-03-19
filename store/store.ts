import {create} from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthInput, login, RegisterInput } from "@/services/authentService";
import axios from "axios";
import { User } from "@/constants/models/user";

export interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (input: AuthInput) => Promise<User | false>;
  register: (input: RegisterInput) => Promise<User | false>;
  logout: () => void;
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
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
      }),
      { 
        name: "userStore",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  )
);

export default useUserStore;

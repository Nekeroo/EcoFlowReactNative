import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { AuthInput, login } from "@/services/authentService";
import { UserState } from "./userState";

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
            const success = await login(input);

            if (success) {
              // Si l'authentification réussit, mettre à jour l'utilisateur
              // Ici vous pourriez également faire une autre requête pour obtenir les détails de l'utilisateur
              set({
                user: {
                  first: "Utilisateur",
                  email: input.email,
                  // Ajoutez d'autres propriétés de User selon votre modèle
                },
                isLoading: false,
              });
              return true;
            } else {
              set({ isLoading: false, error: "Échec de l'authentification" });
              return false;
            }
          } catch (error) {
            set({
              isLoading: false,
              error: "Erreur lors de l'authentification",
            });
            return false;
          }
        },
        logout: () => set({ user: null, error: null }),
      }),
      { name: "userStore" }
    )
  )
);
export default useUserStore;

import { create } from "zustand";
import { EventState } from "./state/eventState";
import { devtools } from "zustand/middleware";
import { getEvents, createEvent, deleteEvent } from "@/services/eventService";
import { EventInput } from "@/services/eventService";

const useEventStore = create<EventState>()(
  devtools((set, get) => ({
    events: [],
    isLoading: false,
    error: null,

    getEvent: async () => {
      set({ isLoading: true, error: null });
      try {
        const eventsFound = await getEvents();
        if (eventsFound !== null) {
          set({ events: eventsFound, isLoading: false });
          return eventsFound;
        } else {
          set({
            isLoading: false,
            error: "Erreur lors de la récupération des événements"
          });
          return null;
        }
      } catch (error) {
        set({
          isLoading: false,
          error: "Erreur lors de la récupération des événements"
        });
        return null;
      }
    },

    createEvent: async (input: EventInput) => {
      try {
        const success = await createEvent(input);
        if (success) {
          await get().getEvent();
          return true;
        } else {
          set({
            error: "Erreur lors de la création de l'événement"
          });
          return false;
        }
      } catch (error) {
        set({
          error: "Erreur lors de la création de l'événement"
        });
        return false;
      }
    },

    deleteEvent: async (idEvent: number, idUser: number) => {
      try {
        await deleteEvent(idEvent, idUser)
        await useEventStore.getState().getEvent();
      } catch (error) {
        set({
          error: "Erreur lors de la suppression d'event"
        });
      }
    }
  }))
);

export default useEventStore;

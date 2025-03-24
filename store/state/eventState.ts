import { EventInput } from "@/services/eventService";
import { Event } from "@/constants/models/event";

export interface EventState {
    events: Array<Event> | null;
    isLoading: boolean;
    error: string | null;
    getEvent: () => Promise<Array<Event> | null>;
    createEvent: (input: EventInput) => Promise<boolean>;
    deleteEvent: (idEvent: number, idUser: number) => Promise<void>;
}
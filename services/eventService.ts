import { Event } from "@/constants/models/event";
import axios from "axios";

export interface EventInput {
    name: string,
    address: string,
    city: string,
    nbUsers: number,
    description: string,
    date: string
    id_member: number,
}

export async function getEvents(): Promise<Array<Event> | null> {
    try {
        const response = await axios.get<Array<Event>>("https://ecoflow.mathieugr.fr/event/retrieve");

        if (response.status === 202) {
            return response.data;
        }

        return null;
    } catch (error) {
        console.error("Erreur lors de la récupération des événements :", error);
        return null;
    }
}

export async function createEvent(input: EventInput) : Promise<boolean> {
    try {
        const response = await axios.post<Event>("https://ecoflow.mathieugr.fr/event/create",input);

        if (response.status === 201 && response.data) {
            return true;
        }

        return false;
    } catch (error) {
        console.error("Erreur lors de la récupération des événements :", error);
        return false;
    }
};

export async function deleteEvent(idEvent: number, idUser: number) : Promise<void>{
    try {
        await axios.delete<void>("https://ecoflow.mathieugr.fr/event/delete/" + idUser + "/" + idEvent)
    } catch(error) {
        console.error("Erreur lors de la suppression de l'event",
            error
        );
    }
}
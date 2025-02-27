import { Event } from "@/constants/models/event";
import { useEffect, useState } from "react";

export function useEvent() {
    const [events, setEvents] = useState<Array<Event>>([])

    useEffect(() =>{
        setEvents([
            {
                id: 1,
                name: "Event 1",
                address: "35 rue Marthe Vedrenne",
                city: "Angoulême",
                description : "Description 1",
                nbUsers: 20,
            },
            {
                id: 2,
                name: "Event 2",
                city: "Bordeaux",
                address: "70 rue Saint Genes",
                nbUsers: 20,
            },
        ])
    }, []);

    return { events };
}
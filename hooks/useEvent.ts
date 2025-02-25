import { Event } from "@/constants/models/event";
import { useEffect, useState } from "react";

export function useEvent() {
    const [events, setEvents] = useState<Array<Event>>([])

    useEffect(() =>{
        setEvents([
            {
                id: 1,
                name: "Event 1",
                address: "13 rue Cater",
                description : "Description 1",
                nbUsers: 20,
            },
            {
                id: 2,
                name: "Event 2",
                address: "100 rue Vlovir",
                nbUsers: 20,
            },
        ])
    }, []);

    return { events };
}
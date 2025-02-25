import { Event } from "@/constants/models/event";

export function getEvents() : Array<Event> {
    return [
        {
            name: "Event 1",
            address: "13 rue Cater",
            nbUsers: 20,
        },
        {
            name: "Event 2",
            address: "100 rue Vlovir",
            nbUsers: 20,
        },
    ]
}
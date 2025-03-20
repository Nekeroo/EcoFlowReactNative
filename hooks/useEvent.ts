import { useState, useEffect } from 'react';
import { Event } from '@/constants/models/event';
import { getEvents } from '@/services/eventService';

export function useEvent() {
  const [events, setEvents] = useState<Array<Event>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEvents = async () => {
    setLoading(true);
    const data = await getEvents();
    if (data) {
      setEvents(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, loading };
}

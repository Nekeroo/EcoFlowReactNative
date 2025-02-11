import { useState, useEffect } from "react";
import { fetchOSMData, OSMNode } from "../services/osmService";

export function useOSMData(lat: number | undefined, lon: number | undefined) {
  const [markers, setMarkers] = useState<OSMNode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!lat || !lon) return;

    async function getMarkers() {
      setLoading(true);
      const data = await fetchOSMData(lat, lon);
      setMarkers(data);
      setLoading(false);
    }

    getMarkers();
  }, [lat, lon]);

  return { markers, loading };
}

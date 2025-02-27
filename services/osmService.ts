import axios from "axios";

export interface OSMNode {
  id: number;
  lat: number;
  lon: number;
  name?: string;
  tags: {
    amenity?: string;
    name?: string;
    recycling_type?: string;
  };
  adress?: string;
}

export interface OSMCoordinatesReturnByAddress {
  lat: number;
  lon: number;
}

const DEFAULT_AMENITIES = [
  "recycling", // Point de recyclage général
  "waste_basket", // Corbeille publique
  "waste_disposal", // Centre de collecte des déchets
];

const AMENITY_LABELS: Record<string, string> = {
  recycling: "Point de recyclage",
  waste_basket: "Poubelle publique",
  waste_disposal: "Centre de tri des déchets",
};

/**
 * Récupère les points d'intérêt depuis l'API Overpass.
 * @param lat Latitude de l'utilisateur.
 * @param lon Longitude de l'utilisateur.
 * @param radius Rayon en mètres (ex: 1000 = 1 km).
 */
export async function fetchOSMData(params: {
  lat: number;
  lon: number;
  amenities: string[];
  recyclingFilters: string[];
}): Promise<OSMNode[]> {
  try {
    console.log(params)
    const response = await axios.post<OSMNode[]>(
      "http://10.33.64.251:8080/map/markers",
      params
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données OSM:", error);
    return [];
  }
}

export async function defineMarkerAdress(
  marker: OSMNode,
  setMarkerAddresses: Function
) {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${marker.lat}&lon=${marker.lon}&format=json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    const address = data.address.road ?? "Adresse Inconnue";

    setMarkerAddresses((prev: any) => ({
      ...prev,
      [marker.id]: address,
    }));
  } catch (error) {
    console.error(error);
  }
}

export async function defineCoordinatesByAddress(params : {
  address: string,
  city: string
}): Promise<OSMCoordinatesReturnByAddress | null> {
  try {
    console.log(params)
    const response = await axios.post<{lat: number, lon: number}>(
      "http://10.33.64.251:8080/map/reverse",
      params
    )
    return response.data
  } catch (error) {
    console.error("Erreur lors de la récupération des coordonnées:", error);
    return null;
  }
}

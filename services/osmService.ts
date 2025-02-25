import axios from "axios";

export interface OSMNode {
  id: number;
  lat: number;
  lon: number;
  name?: string;
  tags: {
    amenity?: string;
    name?: string;
    recycling_type? : string;
  };
  adress? : string;
}

const DEFAULT_AMENITIES = [
  "recycling",         // Point de recyclage général
  "waste_basket",      // Corbeille publique
  "waste_disposal",    // Centre de collecte des déchets
];

const AMENITY_LABELS: Record<string, string> = {
  recycling: "Point de recyclage",
  waste_basket: "Poubelle publique",
  waste_disposal: "Centre de tri des déchets",
}

/**
 * Récupère les points d'intérêt depuis l'API Overpass.
 * @param lat Latitude de l'utilisateur.
 * @param lon Longitude de l'utilisateur.
 * @param radius Rayon en mètres (ex: 1000 = 1 km).
 */
export async function fetchOSMData(lat: number, lon: number, radius: number = 1000, amenities: string[] = DEFAULT_AMENITIES, recyclingFilters : string[] = []): Promise<OSMNode[]> {

  if (amenities.length === 0) {
    console.warn("Aucun filtre amenity sélectionné !");
    return [];
  }

    // Création de la requête pour les amenities
    const amenityQueries = amenities.map(
      (amenity) => `node["amenity"="${amenity}"](around:${radius},${lat},${lon});`
    );
  
    // Création de la requête pour le recyclage (ex: `node["recycling:glass_bottles"="yes"]`)
    const recyclingQueries = recyclingFilters.map(
      (recyclingType) => `node["recycling:${recyclingType}"="yes"](around:${radius},${lat},${lon});`
    );

    const overpassQuery = `
    [out:json];
    (
      ${[...amenityQueries, ...recyclingQueries].join("\n")}
    );
    out body;
  `;

  const uri = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`
  console.log(uri);
  try {
    const response = await axios.get(uri);

    
    return response.data.elements.map((node: OSMNode) => {
      const amenityType : string = node.tags.amenity ?? "";

      const recyclingData = Object.keys(node.tags)
        .filter((key) => key.startsWith("recycling:") && node.tags[key] === "yes")
        .map((key) => key.replace("recycling:", "")); // Supprime "recycling:" du nom

      return {
        id: node.id,
        lat: node.lat,
        lon: node.lon,
        name: node.tags.name || AMENITY_LABELS[amenityType] || "Lieu de recyclage",
        tags: {
          amenity: amenityType,
          name: node.tags.name || AMENITY_LABELS[amenityType],
          recycling_type: node.tags.recycling_type
        }
      };
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des données OSM:", error);
    return [];
  }
}

export async function defineMarkerAdress(marker: OSMNode, setMarkerAddresses: Function) {

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

import axios from "axios";

export interface OSMNode {
  id: number;
  lat: number;
  lon: number;
  name?: string;
  tags: {
    amenity?: string;
    name?: string;
  };
}

/**
 * Récupère les points d'intérêt depuis l'API Overpass.
 * @param lat Latitude de l'utilisateur.
 * @param lon Longitude de l'utilisateur.
 * @param radius Rayon en mètres (ex: 1000 = 1 km).
 */
export async function fetchOSMData(lat: number, lon: number, radius: number = 1000): Promise<OSMNode[]> {
  const overpassQuery = `
    [out:json];
    (
      node["amenity"="recycling"](around:${radius},${lat},${lon});
      node["amenity"="waste_basket"](around:${radius},${lat},${lon});
      node["amenity"="waste_disposal"](around:${radius},${lat},${lon});
    );
    out body;
  `;

  try {
    const response = await axios.get(
      `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`
    );

    return response.data.elements.map((node: OSMNode) => ({
      id: node.id,
      lat: node.lat,
      lon: node.lon,
      name: node.tags.name || "Nom inconnu",
      tags: {
        amenity: node.tags.amenity,
        name: node.tags.name
      }
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des données OSM:", error);
    return [];
  }
}

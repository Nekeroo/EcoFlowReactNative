import { Platform, Linking } from "react-native";

export function handleOpenMaps(lat: number, lon: number, label: string) {
    const encodedLabel = encodeURIComponent(label);
    const url =
      Platform.OS === "ios"
        ? `maps:0,0?q=${lat},${lon}(${encodedLabel})`
        : `geo:0,0?q=${lat},${lon}(${encodedLabel})`;

    Linking.openURL(url).catch((err) =>
      console.error("Erreur lors de l'ouverture de l'application de cartographie", err)
    );
  }
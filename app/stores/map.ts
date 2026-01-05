import type { MapPoint } from "~~/lib/types";

export const useMapStore = defineStore("useMapStore", () => {
  const mapPoints = ref<MapPoint[]>([]);

  async function init() {
    const { useMap } = await import("@indoorequal/vue-maplibre-gl");
    const { LngLatBounds } = await import("maplibre-gl");

    const map = useMap();
    effect(() => {
      const firtPoint = mapPoints.value[0];
      if (!firtPoint)
        return;
      const bounds = mapPoints.reduce((bounds, point) => {
        return bounds.extend([point.long, point.lat]);
      }, new LngLatBounds([
        firtPoint.long,
        firtPoint.lat,
      ], [
        firtPoint.long,
        firtPoint.lat,
      ]));

      map.map?.fitBounds(bounds, {
        padding: 60,
      });
    });
  }

  return {
    init,
    mapPoints,
  };
});

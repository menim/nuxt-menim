import type { MapPoint } from "~~/lib/types";
import type { LngLatBounds } from "maplibre-gl";

export const useMapStore = defineStore("useMapStore", () => {
  const mapPoints = ref<MapPoint[]>([]);
  const selectedPoint = ref<MapPoint | null>(null);
  const addedPoint = ref<MapPoint | null>(null);

  async function init() {
    const { useMap } = await import("@indoorequal/vue-maplibre-gl");
    const { LngLatBounds } = await import("maplibre-gl");

    const map = useMap();
    let bounds: LngLatBounds | null = null;
    effect(() => {
      const firtPoint = mapPoints.value[0];
      if (!firtPoint)
        return;
      bounds = mapPoints.value.reduce((bounds, point) => {
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

    watch(addedPoint, (newValue, oldValue) => {
      if (newValue && !oldValue) {
        map.map?.flyTo({
          center: [newValue.long, newValue.lat],
          zoom: 6,
          speed: 0.8,
        });
      }
    }, {
      immediate: true,
    });
  }

  return {
    init,
    mapPoints,
    selectedPoint,
    addedPoint,
  };
});

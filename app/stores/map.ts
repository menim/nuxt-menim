import type { MapPoint } from "~~/lib/types";
import type { LngLatBounds } from "maplibre-gl";

export const useMapStore = defineStore("useMapStore", () => {
  const mapPoints = ref<MapPoint[]>([]);
  const selectedPoint = ref<MapPoint | null>(null);
  const shouldFlyTo = ref(true);

  function selectPointWithoutFlyTo(point: MapPoint | null) {
    shouldFlyTo.value = false;
    selectedPoint.value = point;
  }

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

    effect(() => {
      if (selectedPoint.value && shouldFlyTo.value) {
        if (shouldFlyTo.value) {
          map.map?.flyTo({
            center: [selectedPoint.value.long, selectedPoint.value.lat],
            speed: 0.8,
          });
        }
        shouldFlyTo.value = true;
      }
      else if (bounds) {
        map.map?.fitBounds(bounds, {
          padding: 60,
        });
      }
    });
  }

  return {
    init,
    mapPoints,
    selectedPoint,
    selectPointWithoutFlyTo,
  };
});

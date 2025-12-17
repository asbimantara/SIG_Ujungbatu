import { useState, useEffect } from "react";
import { FeatureCollection, MultiPolygon, MultiLineString } from "geojson";

export function useGeoJsonData<T extends FeatureCollection>(layer: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch(`/api/data/load?layer=${layer}`);
        if (!res.ok) throw new Error("Failed to load data");
        const json = await res.json();
        setData(json as T);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [layer]);

  return { data, loading, error };
}


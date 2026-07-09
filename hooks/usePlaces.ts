import { useQuery } from "@tanstack/react-query";

import { fetchPlaces } from "@/features/places/api";
import { placeKeys } from "@/features/places/hooks";
import { type PlaceFilters } from "@/features/places/types";

export function usePlaces(filters: PlaceFilters) {
  const normalizedFilters: PlaceFilters = {
    ...filters,
    destination: filters.destination.toLowerCase(),
  };

  return useQuery({
    queryKey: placeKeys.list(normalizedFilters),
    queryFn: () => fetchPlaces(normalizedFilters),
    enabled: Boolean(normalizedFilters.destination && normalizedFilters.category),
    staleTime: 60_000,
  });
}

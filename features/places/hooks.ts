import { type PlaceFilters } from "./types";

const listKey = (filters: PlaceFilters) =>
  [
    filters.destination.toLowerCase(),
    filters.category ?? "",
    filters.q?.trim().toLowerCase() ?? "",
    filters.price ?? "",
  ] as const;

export const placeKeys = {
  all: ["places"] as const,
  lists: () => [...placeKeys.all, "list"] as const,
  list: (filters: PlaceFilters) => [...placeKeys.lists(), ...listKey(filters)],
  detail: (id: string) => [...placeKeys.all, "detail", id] as const,
};

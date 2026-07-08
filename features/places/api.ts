import { type Place, type PlaceFilters } from "@/features/places/types";
import { places } from "@/mock-data/place";

export const filterPlaces = (filters: PlaceFilters): Place[] => {
  const query = filters.q?.trim().toLowerCase();

  return places.filter((place) => {
    if (place.destination !== filters.destination) return false;
    if (filters.category && place.category !== filters.category) return false;
    if (filters.price && place.priceLevel !== filters.price) return false;
    if (!query) return true;

    return (
      place.name.toLowerCase().includes(query) ||
      place.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });
};

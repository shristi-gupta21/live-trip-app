import { type Place, type PlaceFilters } from "@/features/places/types";
import { places } from "@/mock-data/place";

export const delay = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export const filterPlaces = (filters: PlaceFilters): Place[] => {
  const query = filters.q?.trim().toLowerCase();
  const destination = filters.destination.toLowerCase();

  return places.filter((place) => {
    if (place.destination !== destination) return false;
    if (filters.category && place.category !== filters.category) return false;
    if (filters.price && place.priceLevel !== filters.price) return false;
    if (!query) return true;

    return (
      place.name.toLowerCase().includes(query) ||
      place.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });
};

export async function fetchPlaces(filters: PlaceFilters): Promise<Place[]> {
  await delay(40000);
  return filterPlaces(filters);
}

export async function fetchPlaceById(id: string): Promise<Place | undefined> {
  await delay(300);
  return places.find((place) => place.id === id);
}

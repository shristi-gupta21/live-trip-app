import { type Trip } from "./types";

export function getPlaceDayNumbers(trip: Trip, placeId: string): number[] {
  return trip.days
    .filter((day) => day.placeIds.includes(placeId))
    .map((day) => day.dayNumber);
}

export function isPlaceInTrip(
  trip: Trip | undefined,
  placeId: string,
): boolean {
  if (!trip) return false;

  return trip.days.some((day) => day.placeIds.includes(placeId));
}

export function isPlaceOnDay(
  trip: Trip | undefined,
  placeId: string,
  dayNumber: number,
): boolean {
  if (!trip) return false;

  const day = trip.days.find((item) => item.dayNumber === dayNumber);
  return day?.placeIds.includes(placeId) ?? false;
}

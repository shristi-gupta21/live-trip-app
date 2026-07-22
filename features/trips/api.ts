import { delay } from "@/lib/utils";
import { initialTrips } from "@/mock-data/trips";

import { type Trip } from "./types";

const tripsStore: Trip[] = structuredClone(initialTrips);

export async function fetchTrip(tripId: string): Promise<Trip | undefined> {
  await delay(300);
  return tripsStore.find((trip) => trip.id === tripId);
}

export interface AddPlaceToDayInput {
  tripId: string;
  dayNumber: number;
  placeId: string;
}

export async function addPlaceToDay({
  tripId,
  dayNumber,
  placeId,
}: AddPlaceToDayInput): Promise<Trip> {
  await delay(300);

  const tripIndex = tripsStore.findIndex((trip) => trip.id === tripId);
  if (tripIndex === -1) {
    throw new Error("Trip not found");
  }

  const trip = tripsStore[tripIndex];
  const dayIndex = trip.days.findIndex((day) => day.dayNumber === dayNumber);
  if (dayIndex === -1) {
    throw new Error("Day not found");
  }

  const day = trip.days[dayIndex];
  if (day.placeIds.includes(placeId)) {
    return structuredClone(trip);
  }

  const updatedTrip: Trip = {
    ...trip,
    days: trip.days.map((item, index) =>
      index === dayIndex
        ? { ...item, placeIds: [...item.placeIds, placeId] }
        : item,
    ),
  };

  tripsStore[tripIndex] = updatedTrip;
  return structuredClone(updatedTrip);
}

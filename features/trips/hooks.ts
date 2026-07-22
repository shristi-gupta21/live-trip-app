import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

import { DEFAULT_TRIP_ID } from "@/lib/constants";

import { addPlaceToDay, fetchTrip } from "./api";
import { type Trip } from "./types";
import { getPlaceDayNumbers, isPlaceInTrip, isPlaceOnDay } from "./utils";

export const tripKeys = {
  all: ["trips"] as const,
  detail: (tripId: string) => [...tripKeys.all, tripId] as const,
};

export function useTrip(
  tripId: string,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: tripKeys.detail(tripId),
    queryFn: () => fetchTrip(tripId),
    enabled: Boolean(tripId) && (options?.enabled ?? true),
    staleTime: 60_000,
  });
}

export function usePlaceInTrip(
  placeId: string,
  options?: { tripId?: string; enabled?: boolean },
) {
  const tripId = options?.tripId ?? DEFAULT_TRIP_ID;
  const { data: trip, isLoading, isError, refetch } = useTrip(tripId, {
    enabled: options?.enabled,
  });

  const dayNumbers = useMemo(
    () => (trip ? getPlaceDayNumbers(trip, placeId) : []),
    [trip, placeId],
  );

  return {
    trip,
    isInTrip: isPlaceInTrip(trip, placeId),
    dayNumbers,
    isOnDay: (dayNumber: number) => isPlaceOnDay(trip, placeId, dayNumber),
    isLoading,
    isError,
    refetch,
  };
}

export function useAddPlaceToDay() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addPlaceToDay,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: tripKeys.detail(variables.tripId),
      });

      const previousTrip = queryClient.getQueryData<Trip>(
        tripKeys.detail(variables.tripId),
      );

      if (previousTrip) {
        queryClient.setQueryData<Trip>(
          tripKeys.detail(variables.tripId),
          (current) => {
            if (!current) return current;

            return {
              ...current,
              days: current.days.map((day) =>
                day.dayNumber === variables.dayNumber &&
                !day.placeIds.includes(variables.placeId)
                  ? { ...day, placeIds: [...day.placeIds, variables.placeId] }
                  : day,
              ),
            };
          },
        );
      }

      return { previousTrip };
    },
    onError: (_error, variables, context) => {
      if (context?.previousTrip) {
        queryClient.setQueryData(
          tripKeys.detail(variables.tripId),
          context.previousTrip,
        );
      }
    },
    onSuccess: (trip) => {
      queryClient.setQueryData(tripKeys.detail(trip.id), trip);
    },
  });
}

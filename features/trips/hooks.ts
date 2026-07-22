import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { addPlaceToDay, fetchTrip } from "./api";
import { type Trip } from "./types";

export const tripKeys = {
  all: ["trips"] as const,
  detail: (tripId: string) => [...tripKeys.all, tripId] as const,
};

export function useTrip(tripId: string) {
  return useQuery({
    queryKey: tripKeys.detail(tripId),
    queryFn: () => fetchTrip(tripId),
    enabled: Boolean(tripId),
    staleTime: 60_000,
  });
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

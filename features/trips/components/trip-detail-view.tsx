"use client";

import { useEffect } from "react";

import ErrorState from "@/components/shared/error-state";
import LoadingState from "@/components/shared/loading-state";
import { useTrip } from "@/features/trips/hooks";
import { usePlaces } from "@/hooks/usePlaces";

const TripDetailView = ({ tripId }: { tripId: string }) => {
  const { data: trip, isLoading, isError, refetch } = useTrip(tripId);
  const {
    data: places,
    isLoading: isPlacesLoading,
    isError: isPlacesError,
  } = usePlaces({
    destination: trip?.destination ?? "",
  });

  useEffect(() => {
    if (trip) {
      console.log("trip", places);
      console.log("trip days", trip.days);
    }
  }, [trip]);

  if (isLoading || isPlacesLoading) {
    return <LoadingState message="Loading trip..." variant="skeleton" />;
  }

  if (isError || isPlacesError || !trip) {
    return (
      <ErrorState message="Could not load trip" onRetry={() => refetch()} />
    );
  }

  return (
    <div className="flex flex-col gap-4 pt-6">
      {trip.days.map((day) => {
        return (
          <div key={day.id}>
            <div>Day{day.dayNumber}</div>
          </div>
        );
      })}
    </div>
  );
};

export default TripDetailView;

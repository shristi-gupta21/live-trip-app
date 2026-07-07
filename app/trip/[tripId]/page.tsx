import React from "react";

import AppBreadcrumb from "@/components/shared/app-breadcrumb";
import TripCard from "@/features/trips/components/trip-card";
import { places } from "@/mock-data/place";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) => {
  const { tripId } = await params;

  return {
    title: `Trip ${tripId}`,
    description: `Details for trip ${tripId}`,
  };
};

const Trip = async ({ params }: { params: Promise<{ tripId: string }> }) => {
  const { tripId } = await params;
  // const location =
  // console.log(location);
  return (
    <div className="flex flex-col gap-10 mt-10">
      <AppBreadcrumb
        segments={[
          { label: "Discover", href: "/discover" },
          { label: "Trips", href: "/discover" },
          { label: tripId, className: "capitalize" },
        ]}
      />
      <div className="grid grid-cols-3 gap-10 mt-4 items-center">
        {places
          .filter((place) => place.category === tripId)
          .map((place) => (
            <TripCard key={place.id} place={place} />
          ))}
      </div>
    </div>
  );
};

export default Trip;

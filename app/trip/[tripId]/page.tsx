import React from "react";

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

  // const filteredPlaces = getPlacesByTripId(tripId);
  return (
    <div className="flex flex-col gap-10 mt-10">
      <div className="grid grid-cols-3 gap-10 mt-4 items-center"></div>
    </div>
  );
};

export default Trip;

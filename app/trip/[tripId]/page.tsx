import React from "react";

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
  return (
    <div>
      {places
        .filter((place) => place.category === tripId)
        .map((place) => (
          <div key={place.id}>
            {/* <Image src={place.imageUrl} height={300} width={300} alt="" /> */}
            <span>{place.name}</span>
          </div>
        ))}
    </div>
  );
};

export default Trip;

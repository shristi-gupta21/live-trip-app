import React from "react";

import TripDetailView from "@/features/trips/components/trip-detail-view";

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

const TripPage = async ({
  params,
}: {
  params: Promise<{ tripId: string }>;
}) => {
  const { tripId } = await params;

  return <TripDetailView tripId={tripId} />;
};

export default TripPage;

import Image from "next/image";
import React from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <div className="flex flex-wrap gap-10 mt-10 justify-center">
      {places
        .filter((place) => place.category === tripId)
        .map((place) => (
          <Card key={place.id} className="relative">
            <Image
              src={place.imageUrl}
              alt={place.name}
              height={200}
              width={350}
              className="h-[250px] w-[400px] rounded-lg object-cover"
            />
            <CardHeader>
              <CardTitle>{place.name}</CardTitle>
              <CardDescription className="flex justify-between gap-4">
                <span>Average visit time: {place.averageVisitTime} min</span>
                <span>Closing time: {place.closingTime}</span>
              </CardDescription>
              <div className="flex gap-2 flex-wrap mt-2">
                {place.tags.map((tag) => (
                  <Badge key={tag} className="capitalize">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>

            <CardFooter>
              <CardAction> View more </CardAction>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};

export default Trip;

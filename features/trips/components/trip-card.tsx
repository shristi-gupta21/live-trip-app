import { Bookmark } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Place } from "@/features/places/types";

const TripCard = ({ place }: { place: Place }) => {
  return (
    <Card key={place.id} className="relative overflow-hidden w-full">
      <Image
        src={place.imageUrl}
        alt={place.name}
        height={300}
        width={400}
        className="h-[250px] w-full rounded-t-xl object-cover"
      />
      <button
        type="button"
        className="absolute top-2 right-2 z-10 flex size-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm"
      >
        <Bookmark className="size-4" />
      </button>
      <CardHeader>
        <CardTitle>
          {place.name}, {place.city}
        </CardTitle>
        <CardDescription className="flex justify-between gap-4">
          <span>Average visit time: {place.averageVisitTime} min</span>
          <span>Closing time: {place.closingTime}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex gap-2 flex-wrap ">
          {place.tags.map((tag) => (
            <Badge key={tag} className="capitalize">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 items-start">
        <span className="capitalize">Price Level: {place.priceLevel}</span>
        <span className="capitalize flex gap-2">
          Rating: <span>{place.rating}</span>
        </span>
      </CardFooter>
    </Card>
  );
};

export default TripCard;

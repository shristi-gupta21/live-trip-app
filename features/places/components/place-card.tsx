import { Plus } from "lucide-react";
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
import { cn } from "@/lib/utils";

interface PlaceCardProps {
  place: Place;
  compact?: boolean;
  onClick?: () => void;
}

const PlaceCard = ({ place, compact = false, onClick }: PlaceCardProps) => {
  return (
    <Card
      size={compact ? "sm" : "default"}
      className={cn(
        "relative w-full overflow-hidden",
        onClick && "cursor-pointer transition-shadow hover:ring-primary",
      )}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <Image
        src={place.imageUrl}
        alt={place.name}
        height={compact ? 160 : 300}
        width={400}
        className={cn(
          "w-full rounded-t-xl object-cover",
          compact ? "h-40" : "h-[250px]",
        )}
      />
      <button
        type="button"
        className={cn(
          "absolute top-2 right-2 z-10 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm",
          compact ? "size-8" : "size-10",
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <Plus className={compact ? "size-3.5" : "size-4"} />
      </button>
      <CardHeader className={compact ? "gap-0.5" : undefined}>
        <CardTitle className={compact ? "text-sm" : undefined}>
          {place.name}
        </CardTitle>
        <CardDescription
          className={cn(
            "flex flex-wrap justify-between gap-2",
            compact && "text-xs",
          )}
        >
          <span>{place.averageVisitTime} min visit</span>
          <span>Closes {place.closingTime}</span>
        </CardDescription>
      </CardHeader>
      {!compact && (
        <>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {place.tags.map((tag) => (
                <Badge key={tag} className="capitalize">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-1">
            <span className="capitalize">Price: {place.priceLevel}</span>
            <span>Rating: {place.rating}</span>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default PlaceCard;

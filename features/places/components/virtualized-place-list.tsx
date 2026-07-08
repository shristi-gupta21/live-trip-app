"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

import { type Place } from "@/features/places/types";

import PlaceCard from "./place-card";

interface VirtualizedPlaceListProps {
  places: Place[];
  onPlaceClick?: (place: Place) => void;
}

const ROW_HEIGHT = 460;

const VirtualizedPlaceList = ({
  places,
  onPlaceClick,
}: VirtualizedPlaceListProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: places.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 4,
  });

  if (places.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        No places match your filters.
      </p>
    );
  }
  // console.log(virtualizer.getTotalSize());
  return (
    <div
      ref={parentRef}
      className="h-[calc(100vh-16rem)] overflow-auto rounded-xl ring-1 ring-foreground/10"
    >
      <div
        className="relative w-full"
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const place = places[virtualRow.index];
          return (
            <div
              key={place.id}
              className="absolute top-0 left-0 w-full px-1"
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <PlaceCard place={place} onClick={() => onPlaceClick?.(place)} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualizedPlaceList;

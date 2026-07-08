"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

import { type Place } from "@/features/places/types";

import PlaceCard from "./place-card";

interface VirtualizedPlaceListProps {
  places: Place[];
  onPlaceClick?: (place: Place) => void;
}

const ROW_HEIGHT = 440;
const ROW_GAP = 20; // matches gap-5 (1.25rem)
const COLUMNS = 3;

const VirtualizedPlaceList = ({
  places,
  onPlaceClick,
}: VirtualizedPlaceListProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const rowCount = Math.ceil(places.length / COLUMNS);

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ROW_HEIGHT,
    gap: ROW_GAP,
    overscan: 4,
  });

  if (places.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        No places match your filters.
      </p>
    );
  }

  return (
    <div
      ref={parentRef}
      className="h-[calc(100vh-16rem)] overflow-auto rounded-xl ring-1 ring-foreground/10"
    >
      <div
        className="relative w-full "
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        {virtualizer.getVirtualItems().map((virtualRow, index) => {
          const rowIndex = virtualRow.index;
          const rowPlaces = places.slice(
            rowIndex * COLUMNS,
            rowIndex * COLUMNS + COLUMNS,
          );
          return (
            <div
              key={index}
              className="absolute top-0 left-0 w-full px-1 grid grid-cols-3 gap-5"
              style={{
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {rowPlaces.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  onClick={() => onPlaceClick?.(place)}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualizedPlaceList;

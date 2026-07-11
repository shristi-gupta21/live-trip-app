"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { type Place } from "../types";

const PlaceDetailDrawer = ({
  place,
  open,
  onClose,
}: {
  place: Place;
  open: boolean;
  onClose: () => void;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close place details"
        className={cn(
          "absolute inset-0 bg-black/10 transition-opacity duration-300 supports-backdrop-filter:backdrop-blur-xs",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={place.name}
        className={cn(
          "absolute inset-y-0 right-0 flex h-svh w-full max-w-md flex-col overflow-x-hidden overflow-y-auto border-l bg-popover text-sm text-popover-foreground shadow-lg transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <Image
          src={place.imageUrl}
          alt={place.name}
          width={400}
          height={240}
          sizes="(max-width: 28rem) 100vw, 28rem"
          className="h-56 w-full max-w-full object-cover"
        />
        <div className="flex flex-col gap-0.5 p-4">
          <h2 className="text-base font-medium text-foreground">{place.name}</h2>
          <p className="flex flex-wrap justify-between gap-2 text-sm text-muted-foreground">
            <span>{place.averageVisitTime} min visit</span>
            <span>Closes {place.closingTime}</span>
          </p>
        </div>
        <div className="flex min-w-0 flex-col gap-4 px-4 pb-6">
          <div className="flex flex-wrap gap-2">
            {place.tags.map((tag) => (
              <Badge key={tag} className="capitalize">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <span className="capitalize">Price: {place.priceLevel}</span>
            <span>Rating: {place.rating}</span>
          </div>
        </div>
      </aside>
    </div>,
    document.body,
  );
};

export default PlaceDetailDrawer;

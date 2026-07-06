import { type Metadata } from "next";
import Link from "next/link";
import React from "react";

import { places } from "@/mock-data/place";

export const metadata: Metadata = {
  title: "Discover Trips",
  description: "Explore amazing destinations",
};

const categories = [...new Set(places.map((place) => place.category))];

const DiscoverPage = () => {
  return (
    <div>
      <div className="py-3">
        Planning for : <span className="font-semibold">Goa</span>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {categories.map((category) => {
          const count = places.filter((p) => p.category === category).length;
          return (
            <Link
              key={category}
              href={`/trip/${category}`}
              className="flex flex-col gap-2 rounded-xl border bg-card p-4 text-left transition-colors hover:border-primary cursor-pointer"
            >
              {/* <Icon className="size-5 text-muted-foreground" /> */}
              <span className="font-medium">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
              <span className="text-sm text-muted-foreground">
                {count} places
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DiscoverPage;

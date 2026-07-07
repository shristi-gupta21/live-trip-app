import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { categories } from "@/mock-data/categories";
import { places } from "@/mock-data/place";

export const metadata: Metadata = {
  title: "Discover Trips",
  description: "Explore amazing destinations",
};

const placeCountByCategory = categories.map((category) => ({
  ...category,
  count: places.filter((place) => place.category === category.id).length,
}));

const DiscoverPage = () => {
  return (
    <div className="mx-auto flex max-w-6xl w-full flex-col gap-6 py-6">
      <div>
        <p className="text-sm text-muted-foreground">Planning for</p>
        <h1 className="text-2xl font-semibold">Goa</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Pick a category to explore places
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {placeCountByCategory.map((category) => (
          <Link
            key={category.id}
            href={`/trip/${category.id}`}
            className="group block overflow-hidden rounded-xl ring-1 ring-foreground/10 transition-all hover:ring-primary"
          >
            <div className="relative aspect-4/3">
              <Image
                src={category.imageUrl}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent" />
              <div className="absolute right-0 bottom-0 left-0 p-4 text-white">
                <h2 className="font-semibold">{category.name}</h2>
                <p className="text-sm text-white/80">{category.count} places</p>
                <p className="mt-1 text-xs text-white/70">
                  {category.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DiscoverPage;

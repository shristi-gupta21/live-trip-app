"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { filterPlaces } from "@/features/places/api";
import VirtualizedPlaceList from "@/features/places/components/virtualized-place-list";
import { DEFAULT_DESTINATION, destinationLabels } from "@/lib/constants";
import { categories, type CategoryId } from "@/mock-data/categories";
import { places } from "@/mock-data/place";

import CategoryPicker from "./category-picker";

const isCategoryId = (value: string | null): value is CategoryId =>
  categories.some((category) => category.id === value);

const DiscoverView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination") ?? DEFAULT_DESTINATION;
  const categoryParam = searchParams.get("category");
  const category = isCategoryId(categoryParam) ? categoryParam : undefined;
  const query = searchParams.get("q") ?? undefined;

  const destinationLabel =
    destinationLabels[destination] ?? destination.toUpperCase();

  const placeCountByCategory = useMemo(() => {
    return categories.reduce(
      (counts, item) => {
        counts[item.id] = places.filter(
          (place) =>
            place.destination === destination && place.category === item.id,
        ).length;
        return counts;
      },
      {} as Record<CategoryId, number>,
    );
  }, [destination]);

  const filteredPlaces = useMemo(
    () => (category ? filterPlaces({ destination, category, q: query }) : []),
    [destination, category, query],
  );

  const updateParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    if (!params.has("destination")) {
      params.set("destination", DEFAULT_DESTINATION);
    }

    router.push(`/discover?${params.toString()}`, { scroll: false });
  };

  const handleCategorySelect = (categoryId: CategoryId) => {
    updateParams({ category: categoryId });
  };

  const handleClearCategory = () => {
    updateParams({ category: null, q: null });
  };

  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Planning for</p>
          <h1 className="text-2xl font-semibold">{destinationLabel}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {category
              ? `Showing ${filteredPlaces.length} places`
              : "Pick a category to explore places"}
          </p>
        </div>
        <Link
          href="/trip/goa-weekend"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/80"
        >
          My Trip
        </Link>
      </div>

      {category ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CategoryPicker
              destination={destination}
              activeCategory={category}
              placeCountByCategory={placeCountByCategory}
              onSelect={handleCategorySelect}
              variant="chips"
            />
            <button
              type="button"
              onClick={handleClearCategory}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Clear category
            </button>
          </div>
          <VirtualizedPlaceList places={filteredPlaces} />
        </div>
      ) : (
        <CategoryPicker
          destination={destination}
          placeCountByCategory={placeCountByCategory}
          onSelect={handleCategorySelect}
          variant="grid"
        />
      )}
    </div>
  );
};

export default DiscoverView;

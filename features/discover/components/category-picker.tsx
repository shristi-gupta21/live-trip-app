"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { categories, type CategoryId } from "@/mock-data/categories";

interface CategoryPickerProps {
  destination: string;
  activeCategory?: CategoryId;
  placeCountByCategory: Record<CategoryId, number>;
  onSelect: (categoryId: CategoryId) => void;
  variant?: "grid" | "chips";
}

const CategoryPicker = ({
  activeCategory,
  placeCountByCategory,
  onSelect,
  variant = "grid",
}: CategoryPickerProps) => {
  if (variant === "chips") {
    return (
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(category.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium ring-1 transition-colors",
              activeCategory === category.id
                ? "bg-primary text-primary-foreground ring-primary"
                : "bg-background ring-foreground/10 hover:ring-primary/50",
            )}
          >
            {category.name}
            <span className="ml-1.5 text-xs opacity-70">
              ({placeCountByCategory[category.id]})
            </span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onSelect(category.id)}
          className="group block overflow-hidden rounded-xl text-left ring-1 ring-foreground/10 transition-all hover:ring-primary"
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
              <p className="text-sm text-white/80">
                {placeCountByCategory[category.id]} places
              </p>
              <p className="mt-1 text-xs text-white/70">
                {category.description}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default CategoryPicker;

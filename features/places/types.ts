import { type CategoryId } from "@/mock-data/categories";

export type PriceLevel = "low" | "medium" | "high";

export interface Place {
  id: string;
  name: string;
  destination: string;
  category: CategoryId;
  rating: number;
  imageUrl: string;
  priceLevel: PriceLevel;
  closingTime: string;
  averageVisitTime: number;
  tags: string[];
}

export interface PlaceFilters {
  destination: string;
  category?: CategoryId;
  q?: string;
  price?: PriceLevel;
}

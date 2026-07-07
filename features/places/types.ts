export interface Place {
  id: string;
  name: string;
  city: string;
  category: string;
  rating: number;
  imageUrl: string;
  priceLevel: "low" | "medium" | "high";
  closingTime: string;
  averageVisitTime: number;
  tags: string[];
}

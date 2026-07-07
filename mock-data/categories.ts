export const categories = [
  {
    id: "sightseeing",
    name: "Sightseeing",
    imageUrl: "https://picsum.photos/seed/category-food/600/400",
    description: "Forts, beaches, and heritage spots",
  },
  {
    id: "food",
    name: "Food",
    imageUrl:
      "https://fastly.picsum.photos/id/292/3852/2556.jpg?hmac=cPYEh0I48Xpek2DPFLxTBhlZnKVhQCJsbprR-Awl9lo",
    description: "Goan seafood, cafes, and local eats",
  },
  {
    id: "shopping",
    name: "Shopping",
    imageUrl: "https://picsum.photos/seed/category-shopping/600/400",
    description: "Markets, malls, and handicrafts",
  },
  {
    id: "nightlife",
    name: "Nightlife",
    imageUrl: "https://picsum.photos/seed/category-nightlife/600/400",
    description: "Clubs, beach shacks, and live music",
  },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

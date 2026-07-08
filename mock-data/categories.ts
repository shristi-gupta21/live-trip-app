export const categories = [
  {
    id: "food",
    name: "Food",
    imageUrl:
      "https://fastly.picsum.photos/id/292/3852/2556.jpg?hmac=cPYEh0I48Xpek2DPFLxTBhlZnKVhQCJsbprR-Awl9lo",
    description: "Goan seafood, cafes, and local eats",
  },
  {
    id: "nature",
    name: "Nature",
    imageUrl: "https://picsum.photos/seed/category-nature/600/400",
    description: "Forts, beaches, waterfalls, and heritage spots",
  },
  {
    id: "nightlife",
    name: "Nightlife",
    imageUrl: "https://picsum.photos/seed/category-nightlife/600/400",
    description: "Clubs, beach shacks, and live music",
  },
  {
    id: "summer-picks",
    name: "Summer Picks",
    imageUrl: "https://picsum.photos/seed/category-summer/600/400",
    description: "Markets, seasonal highlights, and hidden gems",
  },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

import { type Trip } from "@/features/trips/types";

export const initialTrips: Trip[] = [
  {
    id: "goa-weekend",
    name: "Goa Weekend",
    destination: "goa",
    startDate: "2026-07-10",
    endDate: "2026-07-12",
    days: [
      {
        id: "day_1",
        dayNumber: 1,
        date: "2026-07-10",
        placeIds: ["place_1", "place_2"],
      },
      {
        id: "day_2",
        dayNumber: 2,
        date: "2026-07-11",
        placeIds: ["place_16"],
      },
      {
        id: "day_3",
        dayNumber: 3,
        date: "2026-07-12",
        placeIds: [],
      },
    ],
  },
];

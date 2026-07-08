export interface TripDay {
  id: string;
  dayNumber: number;
  date: string;
  placeIds: string[];
}

export interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  days: TripDay[];
}

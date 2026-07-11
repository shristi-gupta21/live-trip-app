import React from "react";

import { type Place } from "../types";

const PlaceDetailDrawer = ({ place }: { place: Place }) => {
  return <div className="h-full overflow-y-auto p-4">{place.destination}</div>;
};

export default PlaceDetailDrawer;

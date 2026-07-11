import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { type Place } from "../types";

const PlaceDetailDrawer = ({ place }: { place: Place }) => {
  return (
    <DrawerContent className="h-full max-h-svh overflow-x-hidden overflow-y-auto data-[vaul-drawer-direction=right]:w-full data-[vaul-drawer-direction=right]:max-w-md">
      <Image
        src={place.imageUrl}
        alt={place.name}
        width={400}
        height={240}
        sizes="(max-width: 28rem) 100vw, 28rem"
        className="h-56 w-full max-w-full object-cover"
      />
      <DrawerHeader>
        <DrawerTitle>{place.name}</DrawerTitle>
        <DrawerDescription className="flex flex-wrap justify-between gap-2">
          <span>{place.averageVisitTime} min visit</span>
          <span>Closes {place.closingTime}</span>
        </DrawerDescription>
      </DrawerHeader>
      <div className="flex min-w-0 flex-col gap-4 px-4 pb-6">
        <div className="flex flex-wrap gap-2">
          {place.tags.map((tag) => (
            <Badge key={tag} className="capitalize">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex flex-col gap-1 text-sm">
          <span className="capitalize">Price: {place.priceLevel}</span>
          <span>Rating: {place.rating}</span>
        </div>
      </div>
    </DrawerContent>
  );
};

export default PlaceDetailDrawer;

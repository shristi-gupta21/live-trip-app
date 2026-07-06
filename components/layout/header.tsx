import { Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Input } from "../ui/input";

const header = () => {
  return (
    <div className="flex justify-between">
      <Link href={"/discover"}>
        <Image src="/livetrip_icon.svg" alt="LiveTrip" width={24} height={24} />
      </Link>{" "}
      <div className="w-1/3">
        <Input placeholder="Search place" />
      </div>
      <Link href={"/bookmark-trips"}>
        <Bookmark />
      </Link>
    </div>
  );
};

export default header;

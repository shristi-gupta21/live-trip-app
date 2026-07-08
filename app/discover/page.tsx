import { type Metadata } from "next";
import { Suspense } from "react";

import DiscoverView from "@/features/discover/components/discover-view";

export const metadata: Metadata = {
  title: "Discover",
  description: "Explore places for your trip",
};

const DiscoverPage = () => {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center text-sm text-muted-foreground">
          Loading discover...
        </div>
      }
    >
      <DiscoverView />
    </Suspense>
  );
};

export default DiscoverPage;

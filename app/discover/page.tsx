import { type Metadata } from "next";
import { Suspense } from "react";

import LoadingState from "@/components/shared/loading-state";
import DiscoverView from "@/features/discover/components/discover-view";

export const metadata: Metadata = {
  title: "Discover",
  description: "Explore places for your trip",
};

const DiscoverPage = () => {
  return (
    <Suspense
      fallback={<LoadingState message="Loading discover" variant="spinner" />}
    >
      <DiscoverView />
    </Suspense>
  );
};

export default DiscoverPage;

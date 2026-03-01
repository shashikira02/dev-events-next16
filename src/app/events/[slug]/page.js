import Eventdetails from "@/components/Eventdetails";
import { Suspense } from "react";

const EventDetailsPage = async ({ params }) => {
  const slug = params.then((p) => p.slug);
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Eventdetails params={slug} />
      </Suspense>
    </main>
  );
};

export default EventDetailsPage;

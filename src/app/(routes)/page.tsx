// import { unstable_noStore as noStore } from "next/cache";
import { Suspense } from "react";
import StatusGroup from "./_components/StatusGroup";
import Footer from "./_components/Footer";
import Actions from "./_components/Actions";
import PullToRefresh from "./_components/PullToRefresh";
import { queryEndpoints } from "@/service/query";

// revalidate the data at most half hour
export const revalidate = 1800;

export default async function Index() {
  // noStore();
  const endpoints = await queryEndpoints();
  return (
    <main className="font-mono relative min-h-screen min-w-full flex flex-col justify-between items-center">
      <Suspense
        fallback={<span className="loading loading-infinity loading-xs"></span>}
      >
        <PullToRefresh />
      </Suspense>
      <div className="min-h-full min-w-full flex flex-col items-center space-y-4 md:py-12">
        <StatusGroup name="Site Status" endpoints={endpoints || []} />
      </div>
      <video
        className="fixed right-0 bottom-0 min-w-full min-h-full -z-1 object-cover hidden md:block"
        autoPlay
        muted
        loop
      >
        <source src="/bg.webm" type="video/webm" />
        <track
          src="/bg.webm.vtt"
          kind="captions"
          srcLang="en"
          label="english_captions"
        ></track>
      </video>
      <Actions />
      {/* https://nextjs.org/docs/messages/deopted-into-client-rendering */}
      <Suspense
        fallback={<span className="loading loading-infinity loading-xs"></span>}
      >
        {/* client side component */}
        <Actions />
      </Suspense>
      <Footer />
    </main>
  );
}

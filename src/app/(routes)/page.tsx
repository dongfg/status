import { unstable_noStore as noStore } from "next/cache";
import StatusGroup from "./_components/StatusGroup";
import Footer from "./_components/Footer";
import Actions from "./_components/Actions";
import { queryEndpoints } from "@/service/query";

// revalidate the data at most every hour
// export const revalidate = 3600;

export default async function Index() {
  noStore();
  const endpoints = await queryEndpoints();
  return (
    <main className="font-mono relative bg-[url('/bg.gif')] bg-fixed bg-contain min-h-screen min-w-full flex flex-col justify-between items-center">
      <div className="min-h-full min-w-full flex flex-col items-center space-y-4 py-4 md:py-12">
        <StatusGroup name="Site Status" endpoints={endpoints || []} />
      </div>
      <Actions />
      <Footer />
    </main>
  );
}

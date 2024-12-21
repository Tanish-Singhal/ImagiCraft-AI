import { Skeleton } from "@/components/ui/skeleton";
import Header from "../Header";

export default function Loading() {
  return (
    <div>
      <Header />

      <div className="min-h-[calc(100dvh-4rem)]">
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />

        <div className="relative">
          <div className="text-center pt-6 pb-8 space-y-3">
            <Skeleton className="h-12 w-[300px] mx-auto" />
          </div>

          <div className="max-w-7xl mx-auto px-4 mt-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="p-4 space-y-6">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-32 w-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-28" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-6 w-20" />
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} className="aspect-square rounded-md" />
                    ))}
                  </div>
                </div>

                <Skeleton className="h-[72px] w-full rounded-md" />

                <Skeleton className="h-10 w-full" />
              </div>

              <div className="md:sticky md:top-4">
                <div className="rounded-lg overflow-hidden border shadow-sm">
                  <div className="p-3 border-b">
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <Skeleton className="aspect-square" />
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl flex justify-center px-4">
            <Skeleton className="h-10 w-48" />
          </div>
        </div>
      </div>
    </div>
  );
}

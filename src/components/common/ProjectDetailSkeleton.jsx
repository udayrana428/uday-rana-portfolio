import { motion } from "framer-motion";

export default function ProjectDetailsSkeleton() {
  return (
    <main className="container max-w-6xl mx-auto px-4 py-36 animate-pulse">
      <div className="mb-6 w-24 h-6 bg-text-secondary rounded"></div>

      <article className="grid md:grid-cols-2 gap-8">
        {/* Left Skeleton (Image) */}
        <div className="w-full h-80 bg-text-secondary rounded-lg"></div>

        {/* Right Skeleton (Title + Buttons + Text) */}
        <div className="space-y-4">
          <div className="h-8 w-2/3 bg-text-secondary rounded"></div>

          <div className="flex gap-4">
            <div className="h-10 w-28 bg-text-secondary rounded-full"></div>
            <div className="h-10 w-28 bg-text-secondary rounded-full"></div>
          </div>

          <div className="space-y-2">
            <div className="h-4 w-full bg-text-secondary rounded"></div>
            <div className="h-4 w-5/6 bg-text-secondary rounded"></div>
            <div className="h-4 w-2/3 bg-text-secondary rounded"></div>
          </div>

          <div className="flex gap-2 flex-wrap mt-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-6 w-20 bg-text-secondary rounded-full"
              ></div>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}

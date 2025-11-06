import { Outlet } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import InitialLoading from "../components/common/InitialLoading";

export default function RootLayout() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isInitialLoading) return <InitialLoading />;

  return (
    <div className="min-h-screen flex flex-col">
      <Suspense fallback={<InitialLoading />}>
        <Outlet />
      </Suspense>
    </div>
  );
}

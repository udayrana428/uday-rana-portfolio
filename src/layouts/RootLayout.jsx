import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import InitialLoading from "../components/common/InitialLoading";

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[_#02071E] text-white">
      <Suspense fallback={<InitialLoading />}>
        <Outlet />
      </Suspense>
    </div>
  );
}

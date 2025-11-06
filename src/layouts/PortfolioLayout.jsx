import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import RouteLoading from "../components/common/RouteLoading";
import Cursor from "../components/common/Cursor";
import ScrollToTopButton from "../components/common/ScrollToTopButton";

export default function PortfolioLayout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Cursor />
      <Navbar />

      <main className="flex-grow">
        <Suspense fallback={<RouteLoading />}>
          <Outlet />
        </Suspense>
      </main>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
}

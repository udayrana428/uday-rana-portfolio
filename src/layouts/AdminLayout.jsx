import { Outlet, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { useAuth } from "../context/AuthContext";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";
import RouteLoading from "../components/common/RouteLoading";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col h-screen">
        <AdminHeader />
        <main className="flex-1 p-6  overflow-y-auto">
          <Suspense fallback={<RouteLoading />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

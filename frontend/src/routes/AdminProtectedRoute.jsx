import { useAuth } from "@/context/AuthContext";
import useApi from "@/hooks/useApi.js";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const { get } = useApi();
  const { isLoggedIn, role, setIsLoggedIn, setRole } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await get(
          `${import.meta.env.VITE_SERVER_URL}/api/auth/check`
        );
        console.log("Admin check response:", res);
        setIsLoggedIn(res.loggedIn);
        setRole(res.userRole || undefined);
      } catch {
        setIsLoggedIn(false);
        setRole(undefined);
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, [setIsLoggedIn, setRole]);

  if (loading) return <div className="p-4">Checking admin access...</div>;
  if (!loading && !isLoggedIn) return <Navigate to="/login" replace />;
  return isLoggedIn && role === "admin" && !loading ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default AdminProtectedRoute;

import { useAuth } from "@/context/AuthContext";
import useApi from "@/hooks/useApi.js";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PersonnelProtectedRoute = () => {
  const { get } = useApi();
  const { isLoggedIn, role, setIsLoggedIn, setRole } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPersonnel = async () => {
      try {
        const res = await get(
          `${import.meta.env.VITE_SERVER_URL}/api/auth/check`
        );
        setIsLoggedIn(res.loggedIn);
        setRole(res.userRole || undefined);
      } catch {
        setIsLoggedIn(false);
        setRole(undefined);
      } finally {
        setLoading(false);
      }
    };
    checkPersonnel();
  }, [setIsLoggedIn, setRole]);

  if (loading) return <div className="p-4">Checking personnel access...</div>;
  if (!loading && !isLoggedIn) return <Navigate to="/auth" replace />;
  return isLoggedIn && role === "personnel" && !loading ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PersonnelProtectedRoute;

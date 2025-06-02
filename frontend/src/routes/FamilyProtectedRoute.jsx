import { useAuth } from "@/context/AuthContext";
import useApi from "@/hooks/useApi.js";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const FamilyProtectedRoute = () => {
  const { get } = useApi();
  const { isLoggedIn, role, setIsLoggedIn, setRole } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFamily = async () => {
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
    checkFamily();
  }, [setIsLoggedIn, setRole]);

  if (loading) return <div className="p-4">Checking family access...</div>;
  if (!loading && !isLoggedIn) return <Navigate to="/auth" replace />;
  return isLoggedIn && role === "family" && !loading ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default FamilyProtectedRoute;

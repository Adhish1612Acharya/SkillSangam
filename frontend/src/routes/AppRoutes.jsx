import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/RoleBasedLayout";
import Login from "../pages/auth/Login";
import RegisterSoldier from "../pages/auth/RegisterSoldier";
import RegisterFamily from "../pages/auth/RegisterFamily";
import RegisterGovt from "../pages/auth/RegisterGovt";
import SoldierDashboard from "../pages/dashboard/SoldierDashboard";
import FamilyDashboard from "../pages/dashboard/FamilyDashboard";
import GovtDashboard from "../pages/dashboard/GovtDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";
import SchemeList from "../pages/schemes/SchemeList";
import SchemeApply from "../pages/schemes/SchemeApply";
import ApplicationStatus from "../pages/schemes/ApplicationStatus";
import FileGrievance from "../pages/grievance/FileGrievance";
import TrackGrievance from "../pages/grievance/TrackGrievance";
import Marketplace from "../pages/marketplace/Marketplace";
import PostItem from "../pages/marketplace/PostItem";
import ItemChat from "../pages/marketplace/ItemChat";
import SOSPage from "../pages/emergency/SOSPage";
import Forum from "../pages/community/Forum";
import SuccessStories from "../pages/community/SuccessStories";
import Events from "../pages/community/Events";
import Chatbot from "../pages/ai/Chatbot";
import AIBenefitRecommender from "../pages/ai/AIBenefitRecommender";
import NotFound from "../pages/NotFound";
import AdminProtectedRoute from "./AdminProtectedRoute";
import OfficerProtectedRoute from "./OfficerProtectedRoute";
import FamilyProtectedRoute from "./FamilyProtectedRoute";
import PersonnelProtectedRoute from "./PersonnelProtectedRoute";

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/register/soldier"
        element={!user ? <RegisterSoldier /> : <Navigate to="/" />}
      />
      <Route
        path="/register/family"
        element={!user ? <RegisterFamily /> : <Navigate to="/" />}
      />
      <Route
        path="/register/govt"
        element={!user ? <RegisterGovt /> : <Navigate to="/" />}
      />

      {/* Protected Routes */}
      <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />}>
        {/* Common Routes */}
        <Route path="schemes" element={<SchemeList />} />

        {/* Role-Specific Protected Routes */}
        <Route element={<PersonnelProtectedRoute />}>
          <Route index element={<SoldierDashboard />} />
        </Route>
        <Route element={<FamilyProtectedRoute />}>
          <Route path="/family-dashboard" element={<FamilyDashboard />} />
          <Route path="/schemes/apply/:id" element={<SchemeApply />} />
          <Route path="/applications/:id" element={<ApplicationStatus />} />
          <Route path="/grievance/file" element={<FileGrievance />} />
          <Route path="/grievance/track/:id" element={<TrackGrievance />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/post" element={<PostItem />} />
          <Route path="/marketplace/chat/:id" element={<ItemChat />} />
          <Route path="/emergency" element={<SOSPage />} />
          <Route path="/community/forum" element={<Forum />} />
          <Route path="/community/stories" element={<SuccessStories />} />
          <Route path="/community/events" element={<Events />} />
          <Route path="/ai/chatbot" element={<Chatbot />} />
          <Route path="/ai/recommender" element={<AIBenefitRecommender />} />
        </Route>
        <Route element={<OfficerProtectedRoute />}>
          <Route path="/govt-dashboard" element={<GovtDashboard />} />
        </Route>
        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

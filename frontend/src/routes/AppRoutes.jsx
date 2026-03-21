// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import DashboardRoutes from "./DashboardRoutes";
// import Home from "../pages/Home";
// import Login from "../components/Login";
// import Register from "../pages/Register";

// const AppRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       {/* Dashboard nested routes */}
//       <Route path="/dashboard/*" element={<DashboardRoutes />} />
//     </Routes>
//   );
// };

// export default AppRoutes;

import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Login from "../components/Login";
import Register from "../pages/Register.jsx";
import Dashboard from "../pages/Dashboard/index.jsx";
import Overview from "../pages/Dashboard/Overview.jsx";
import Orders from "../pages/Dashboard/Orders.jsx";
import Wishlist from "../pages/Dashboard/Wishlist.jsx";
import Addresses from "../pages/Dashboard/Addresses.jsx";
import Coins from "../pages/Dashboard/Coins.jsx";
import Profile from "../pages/Dashboard/Profile.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

// Admin pages
import AdminLogin from "../pages/Admin/AdminLogin.jsx";
import AdminDashboard from "../pages/Admin/AdminDashboard.jsx";
import UserTeam from "../pages/Admin/UserTeam.jsx";
import UserWallet from "../pages/Admin/UserWallet.jsx";

// Admin protected wrapper
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("admin_token");
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* User Dashboard — protected */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
        <Route index element={<Overview />} />
        <Route path="orders" element={<Orders />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="addresses" element={<Addresses />} />
        <Route path="coins" element={<Coins />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="/admin/users/:id/team" element={<AdminRoute><UserTeam /></AdminRoute>} />
      <Route path="/admin/users/:id/wallet" element={<AdminRoute><UserWallet /></AdminRoute>} />
    </Routes>
  );
};

export default AppRoutes;
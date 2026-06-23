import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Medicines from "./pages/medicine/Medicines";
import Alerts from "./pages/alerts/Alerts";
import Sales from "./pages/sales/Sales";
import AIInsights from "./pages/ai/AIInsights";
import AdminRoute from "./routes/AdminRoute";

import ProtectedRoute from "./routes/ProtectedRoute";
import Users from "./pages/users/Users";
import SalesReport from "./pages/sales/SalesReport";
import RevenueReport from "./pages/sales/RevenueReport";

import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ResetPassword from "./pages/auth/ResetPassword";

import Register from "./pages/auth/Register";
import PendingUsers from "./pages/admin/PendingUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/medicines"
          element={
            <ProtectedRoute>
              <Medicines />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/medicines/low-stock"
          element={<Medicines />}
        />

        <Route
          path="/medicines/expiry"
          element={<Medicines />}
        />

        <Route
          path="/alerts"
          element={
            <ProtectedRoute>
              <Alerts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sales"
          element={
            <ProtectedRoute>
              <Sales />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-insights"
          element={
            <ProtectedRoute>
              <AIInsights />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          }
        />

        <Route
          path="/sales-report"
          element={<SalesReport />}
        />

        <Route
          path="/revenue-report"
          element={<RevenueReport />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/verify-otp"
          element={<VerifyOtp />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/admin/pending-users"
          element={<PendingUsers />}
        />

      </Routes>


    </BrowserRouter>
  );
}

export default App;
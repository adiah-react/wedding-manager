import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import Invitation from "./pages/Invitation";

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
        <Router>
          <Routes>
            <Route path="/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/invitation/:inviteCode" element={<Invitation />} />
            <Route path="/" element={<AdminLogin />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;

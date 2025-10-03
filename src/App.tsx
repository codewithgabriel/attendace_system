import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import DashboardLayout from "./components/DashboardLayout.tsx";

import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Lectures from "./pages/Lectures.tsx";
import LectureDetail from "./pages/LectureDetail.tsx";
import Attendance from "./pages/Attendance.tsx";

import CreateLecture from "./pages/CreateLecture.tsx";
import StudentReport from "./pages/StudentReport.tsx";
import EditLecture from "./pages/EditLecture.tsx";

import Students from "./pages/Students.tsx";
import CreateStudent from "./pages/CreateStudent.tsx";

// Component to handle default route redirection
const DefaultRoute = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Default route */}
          <Route path="/" element={<DefaultRoute />} />

          {/* Protected Routes with Dashboard Layout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/lectures"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Lectures />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/lectures/create"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CreateLecture />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/lectures/:id"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <LectureDetail />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/lectures/:id/edit"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <EditLecture />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance/:id"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Attendance />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/students/:id/report"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <StudentReport />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/students"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Students />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/students/create"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CreateStudent />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

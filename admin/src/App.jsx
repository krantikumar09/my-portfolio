import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";

// Pages
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProjectProvider } from "./context/ProjectContent";

const ProtectedRoute = ({ element }) => {
  const { isAdmin } = useAuth();
  return isAdmin ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />

          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;

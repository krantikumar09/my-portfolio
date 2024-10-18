import { Routes, Route, useLocation } from "react-router-dom";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";
import NotFound from "./pages/NotFound";
import "./index.css";

function App() {
  const location = useLocation();

  const isProjectsPage = location.pathname === "/projects";

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center gap-2 flex-col sm:flex-row">
        {/* Fixed Left Side */}
        <div className={`basis-1/2 ${isProjectsPage ? "hidden sm:block" : ""}`}>
          <Hero />
        </div>

        {/* Right Side Scrolling Content */}
        <div className="basis-1/2 h-screen overflow-y-auto no-scrollbar">
          <div className="h-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

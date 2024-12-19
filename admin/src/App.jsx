import { Route, Routes } from "react-router-dom";
import "./output.css";
import Home from "./pages/Home";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AddProject from "./pages/AddProject";
import AllProjects from "./pages/AllProjects";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";

export const backendUrl = import.meta.env.VITE_API_URL;

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="h-screen">
      <ToastContainer />
      <>
        <div className="container mx-auto px-6">
        <Header token={token} setToken={setToken} />
          {token === "" ? (
            <Login setToken={setToken} />
          ) : (
            <div className="flex flex-col md:flex-row w-full mt-4 gap-6">
                <Sidebar />
                <div className="w-full md:w-[70%] ms-4 ml-[max(5vw, 25px)] mb-8 text-gray-600 text-base">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add-project" element={<AddProject  token={token}/>} />
                    <Route path="/all-project" element={<AllProjects />} />
                  </Routes>
                </div>
            </div>
          )}
          </div>
      </>
    </div>
  );
}

export default App;

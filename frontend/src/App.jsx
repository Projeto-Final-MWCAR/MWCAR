import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Admin } from "./pages/Admin";
import { AddCar } from "./pages/AddCar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/add-car"
        element={
          <ProtectedRoute>
            <AddCar />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
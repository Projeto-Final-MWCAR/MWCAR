import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import AddCar from "./pages/AddCar.jsx";
import EditarCarro from "./pages/EditarCarro.jsx";
import AnuncioCarro from "./pages/Anuncio_Carro.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/carro/:id" element={<AnuncioCarro />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />
      <Route 
        path="/admin/cadastrar-carro" 
        element={
          <ProtectedRoute>
            <AddCar />
          </ProtectedRoute>}
      />
      <Route 
        path="/admin/editar-carro/:id"
        element={
          <ProtectedRoute>
            <EditarCarro />
          </ProtectedRoute>
        }
      />      
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}


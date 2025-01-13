import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Cadastro } from "../pages/Cadastro/Cadastro";
import Home from "../pages/Home/Home";
import { PrivateRoute } from "./private";

export function Rotas() {
  return (
    <Routes>
      <Route index element={<Login />} />  {/* Rota pública */}
      <Route path="/login" element={<Login />} />  {/* Garantindo que /login é sempre acessível */}
      <Route path="/cadastro" element={<Cadastro />} />  {/* Rota pública */}
      
      {/* Definindo rotas privadas dentro de PrivateRoute */}
      <Route element={<PrivateRoute />}> 
        <Route path="/home" element={<Home />} />  {/* Rota protegida */}
      </Route>
    </Routes>
  );
}

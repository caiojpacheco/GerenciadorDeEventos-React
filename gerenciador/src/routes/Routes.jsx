import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Cadastro } from "../pages/Cadastro/Cadastro";
import Home from "../pages/Home/Home";

export function Rotas() {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </>
  );
}

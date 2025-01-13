import axios from "axios";
import { BASE_URL } from "../config/BASE_URL.js";

export const api = axios.create({
  baseURL: BASE_URL,
});

export const loginUsuario = async (email, senha) => {
  const response = await api.post("/auth/login", { email, senha });
  return response.data;
};

export const cadastrarUsuario = (usuario) => {
  return api.post("/auth/register", usuario);
};

export const getUsuarioById = async (id) => {
  const response = await api.get(`/usuarios/${id}`);
  return response.data;
};

export const getEventos = async () => {
  const response = await api.get("/eventos");
  return response.data;
};

export const getEventosByAdminId = async (adminId) => {
  const response = await api.get(`/eventos/admin/${adminId}`);
  return response.data;
};

export const criarEvento = async (evento) => {
  const response = await api.post("/eventos", evento);
  return response.data;
};

export const cancelarEvento = async (idEvento) => {
  const response = await api.delete(`/eventos/${idEvento}`);
  return response.data;
};

export const alterarEvento = async (idEvento, novaData, novaLocalizacao) => {
  const response = await api.put(
    `/eventos/${idEvento}`,
    { data: novaData },
    { localizacao: novaLocalizacao }
  );
  return response.data;
};

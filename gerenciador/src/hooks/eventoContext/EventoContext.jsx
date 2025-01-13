import { createContext, useContext, useEffect, useState } from "react";
import {
  api,
  cancelarEvento as apiCancelarEvento,
  criarEvento as apiCriarEvento,
  alterarEvento as apiAlterarEvento,
} from "../../service/apiService.jsx";
import { AuthContext } from "../AuthLogin/AuthProvider.jsx";
import { useToast } from "../toast/ToastProvider.jsx";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [eventosAgendados, setEventosAgendados] = useState([]);
  const [adminSchedules, setAdminSchedules] = useState({});
  const [notificacoes, setNotificacoes] = useState([]);
  const { user } = useContext(AuthContext);
  const { showToast } = useToast();

  useEffect(() => {
    const loadData = () => {
      setEventosAgendados([]);
      setAdminSchedules({});
      setNotificacoes([]);
    };
    loadData();
  }, []);

  const adicionarNotificacao = (notificacao) => {
    const updatedNotificacoes = [
      ...notificacoes,
      { ...notificacao, visualizada: false },
    ];
    setNotificacoes(updatedNotificacoes);
    localStorage.setItem("notificacoes", JSON.stringify(updatedNotificacoes));
  };

  const criarEvento = async (evento) => {
    try {
      const response = await apiCriarEvento(evento.id);
      const novoEvento = { ...evento, id: response.id };
      setEventosAgendados((prev) => [...prev, novoEvento]);

      const notificacao = {
        tipo: "Criar",
        mensagem: `Evento criado com sucesso!`,
        data: new Date().toLocaleString(),
        idAdmin: evento.admin.id,
      };

      adicionarNotificacao(notificacao);
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      showToast("Erro ao criar evento.", "error", 3000);
    }
  };

  const cancelarEvento = async (eventoId) => {
    try {
      await apiCancelarEvento(eventoId);

      setEventosAgendados((prev) => prev.filter((e) => e.id !== eventoId));

      const notificacao = {
        tipo: "Cancelar",
        mensagem: `Evento com ID ${eventoId} foi cancelado.`,
        data: new Date().toLocaleString(),
        idAdmin: user.id,
      };
      adicionarNotificacao(notificacao);
    } catch (error) {
      console.error("Erro ao cancelar evento:", error);
      showToast("Erro ao cancelar evento.", "error", 3000);
    }
  };

  const alterarEvento = async (eventoId, novaData, novaLocalizacao) => {
    try {
      await apiAlterarEvento(eventoId, novaData, novaLocalizacao);

      setEventosAgendados((prev) =>
        prev.map((e) =>
          e.id === eventoId
            ? { ...e, data: novaData, localizacao: novaLocalizacao }
            : e
        )
      );

      const notificacao = {
        tipo: "Alterar",
        mensagem: `Evento com ID ${eventoId} foi alterado para ${new Date(
          novaData
        ).toLocaleString()} e ${novaLocalizacao}.`,
        data: new Date().toLocaleString(),
        idAdmin: user.id,
      };
      adicionarNotificacao(notificacao);
    } catch (error) {
      console.error("Erro ao alterar evento:", error);
      showToast("Erro ao alterar evento.", "error", 3000);
    }
  };

  const value = {
    eventosAgendados,
    criarEvento,
    notificacoes,
    adicionarNotificacao,
    cancelarEvento,
    alterarEvento,
    adminSchedules,
    setNotificacoes,
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Calendar, MapPin, Edit2, Trash2, Plus, LogOut } from "lucide-react";
import styles from "./Home.module.css";
import { AuthContext } from "../../hooks/authLogin/auth";
import { useToast } from "../../hooks/toast/ToastProvider";
import { api } from "../../services/apiService";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { id } = useContext(AuthContext);
  const { token } = useContext(AuthContext);
  const { showToast } = useToast();
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newEvent, setNewEvent] = useState({
    nome: "",
    data: "",
    localizacao: "",
    imagem: "",
    idAdm: id,
  });

  const [eventosAgendados, setEventosAgendados] = useState([]);

  const deletaEvento = async (id) => {
    try {
      await api.delete(`/eventos/${id}`);
      setEventosAgendados((prevEventos) =>
        prevEventos.filter((evento) => evento.idEvento !== id)
      );
    } catch (error) {
      alert("Erro ao deletar!");
    }
  };

  const chamaEventos = async () => {
    try {
      const response = await api.get(`/eventos/admin/${id}`);
      setEventosAgendados(response.data);
    } catch (error) {
      alert("Erro: ", error.response);
    }
  };

  useEffect(() => {
    chamaEventos();
  }, []);

  const validateImageUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const criarEvento = async () => {
    try {
      const response = await api.post("/eventos", newEvent, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      setEventosAgendados([...eventosAgendados, response.data]);
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      throw new Error("Erro ao criar evento");
    }
  };

  const handleAddEvent = async () => {
    if (!newEvent.nome || !newEvent.data || !newEvent.localizacao) {
      showToast("Por favor, preencha todos os campos obrigatórios.", "error", 3000);
      return;
    }

    if (!newEvent.imagem) {
      showToast("Por favor, insira a URL da imagem do evento.", "error", 3000);
      return;
    }

    if (!validateImageUrl(newEvent.imagem)) {
      showToast("Por favor, insira uma URL de imagem válida.", "error", 3000);
      return;
    }

    setIsLoading(true);
    try {
      await criarEvento();
      showToast("Evento criado com sucesso!", "success", 3000);
      setNewEvent({
        nome: "",
        data: "",
        localizacao: "",
        imagem: "",
        idAdm: id || "",
      });
      setIsAddModalOpen(false);
    } catch (error) {
      showToast("Erro ao criar evento. Tente novamente.", "error", 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const editaEvento = async () => {
    try {
      const updatedEvent = {
        ...editingEvent,
        data: new Date(editingEvent.data).toISOString(),
      };

      const response = await api.put(`/eventos/${editingEvent.idEvento}`, updatedEvent, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      setEventosAgendados((prevEventos) =>
        prevEventos.map((evento) =>
          evento.idEvento === editingEvent.idEvento ? response.data : evento
        )
      );

      showToast("Evento editado com sucesso!", "success", 3000);
      setEditingEvent(null);
    } catch (error) {
      showToast("Erro ao editar evento. Tente novamente.", "error", 3000);
      console.error("Erro ao editar evento:", error);
    }
  };

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Eventos</h1>
        <button
          className={styles.buttonPrimary}
          onClick={() => setIsAddModalOpen(true)}
          disabled={isLoading}
        >
          <Plus size={20} />
          Adicionar Evento
        </button>

        <button className={styles.buttonPrimary} onClick={handleLogout}>Fazer logout</button>
      </div>

      <div className={styles.eventsGrid}>
        {eventosAgendados.map((event) => (
          <div key={event.idEvento} className={styles.eventCard}>
            <div className={styles.eventImage}>
              <img
                src={event.imagem}
                alt={event.nome}
                onError={(e) => {
                  e.target.src = "/api/placeholder/400/200";
                  e.target.onerror = null;
                }}
              />
            </div>
            <div className={styles.eventContent}>
              <h2>{event.nome}</h2>
              {editingEvent?.idEvento === event.idEvento ? (
                <div className={styles.editForm}>
                  <input
                    type="date"
                    value={editingEvent.data}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, data: e.target.value })
                    }
                    disabled={isLoading}
                  />
                  <input
                    value={editingEvent.localizacao}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        localizacao: e.target.value,
                      })
                    }
                    disabled={isLoading}
                    placeholder="Localização"
                  />
                  <div className={styles.buttonGroup}>
                    <button
                      className={styles.button}
                      onClick={editaEvento}
                      disabled={isLoading}
                    >
                      {isLoading ? "Salvando..." : "Salvar"}
                    </button>
                    <button
                      className={styles.buttonSecondary}
                      onClick={() => setEditingEvent(null)}
                      disabled={isLoading}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.eventDetails}>
                  <div className={styles.eventInfo}>
                    <Calendar size={16} />
                    <span>{new Date(event.data).toLocaleDateString()}</span>
                  </div>
                  <div className={styles.eventInfo}>
                    <MapPin size={16} />
                    <span>{event.localizacao}</span>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.eventActions}>
              {editingEvent?.idEvento !== event.idEvento && (
                <>
                  <button
                    className={styles.buttonIcon}
                    onClick={() => setEditingEvent(event)}
                    disabled={isLoading}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className={styles.buttonDanger}
                    onClick={() => deletaEvento(event.idEvento)}
                    disabled={isLoading}
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {isAddModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Novo Evento</h2>
              <button
                className={styles.buttonIcon}
                onClick={() => setIsAddModalOpen(false)}
                disabled={isLoading}
              >
                ✕
              </button>
            </div>
            <div className={styles.modalContent}>
              <input
                placeholder="Nome do evento"
                value={newEvent.nome}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, nome: e.target.value })
                }
                disabled={isLoading}
                required
              />
              <input
                type="date"
                value={newEvent.data}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, data: e.target.value })
                }
                disabled={isLoading}
                required
              />
              <input
                placeholder="Localização"
                value={newEvent.localizacao}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, localizacao: e.target.value })
                }
                disabled={isLoading}
                required
              />
              <input
                placeholder="URL da imagem do evento"
                value={newEvent.imagem}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, imagem: e.target.value })
                }
                disabled={isLoading}
                required
              />
              <button
                className={styles.buttonPrimary}
                onClick={handleAddEvent}
                disabled={isLoading}
              >
                {isLoading ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

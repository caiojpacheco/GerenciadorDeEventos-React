import React, { useState } from "react";
import { Calendar, MapPin, Edit2, Trash2, Plus } from "lucide-react";
import styles from "./Home.module.css";

const Home = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Tech Conference 2025",
      date: "2025-03-15",
      location: "São Paulo Convention Center",
      image: "https://picsum.photos/seed/picsum/400/200",
    },
    {
      id: 2,
      title: "Music Festival",
      date: "2025-04-20",
      location: "Parque Ibirapuera",
      image: "https://picsum.photos/seed/picsum/400/200",
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    location: "",
    image: "",
  });

  const handleAddEvent = () => {
    const eventToAdd = {
      id: events.length + 1,
      ...newEvent,
    };
    setEvents([...events, eventToAdd]);
    setNewEvent({ title: "", date: "", location: "", image: "" });
    setIsAddModalOpen(false);
  };

  const handleEditEvent = (event) => {
    const updatedEvents = events.map((e) =>
      e.id === event.id ? { ...e, ...editingEvent } : e
    );
    setEvents(updatedEvents);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Eventos</h1>
        <button
          className={styles.buttonPrimary}
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus size={20} />
          Adicionar Evento
        </button>
      </div>

      <div className={styles.eventsGrid}>
        {events.map((event) => (
          <div key={event.id} className={styles.eventCard}>
            <div className={styles.eventImage}>
              <img src={event.image} alt={event.title} />
            </div>
            <div className={styles.eventContent}>
              <h2>{event.title}</h2>
              {editingEvent?.id === event.id ? (
                <div className={styles.editForm}>
                  <input
                    type="date"
                    value={editingEvent.date}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, date: e.target.value })
                    }
                  />
                  <input
                    value={editingEvent.location}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        location: e.target.value,
                      })
                    }
                  />
                  <div className={styles.buttonGroup}>
                    <button
                      className={styles.button}
                      onClick={() => handleEditEvent(event)}
                    >
                      Salvar
                    </button>
                    <button
                      className={styles.buttonSecondary}
                      onClick={() => setEditingEvent(null)}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.eventDetails}>
                  <div className={styles.eventInfo}>
                    <Calendar size={16} />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className={styles.eventInfo}>
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                </div>
              )}
            </div>
            <div className={styles.eventActions}>
              {editingEvent?.id !== event.id && (
                <>
                  <button
                    className={styles.buttonIcon}
                    onClick={() => setEditingEvent(event)}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className={styles.buttonDanger}
                    onClick={() => handleDeleteEvent(event.id)}
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
              >
                ✕
              </button>
            </div>
            <div className={styles.modalContent}>
              <input
                placeholder="Nome do evento"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
              />
              <input
                placeholder="Localização"
                value={newEvent.location}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, location: e.target.value })
                }
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  setNewEvent({
                    ...newEvent,
                    image: "/api/placeholder/400/200",
                  });
                }}
              />
              <button className={styles.buttonPrimary} onClick={handleAddEvent}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

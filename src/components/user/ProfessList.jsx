import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { Global } from "../../helpers/Global.jsx";
import useAuth from "../../hooks/useAuth.jsx";

// Función auxiliar para renderizar estrellas basadas en un valor de 1 a 5
const renderStars = (value) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={i < value ? "filled-star" : "empty-star"}>
        ★
      </span>
    );
  }
  return <div className="stars-container">{stars}</div>;
};

export const ProfessList = () => {
  const { profession } = useParams();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { filters, setActiveOffer } = useOutletContext(); // Obtener setActiveOffer del contexto
  const { auth } = useAuth();

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${Global.url}user/profession/${profession}`);
      const data = await response.json();
      if (data.status === "success") {
        setUsers(data.users);
        setFilteredUsers(data.users);
      } else {
        console.error("Error al obtener los usuarios");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [profession]);

  useEffect(() => {
    let filtered = users;

    if (filters.name) {
      filtered = filtered.filter((user) =>
        `${user.name} ${user.surname}`.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.profession) {
      filtered = filtered.filter((user) =>
        user.professions.some((p) =>
          p.toLowerCase().includes(filters.profession.toLowerCase())
        )
      );
    }

    if (filters.location) {
      filtered = filtered.filter((user) =>
        user.location && user.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.experience_years) {
      const minExperience = parseInt(filters.experience_years, 10);
      filtered = filtered.filter(
        (user) =>
          user.professional_info?.experience_years &&
          user.professional_info.experience_years >= minExperience
      );
    }

    if (filters.work_preference) {
      filtered = filtered.filter(
        (user) =>
          user.professional_info?.work_preference &&
          user.professional_info.work_preference
            .toLowerCase()
            .includes(filters.work_preference.toLowerCase())
      );
    }

    if (filters.title) {
      filtered = filtered.filter(
        (user) =>
          user.professional_info?.titles &&
          user.professional_info.titles.some((t) =>
            t.toLowerCase().includes(filters.title.toLowerCase())
          )
      );
    }

    if (filters.courses) {
      filtered = filtered.filter(
        (user) =>
          user.professional_info?.courses &&
          user.professional_info.courses.some((c) =>
            c.toLowerCase().includes(filters.courses.toLowerCase())
          )
      );
    }

    if (filters.knowledge_area) {
      filtered = filtered.filter((user) => {
        const knowledgeAreas = user.professional_info?.knowledge_areas || {};
        return Object.keys(knowledgeAreas).some((area) =>
          area.toLowerCase().includes(filters.knowledge_area.toLowerCase())
        );
      });
    }

    setFilteredUsers(filtered);
  }, [filters, users]);

  // Función para manejar la solicitud de oferta
  const handleOfferRequest = (user) => {
    setActiveOffer({ user }); // Establecer la oferta activa
  };

  return (
    <div>
      <h1>{profession}</h1>
      {filteredUsers.length === 0 ? (
        <p>No hay usuarios disponibles para esta profesión.</p>
      ) : (
        <div>
          {/* Fila superior con títulos */}
          <div className="user-header-row">
            <span>Profesiones</span>
            <span>Ubicación</span>
            <span>Años de experiencia</span>
            <span>Preferencia de trabajo</span>
            <span>Título</span>
            <span>Cursos</span>
            <span>Áreas de Conocimiento</span>
          </div>

          <div className="users-container">
            {filteredUsers.map((user, index) => (
              <div key={index} className="user-card">
                <div className="user-info-row">
                  <span>{user.professions.join(", ")}</span>
                  <span>{user.location || "Falta por rellenar"}</span>
                  <span>{user.professional_info?.experience_years || "Falta por rellenar"}</span>
                  <span>{user.professional_info?.work_preference || "Falta por rellenar"}</span>
                  <span>{(user.professional_info?.titles && user.professional_info.titles.join(", ")) || "Falta por rellenar"}</span>
                  <span>{(user.professional_info?.courses && user.professional_info.courses.join(", ")) || "Falta por rellenar"}</span>
                  <span>
                    {user.professional_info?.knowledge_areas && Object.keys(user.professional_info.knowledge_areas).length > 0
                      ? Object.entries(user.professional_info.knowledge_areas).map(([area, value]) => (
                          <div key={area} className="knowledge-area">
                            <strong>{area}:</strong> {renderStars(value)}
                          </div>
                        ))
                      : "Falta por rellenar"}
                  </span>
                </div>
                {user._id !== auth.id && (
                  <button
                    className="config-btn"
                    onClick={() => handleOfferRequest(user)}
                  >
                    Solicitar oferta
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

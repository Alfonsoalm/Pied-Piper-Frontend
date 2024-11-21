import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Global } from "../../helpers/Global.jsx";

export const ProfessProfile = () => {
  const [user, setUser] = useState(null);
  const params = useParams();

  useEffect(() => {
    getDataProfess();
  }, [params]);

  const getDataProfess = async () => {
    try {
      const response = await fetch(`${Global.url}user/profile/${params.userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (response.ok && data.status === "success") {
        setUser(data.user);
      } else {
        console.error("No se encontró el perfil del usuario.");
        setUser(null);
      }
    } catch (error) {
      console.error("Error al obtener el perfil del usuario:", error);
      setUser(null);
    }
  };

  if (!user) {
    return <p>No se encontró el perfil del usuario.</p>;
  }

  const {
    professions,
    location,
    bio,
    professional_info: {
      experience_years,
      knowledge_areas,
      salary_range,
      schedule_preference,
      custom_schedule,
      preferred_locations,
      distance_range_km,
      work_preference,
      titles,
      courses,
    } = {},
  } = user;

  const formattedSalaryRange = salary_range ? `${salary_range[0]} - ${salary_range[1]} €` : "N/A";

  return (
    <div className="profile-container">
      {/* SECCIÓN PRINCIPAL */}
      <div className="profile-header">
        <div className="background-banner"></div>
        <div className="avatar-container">
          <img
            src={
              user.image && user.image !== "default.png"
                ? Global.url + "user/avatar/" + user.image
                : "default-avatar-url" // Cambia esto por una URL válida
            }
            alt="Foto de perfil"
            className="profile-avatar"
          />
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{user.name || "N/A"} {user.surname || "N/A"}</h1>
          <p className="profile-professions">
            {professions ? professions.join(" | ") : "Sin profesiones registradas"}
          </p>
          <p className="profile-location">
            {location || "Ubicación no especificada"}
          </p>
          <div className="profile-description">
            <p>{bio || "Descripción no disponible"}</p>
          </div>

          <div className="btn-profile">
            <button className="btn-contact-info">
              Contactar
            </button>
            <button className="btn-contact-info">
              Descargar CV
            </button>
          </div>

        </div>
      </div>

      {/* SECCIÓN DE INFORMACIÓN PROFESIONAL */}
      <div className="profile-professional-section">
        <h2>Información Profesional</h2>
        <p><strong>Experiencia:</strong> {experience_years || "N/A"} años</p>
        <p><strong>Títulos:</strong> {titles?.length ? titles.join(", ") : "N/A"}</p>
        <p><strong>Cursos:</strong> {courses?.length ? courses.join(", ") : "N/A"}</p>
        <h3>Áreas de Conocimiento</h3>
        <ul>
          {knowledge_areas
            ? Object.entries(knowledge_areas).map(([area, value]) => (
                <li key={area}>
                  {area}: {value}/5
                </li>
              ))
            : <li>N/A</li>}
        </ul>
      </div>

      {/* SECCIÓN DE CONDICIONES LABORALES */}
      <div className="profile-conditions-section">
        <h2>Condiciones Laborales</h2>
        <p><strong>Preferencia de Trabajo:</strong> {work_preference || "N/A"}</p>
        <p><strong>Rango Salarial:</strong> {formattedSalaryRange}</p>
        <p><strong>Horario Preferido:</strong> {schedule_preference || "N/A"}</p>
        {custom_schedule && <p><strong>Horario Personalizado:</strong> {custom_schedule}</p>}
        {work_preference !== "remote" && (
          <>
            <p><strong>Ubicaciones Preferidas:</strong></p>
            <ul className="preferred-locations-list">
              {preferred_locations?.length
                ? preferred_locations.map((location, index) => (
                    <li key={index}>
                      <i className="location-icon">📍</i> {location}
                    </li>
                  ))
                : <li>N/A</li>}
            </ul>
          </>
        )}
        <p><strong>Distancia Máxima:</strong> {distance_range_km ? `${distance_range_km} km` : "N/A"}</p>
      </div>
    </div>
  );
};

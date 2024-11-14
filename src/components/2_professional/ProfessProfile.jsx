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

  return (
    <div className="profile-info__user">
      <h2>Información Profesional</h2>
      <div className="general-info__container-avatar">
        {user.image && user.image !== "default.png" ? (
            <img
            src={Global.url + "user/avatar/" + user.image}
            className="container-avatar__img"
            alt="Foto de perfil"
            />
        ) : (
            <img
            src={avatar}
            className="container-avatar__img"
            alt="Foto de perfil"
            />
        )}
      </div>
      <p><strong>Profesiones:</strong> {user.professions?.join(", ") || "N/A"}</p>
      <p><strong>Ubicación:</strong> {user.location || "N/A"}</p>
      <p><strong>Experiencia:</strong> {user.professional_info?.experience_years || "N/A"} años</p>
      <p><strong>Preferencia de Trabajo:</strong> {user.professional_info?.work_preference || "N/A"}</p>
      <p><strong>Títulos:</strong> {user.professional_info?.titles?.join(", ") || "N/A"}</p>
      <p><strong>Cursos:</strong> {user.professional_info?.courses?.join(", ") || "N/A"}</p>
      <p><strong>Áreas de Conocimiento:</strong></p>
      <ul>
        {user.professional_info?.knowledge_areas
          ? Object.entries(user.professional_info.knowledge_areas).map(
              ([area, value]) => (
                <li key={area}>
                  {area}: {value}/5
                </li>
          ))
          : "N/A"}
      </ul>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Global } from "../../helpers/Global.jsx";
import { useOutletContext } from "react-router-dom"; // Importar para recibir contexto

export const Profiles = () => {
  const [professions, setProfessions] = useState([]);
  const [filteredProfessions, setFilteredProfessions] = useState([]);
  const { filters } = useOutletContext();

  // Función para obtener las profesiones
  const fetchProfessions = async () => {
    try {
      const response = await fetch(`${Global.url}user/professions`);
      const data = await response.json();
      if (data.status === "success") {
        setProfessions(data.professions);
        setFilteredProfessions(data.professions);
      } else {
        console.error("Error al obtener las profesiones");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  // useEffect para cargar las profesiones al montar el componente
  useEffect(() => {
    fetchProfessions();
  }, []);

  // useEffect para aplicar el filtrado cuando los filtros cambien
  useEffect(() => {
    if (filters.profession) {
      const filtered = professions.filter((profession) =>
        profession.toLowerCase().includes(filters.profession.toLowerCase())
      );
      setFilteredProfessions(filtered);
    } else {
      setFilteredProfessions(professions); // Si no hay filtro, mostrar todos
    }
  }, [filters, professions]);

  return (
    <div>
      <h1>Profesiones</h1>
      <div className="profiles-container">
        {filteredProfessions.length === 0 ? (
          <p>No hay profesiones disponibles</p>
        ) : (
          filteredProfessions.map((profession, index) => (
            <Link to={`/social/profiles/${profession}`} key={index} className="profile-card">
              <h3>{profession}</h3>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

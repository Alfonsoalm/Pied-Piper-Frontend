import React, { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom"; // Para obtener el parámetro de la URL
import { Global } from "../../helpers/Global.jsx";
import avatar from "../../assets/img/user.png"; // Imagen predeterminada para empresas

// Función auxiliar para generar un número aleatorio de 3 a 5
const getRandomRating = () => {
  return (Math.random() * 2 + 3).toFixed(1); // Genera un número entre 3 y 5 con 1 decimal
};

export const CompanyList = () => { // Valor predeterminado para `filters`
  const { sector } = useParams(); // Obtener el sector de la URL
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const { filters } = useOutletContext();

  // Función para obtener empresas por sector
  const fetchCompanies = async () => {
    try {
      const response = await fetch(`${Global.url}company/sector/${sector}`);
      const data = await response.json();
      if (data.status === "success") {
        const companiesWithRating = data.companies.map((company) => ({
          ...company,
          rating: parseFloat(getRandomRating()) // Convertimos a número para filtrado
        }));
        setCompanies(companiesWithRating);
        setFilteredCompanies(companiesWithRating);
      } else {
        console.error("Error al obtener las empresas");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [sector]);

  // useEffect para aplicar el filtrado cuando los filtros cambien
  useEffect(() => {
    try {
      let filtered = companies;

      if (filters.name) {
        filtered = filtered.filter((company) =>
          company.name?.toLowerCase().includes(filters.name.toLowerCase())
        );
      }

      if (filters.location) {
        filtered = filtered.filter((company) =>
          company.location?.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      if (filters.rating) {
        const minRating = parseFloat(filters.rating);
        filtered = filtered.filter((company) => company.rating >= minRating);
      }

      setFilteredCompanies(filtered);
    } catch (error) {
      console.error("Error al filtrar empresas:", error);
    }
  }, [filters, companies]);

  return (
    <div>
      <h1>{sector}</h1>
      {filteredCompanies.length === 0 ? (
        <p>No hay empresas disponibles para este sector.</p>
      ) : (
        <div>
          {/* Fila superior con títulos */}
          <div className="companies-header-row">
            <span>Imagen</span>
            <span>Nombre</span>
            <span>Ubicación</span>
            <span>Sectores</span>
            <span>Valoración</span>
          </div>

          <div className="companies-container">
            {filteredCompanies.map((company, index) => (
              <div key={index} className="company-card">
                <div className="company-info-row">
                  {/* Mostrar la imagen de la empresa */}
                  <div className="company-image-container">
                    <img
                      src={
                        company.image && company.image !== "default.png"
                          ? `${Global.url}user/avatar/${company.image}`
                          : avatar
                      }
                      alt={company.name}
                      className="company-image"
                    />
                  </div>
                  <span>{company.name}</span>
                  <span>{company.location || "Falta por rellenar"}</span>
                  <span>{company.sectors.join(", ") || "Falta por rellenar"}</span>
                  <span>{company.rating}</span> {/* Mostrar la valoración */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

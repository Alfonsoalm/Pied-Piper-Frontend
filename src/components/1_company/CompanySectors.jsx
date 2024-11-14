import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global.jsx";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom"; // Importar para recibir contexto

export const CompanySectors = () => {
  const [sectors, setSectors] = useState([]);
  const [filteredSectors, setFilteredSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener los filtros desde el contexto del Outlet
  const { filters } = useOutletContext();

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await fetch(Global.url + "company/list");
        if (!response.ok) {
          throw new Error("Error al obtener la lista de empresas");
        }
        const data = await response.json();
        if (data.status === "success" && data.companies) {
          const extractedSectors = data.companies.map((company) => company.sectors).flat();
          const uniqueSectors = [...new Set(extractedSectors)];
          setSectors(uniqueSectors);
          setFilteredSectors(uniqueSectors);
        } else {
          throw new Error("No se pudieron obtener las empresas");
        }
      } catch (err) {
        console.error("Error al obtener sectores:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSectors();
  }, []);

  // Aplicar el filtro cuando los filtros cambien
  useEffect(() => {
    if (filters.sector) {
      const filtered = sectors.filter((sector) =>
        sector.toLowerCase().includes(filters.sector.toLowerCase())
      );
      setFilteredSectors(filtered);
    } else {
      setFilteredSectors(sectors); // Si no hay filtro, mostrar todos
    }
  }, [filters, sectors]);

  return (
    <div>
      <h1>Sectores</h1>
      {loading && <p>Cargando sectores...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <div className="sectors-container">
          {filteredSectors.length > 0 ? (
            filteredSectors.map((sector, index) => (
              <Link
                to={`/social/sectors/${encodeURIComponent(sector)}`}
                key={index}
                className="sector-card">
                <h3>{sector}</h3>
              </Link>
            ))
          ) : (
            <p>No hay sectores disponibles</p>
          )}
        </div>
      )}
    </div>
  );
};

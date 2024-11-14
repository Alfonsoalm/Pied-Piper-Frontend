import React, { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Header } from "./PrivateHeader";
import { Sidebar } from "./PrivateSidebar";
import { FilterSidebar } from "../0_common/FilterSidebar";
import { OfferForm } from "../0_common/OfferForm"; // Asegúrate de que esté importado correctamente
import useAuth from "../../hooks/useAuth";

export const PrivateLayout = () => {
  const { auth, loading } = useAuth();
  const location = useLocation();

  // Estado para manejar los filtros
  const [filters, setFilters] = useState({
    name: "",
    sector: "",
    profession: "",
  });

  // Estado para manejar la visibilidad del formulario de oferta
  const [activeOffer, setActiveOffer] = useState(null);

  // Determinar el contexto para el filtro según la ruta
  const filterContexts = {
    "/social/sectors": "sectors",
    "/social/profiles": "profiles",
  };
  const currentPath = Object.keys(filterContexts).find((path) =>
    location.pathname.startsWith(path)
  );
  const filterContext = currentPath ? filterContexts[currentPath] : null;

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters); // Actualiza el estado con los filtros
  };

  const layoutClass = auth.legal_id ? "company-layout" : "professional-layout";

  if (loading) {
    return <h1>Cargando...</h1>;
  } else {
    return (
      <div className={`private-layout ${layoutClass}`}>
        <Header className="private-layout__header" />
        {/* Mostrar OfferForm si hay una oferta activa, de lo contrario mostrar filtros */}
        {activeOffer ? (
          <OfferForm
            targetUser={activeOffer.user} // Pasar el usuario seleccionado
            companyId={auth._id} // Pasar el ID de la empresa autenticada
            onCancel={() => setActiveOffer(null)} // Función para manejar el cierre
            className="layout__aside"
          />
        ) : filterContext ? (
          <FilterSidebar
            className="layout__aside"
            context={filterContext}
            onFilterChange={handleFilterChange}
          />
        ) : (
          <Sidebar className="layout__aside" />
        )}
        <section className="private-layout__content">
          {auth._id ? (
            <Outlet context={{ filters, setActiveOffer }} />
          ) : (
            <Navigate to="/login" />
          )}
        </section>
      </div>
    );
  }
};

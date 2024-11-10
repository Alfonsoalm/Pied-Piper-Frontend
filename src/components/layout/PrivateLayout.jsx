import React, { useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Header } from "./PrivateHeader";
import { Sidebar } from "./PrivateSidebar";
import { FilterSidebar } from "../common/FilterSidebar";
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
        {/* Mostrar FilterSidebar si hay un contexto definido, de lo contrario mostrar Sidebar */}
        {filterContext ? (
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
            <Outlet context={{ filters }} />
          ) : (
            <Navigate to="/login" />
          )
          }
        </section>
      </div>
    );
  }
};

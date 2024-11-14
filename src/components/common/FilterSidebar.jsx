import React, { useState } from "react";

export const FilterSidebar = ({ context, onFilterChange }) => {
  // Estado inicial para filtros de sectors (empresas)
  const initialCompanyFilters = {
    name: "",
    location: "",
    rating: "",
  };

  // Estado inicial para filtros de profiles (profesionales)
  const initialProfessionalFilters = {
    profession: "",
    location: "",
    experience_years: "",
    work_preference: "",
    title: "",
    courses: "",
    knowledge_area: "",
  };

  // Estado de filtros según el contexto
  const [companyFilters, setCompanyFilters] = useState(initialCompanyFilters);
  const [professionalFilters, setProfessionalFilters] = useState(initialProfessionalFilters);

  // Manejar cambios en los filtros de empresas
  const handleCompanyInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...companyFilters,
      [name]: value,
    };
    console.log(companyFilters);
    setCompanyFilters(newFilters);

    // Comunicar cambios al componente padre
    onFilterChange(newFilters);
  };

  // Manejar cambios en los filtros de profesionales
  const handleProfessionalInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...professionalFilters,
      [name]: value,
    };
    console.log(professionalFilters);
    setProfessionalFilters(newFilters);

    // Comunicar cambios al componente padre
    onFilterChange(newFilters);
  };

  // Filtros específicos para sectors (empresas)
  const renderCompanyFilters = () => (
    <>
      <div className="filter-group">
        <label htmlFor="name">Filtrar por nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={companyFilters.name}
          onChange={handleCompanyInputChange}
          placeholder="Buscar por nombre de empresa"
        />
      </div>
      <div className="filter-group">
        <label htmlFor="location">Filtrar por ubicación</label>
        <input
          type="text"
          id="location"
          name="location"
          value={companyFilters.location}
          onChange={handleCompanyInputChange}
          placeholder="Buscar por ubicación"
        />
      </div>
      <div className="filter-group">
        <label htmlFor="rating">Filtrar por valoración</label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={companyFilters.rating}
          onChange={handleCompanyInputChange}
          placeholder="Valoración mínima (1-5)"
          min="1"
          max="5"
        />
      </div>
    </>
  );

  // Filtros específicos para profiles (profesionales)
  const renderProfessionalFilters = () => (
    <>
      <div className="filter-group">
        <label htmlFor="profession">Filtrar por profesión</label>
        <input
          type="text"
          id="profession"
          name="profession"
          value={professionalFilters.profession}
          onChange={handleProfessionalInputChange}
          placeholder="Buscar por profesión"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="location">Filtrar por ubicación</label>
        <input
          type="text"
          id="location"
          name="location"
          value={professionalFilters.location}
          onChange={handleProfessionalInputChange}
          placeholder="Buscar por ubicación"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="experience_years">Filtrar por años de experiencia</label>
        <input
          type="number"
          id="experience_years"
          name="experience_years"
          value={professionalFilters.experience_years}
          onChange={handleProfessionalInputChange}
          placeholder="Mínimo años de experiencia"
          min="0"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="work_preference">Filtrar por preferencia de trabajo</label>
        <select
          id="work_preference"
          name="work_preference"
          value={professionalFilters.work_preference}
          onChange={handleProfessionalInputChange}
        >
          <option value="">Cualquiera</option>
          <option value="onsite">Onsite</option>
          <option value="hybrid">Hybrid</option>
          <option value="remote">Remote</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="title">Filtrar por título</label>
        <input
          type="text"
          id="title"
          name="title"
          value={professionalFilters.title}
          onChange={handleProfessionalInputChange}
          placeholder="Buscar por título"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="courses">Filtrar por cursos</label>
        <input
          type="text"
          id="courses"
          name="courses"
          value={professionalFilters.courses}
          onChange={handleProfessionalInputChange}
          placeholder="Buscar por cursos"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="knowledge_area">Filtrar por áreas de conocimiento</label>
        <input
          type="text"
          id="knowledge_area"
          name="knowledge_area"
          value={professionalFilters.knowledge_area}
          onChange={handleProfessionalInputChange}
          placeholder="Buscar por áreas de conocimiento"
        />
      </div>
    </>
  );

  return (
    <aside className="layout__aside">
      <h2>Filtros</h2>
      {context === "sectors" && renderCompanyFilters()}
      {context === "profiles" && renderProfessionalFilters()}
    </aside>
  );
};
import React, { useState } from "react";

export const FilterSidebar = ({ context, onFilterChange }) => {
  const initialCompanyFilters = {
    name: "",
    location: "",
    rating: "",
  };

  const initialProfessionalFilters = {
    profession: "",
    location: "",
    experience_years: "",
    work_preference: "",
    title: "",
    courses: "",
    knowledge_area: "",
  };

  const [companyFilters, setCompanyFilters] = useState(initialCompanyFilters);
  const [professionalFilters, setProfessionalFilters] = useState(initialProfessionalFilters);

  const handleCompanyInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...companyFilters,
      [name]: value,
    };
    setCompanyFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleProfessionalInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = {
      ...professionalFilters,
      [name]: value,
    };
    setProfessionalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const renderCompanyFilters = () => (
    <form className="filter-sidebar-form">
      <div className="filter-sidebar-form-group">
        <label htmlFor="name" className="filter-sidebar-label">Filtrar por nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          className="filter-sidebar-input"
          value={companyFilters.name}
          onChange={handleCompanyInputChange}
          placeholder="Buscar por nombre de empresa"
        />
      </div>
      <div className="filter-sidebar-form-group">
        <label htmlFor="location" className="filter-sidebar-label">Filtrar por ubicación</label>
        <input
          type="text"
          id="location"
          name="location"
          className="filter-sidebar-input"
          value={companyFilters.location}
          onChange={handleCompanyInputChange}
          placeholder="Buscar por ubicación"
        />
      </div>
      <div className="filter-sidebar-form-group">
        <label htmlFor="rating" className="filter-sidebar-label">Filtrar por valoración</label>
        <input
          type="number"
          id="rating"
          name="rating"
          className="filter-sidebar-input"
          value={companyFilters.rating}
          onChange={handleCompanyInputChange}
          placeholder="Valoración mínima (1-5)"
          min="1"
          max="5"
        />
      </div>
    </form>
  );

  const renderProfessionalFilters = () => (
    <form className="filter-sidebar-form">
      <div className="filter-sidebar-form-group">
        <label htmlFor="profession" className="filter-sidebar-label">Filtrar por profesión</label>
        <input
          type="text"
          id="profession"
          name="profession"
          className="filter-sidebar-input"
          value={professionalFilters.profession}
          onChange={handleProfessionalInputChange}
          placeholder="Buscar por profesión"
        />
      </div>
      <div className="filter-sidebar-form-group">
        <label htmlFor="location" className="filter-sidebar-label">Filtrar por ubicación</label>
        <input
          type="text"
          id="location"
          name="location"
          className="filter-sidebar-input"
          value={professionalFilters.location}
          onChange={handleProfessionalInputChange}
          placeholder="Buscar por ubicación"
        />
      </div>
      <div className="filter-sidebar-form-group">
        <label htmlFor="experience_years" className="filter-sidebar-label">Filtrar por años de experiencia</label>
        <input
          type="number"
          id="experience_years"
          name="experience_years"
          className="filter-sidebar-input"
          value={professionalFilters.experience_years}
          onChange={handleProfessionalInputChange}
          placeholder="Mínimo años de experiencia"
          min="0"
        />
      </div>
      <div className="filter-sidebar-form-group">
        <label htmlFor="work_preference" className="filter-sidebar-label">Filtrar por preferencia de trabajo</label>
        <select
          id="work_preference"
          name="work_preference"
          className="filter-sidebar-select"
          value={professionalFilters.work_preference}
          onChange={handleProfessionalInputChange}
        >
          <option value="">Cualquiera</option>
          <option value="onsite">Onsite</option>
          <option value="hybrid">Hybrid</option>
          <option value="remote">Remote</option>
        </select>
      </div>
      <div className="filter-sidebar-form-group">
        <label htmlFor="title" className="filter-sidebar-label">Filtrar por título</label>
        <input
          type="text"
          id="title"
          name="title"
          className="filter-sidebar-input"
          value={professionalFilters.title}
          onChange={handleProfessionalInputChange}
          placeholder="Buscar por título"
        />
      </div>
      <div className="filter-sidebar-form-group">
        <label htmlFor="courses" className="filter-sidebar-label">Filtrar por cursos</label>
        <input
          type="text"
          id="courses"
          name="courses"
          className="filter-sidebar-input"
          value={professionalFilters.courses}
          onChange={handleProfessionalInputChange}
          placeholder="Buscar por cursos"
        />
      </div>
      <div className="filter-sidebar-form-group">
        <label htmlFor="knowledge_area" className="filter-sidebar-label">Filtrar por áreas de conocimiento</label>
        <input
          type="text"
          id="knowledge_area"
          name="knowledge_area"
          className="filter-sidebar-input"
          value={professionalFilters.knowledge_area}
          onChange={handleProfessionalInputChange}
          placeholder="Buscar por áreas de conocimiento"
        />
      </div>
    </form>
  );

  return (
    <aside className="layout__aside">
      <h2>Filtros</h2>
      {context === "sectors" && renderCompanyFilters()}
      {context === "profiles" && renderProfessionalFilters()}
    </aside>
  );
};

import React, { useState } from "react";
import useAuth from "../../hooks/useAuth.jsx";
import { TagsInput } from "../0_common/TagsInput.jsx"; // Importamos el componente TagsInput

export const ProfessConfig = () => {
  const { auth, setAuth } = useAuth();
  // Para manejar las etiquetas de sectores o profesiones
  const [professions, setProfessions] = useState(auth.professions || []);
  const [birthDate, setBirthDate] = useState(auth.birth_date || "");
  const [location, setLocation] = useState(auth.location || "");
  const [preferredLocations, setPreferredLocations] = useState(
    auth.professional_info?.preferred_locations || []
  );
  const [distanceRange, setDistanceRange] = useState(
    auth.professional_info?.range_location || 0
  );
  const [workPreference, setWorkPreference] = useState(
    auth.professional_info?.work_preference || "remote"
  );
  const [yearsExperience, setYearsExperience] = useState(
    auth.professional_info?.experience_years || ""
  );
  const [knowledgeAreas, setKnowledgeAreas] = useState(
    auth.professional_info?.knowledge_areas || {}
  );
  const [salaryRange, setSalaryRange] = useState(
    auth.professional_info?.salary_range || { min: "", max: "" }
  );
  const [schedulePreference, setSchedulePreference] = useState(
    auth.professional_info?.schedule_preference || "any"
  );
  const [customSchedule, setCustomSchedule] = useState(
    auth.professional_info?.custom_schedule || {
      hours_per_week: "",
      details: "",
    }
  );
  const [titles, setTitles] = useState(auth.professional_info?.titles || []);
  const [courses, setCourses] = useState(auth.professional_info?.courses || []);

  const handleKnowledgeAreaChange = (area, value) => {
    setKnowledgeAreas((prevAreas) => ({
      ...prevAreas,
      [area]: value > 5 ? 5 : value < 1 ? 1 : value, // Limitar valores de 1 a 5
    }));
  };

  const removeKnowledgeArea = (area) => {
    setKnowledgeAreas((prevAreas) => {
      const updatedAreas = { ...prevAreas };
      delete updatedAreas[area];
      return updatedAreas;
    });
  };

  const addCourse = () => {
    const newCourse = prompt("Ingrese un nuevo curso:");
    if (newCourse) setCourses([...courses, newCourse]);
  };

  const removeCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const addTitle = () => {
    const newTitle = prompt("Ingrese un nuevo título:");
    if (newTitle) setTitles([...titles, newTitle]);
  };

  const removeTitle = (index) => {
    setTitles(titles.filter((_, i) => i !== index));
  };
  
  return (
    <>
      {/* Campos específicos para usuarios */}
      <div className="config-form-group">
        <label htmlFor="surname">Apellidos</label>
        <input type="text" name="surname" defaultValue={auth.surname} />
      </div>

      <div className="config-form-group">
        <label htmlFor="birth_date">Fecha de Nacimiento</label>
        <input
          type="date"
          name="birth_date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>

      <div className="config-form-group">
        <label htmlFor="residence">Lugar de Residencia</label>
        <input
          type="text"
          name="residence"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="config-form-group full-width config-bio">
        <label htmlFor="bio">Biografía</label>
        <textarea name="bio" defaultValue={auth.bio} />
      </div>
      <div className="config-form-group">
        <label htmlFor="professions">Profesiones</label>
        <TagsInput
          tags={professions}
          setTags={setProfessions}
          placeholder="Añadir profesiones y presionar Enter"
        />
      </div>

      <div className="config-form-group">
        <label htmlFor="preferred_locations">Ubicaciones Preferidas</label>
        <TagsInput
          tags={preferredLocations}
          setTags={setPreferredLocations}
          placeholder="Añadir ubicaciones y presionar Enter"
        />
        <label htmlFor="distance_range">Rango de Distancia (km)</label>
        <input
          type="number"
          value={distanceRange}
          onChange={(e) => setDistanceRange(e.target.value)}
        />
      </div>

      <div className="config-form-group">
        <label htmlFor="work_preference">Preferencia de Trabajo</label>
        <select
          name="work_preference"
          value={workPreference}
          onChange={(e) => setWorkPreference(e.target.value)}
        >
          <option value="remote">Remoto</option>
          <option value="onsite">Presencial</option>
          <option value="hybrid">Híbrido</option>
        </select>
      </div>

      <div className="config-form-group">
        <label htmlFor="schedule_preference">Preferencia Horaria</label>
        <select
          name="schedule_preference"
          value={schedulePreference}
          onChange={(e) => setSchedulePreference(e.target.value)}
        >
          <option value="full-time">Tiempo Completo</option>
          <option value="part-time">Medio Tiempo</option>
          <option value="any">Cualquiera</option>
          <option value="custom">Personalizada</option>
        </select>
      </div>
      
      {schedulePreference === "custom" && (
        <div className="config-form-group">
          <label htmlFor="custom_hours">Horas Personalizadas</label>
          <input
            type="number"
            placeholder="Número de horas"
            value={customSchedule.hours_per_week}
            onChange={(e) =>
              setCustomSchedule({
                ...customSchedule,
                hours_per_week: e.target.value,
              })
            }
          />
          <textarea
            placeholder="Detalles del horario"
            value={customSchedule.details}
            onChange={(e) =>
              setCustomSchedule({
                ...customSchedule,
                details: e.target.value,
              })
            }
          />
        </div>
      )}

      <div className="config-form-group">
        <label htmlFor="experience_years">Años de Experiencia</label>
        <input
          type="number"
          name="experience_years"
          value={yearsExperience}
          onChange={(e) => setYearsExperience(e.target.value)}
        />
      </div>

      <div className="config-form-group">
        <label htmlFor="knowledge_areas">Áreas de Conocimiento</label>
        {Object.keys(knowledgeAreas).map((area, index) => (
          <div
            key={index}
            className="config-knowledge-area"
            style={{ display: "flex", alignItems: "center" }}
          >
            <input
              type="text"
              value={area}
              readOnly
              style={{ marginRight: "0.5rem" }}
            />
            <input
              type="number"
              value={knowledgeAreas[area]}
              min="1"
              max="5"
              onChange={(e) =>
                handleKnowledgeAreaChange(area, parseInt(e.target.value))
              }
              style={{ marginRight: "0.5rem" }}
            />
            <button
              type="button"
              onClick={() => removeKnowledgeArea(area)}
              className="config-btn" // Aplicar clase específica
            >
              Eliminar
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            const newArea = prompt("Ingrese el área de conocimiento:");
            if (newArea) handleKnowledgeAreaChange(newArea, 1);
          }}
          className="button" // Aplicar clase específica
        >
          Añadir Área de Conocimiento
        </button>
      </div>

      <div className="config-form-group">
        <label htmlFor="titles">Títulos</label>
        <ul>
          {titles.map((title, index) => (
            <li key={index}>
              {title}{" "}
              <button
                type="button"
                onClick={() => removeTitle(index)}
                className="config-btn" // Aplicar clase específica
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={addTitle}>
          Añadir Título
        </button>
      </div>

      <div className="config-form-group">
        <label htmlFor="courses">Cursos</label>
        <ul>
          {courses.map((course, index) => (
            <li key={index}>
              {course}{" "}
              <button
                type="button"
                onClick={() => removeCourse(index)}
                className="config-btn" // Aplicar clase específica
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={addCourse}>
          Añadir Curso
        </button>
      </div>

      <div className="config-form-group full-width">
        <label htmlFor="salary_range">Rango Salarial</label>
        <input
          type="number"
          placeholder="Mínimo"
          value={salaryRange.min}
          onChange={(e) =>
            setSalaryRange({ ...salaryRange, min: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Máximo"
          value={salaryRange.max}
          onChange={(e) =>
            setSalaryRange({ ...salaryRange, max: e.target.value })
          }
        />
      </div>
    </>
  );
};

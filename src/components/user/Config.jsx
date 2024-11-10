import React, { useState } from "react";
import useAuth from "../../hooks/useAuth.jsx";
import { Global } from "../../helpers/Global.jsx";
import avatar from "../../assets/img/user.png";
import { SerializeForm } from "../../helpers/SerializeForm.jsx";
import { TagsInput } from "../common/TagsInput.jsx"; // Importamos el componente TagsInput

export const Config = () => {
  const { auth, setAuth } = useAuth();
  const [saved, setSaved] = useState("not_saved");

  // Para manejar las etiquetas de sectores o profesiones
  const [sectors, setSectors] = useState(auth.sectors || []);
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

  const updateUserOrCompany = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    let newData = SerializeForm(e.target);

    if (auth.legal_id) {
      newData.sectors = sectors;
    } else {
      newData.professions = professions;
      newData.birth_date = birthDate;
      newData.location = location;
      newData.professional_info = {
        preferred_locations: preferredLocations,
        distance_range_km: distanceRange,
        work_preference: workPreference,
        experience_years: yearsExperience,
        knowledge_areas: knowledgeAreas,
        salary_range: [
          parseFloat(salaryRange.min),
          parseFloat(salaryRange.max),
        ],
        schedule_preference: schedulePreference,
        custom_schedule:
          schedulePreference === "custom" ? customSchedule : null,
        titles: titles,
        courses: courses,
      };
    }

    const file = newData.file0 instanceof File ? newData.file0 : null;
    if (file) delete newData.file0;

    const url = auth.legal_id
      ? `${Global.url}company/update`
      : `${Global.url}user/update`;
    console.log("url",url);
    const request = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(newData),
      headers: { "Content-Type": "application/json", Authorization: token },
    });

    const data = await request.json();
    if (data.status === "success" && data.user) {
      delete data.user.password;
      if (!data.user.image) data.user.image = "default.png";
      setAuth(data.user);
      setSaved("updated");
    } else {
      setSaved("error");
    }

    if (file) {
      const formData = new FormData();
      formData.append("file0", file);
      const uploadUrl = auth.legal_id
        ? `${Global.url}company/upload`
        : `${Global.url}user/upload`;
      const uploadRequest = await fetch(uploadUrl, {
        method: "POST",
        body: formData,
        headers: { Authorization: token },
      });
      const uploadData = await uploadRequest.json();
      if (uploadData.status === "success" && uploadData.user) {
        delete uploadData.password;
        setAuth(uploadData.user);
        setSaved("saved");
      } else {
        console.error("Error al subir la imagen:", uploadData);
        setSaved("error");
      }
    }
  };

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
      {saved === "updated" && (
        <strong className="config-alert config-alert-success">
          Datos cambiados correctamente!
        </strong>
      )}
      {saved === "error" && (
        <strong className="config-alert config-alert-error">
          Datos no se han cambiado correctamente
        </strong>
      )}

      <header className="config-content__header config-content__header--public">
        <h1 className="config-content__title">Ajustes</h1>
      </header>

      <div className="config-content__posts">
        <form className="config-form" onSubmit={updateUserOrCompany}>
          <div className="config-form-grid">
            {/* Campos comunes */}
            <div className="config-form-group">
              <label htmlFor="name">Nombre</label>
              <input type="text" name="name" defaultValue={auth.name} />
            </div>
            {auth.legal_id ? (
              <>
                {/* Campos específicos para empresas */}
                <div className="config-form-group">
                  <label htmlFor="legal_id">Identificación Legal</label>
                  <input
                    type="text"
                    name="legal_id"
                    defaultValue={auth.legal_id}
                    disabled
                  />
                </div>
                <div className="config-form-group">
                  <label htmlFor="sectors">Sectores</label>
                  <TagsInput
                    tags={sectors}
                    setTags={setSectors}
                    placeholder="Añadir sectores y presionar Enter"
                  />
                </div>
                <div className="config-form-group">
                  <label htmlFor="location">Ubicación</label>
                  <input
                    type="text"
                    name="location"
                    defaultValue={auth.location}
                  />
                </div>
                <div className="config-form-group">
                  <label htmlFor="website">Sitio Web</label>
                  <input
                    type="text"
                    name="website"
                    defaultValue={auth.website}
                  />
                </div>
                <div className="config-form-group">
                  <label htmlFor="description">Descripción</label>
                  <textarea
                    name="description"
                    defaultValue={auth.description}
                  />
                </div>
              </>
            ) : (
              <>
                {/* Campos específicos para usuarios */}
                <div className="config-form-group">
                  <label htmlFor="surname">Apellidos</label>
                  <input
                    type="text"
                    name="surname"
                    defaultValue={auth.surname}
                  />
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
                  <label htmlFor="preferred_locations">
                    Ubicaciones Preferidas
                  </label>
                  <TagsInput
                    tags={preferredLocations}
                    setTags={setPreferredLocations}
                    placeholder="Añadir ubicaciones y presionar Enter"
                  />
                  <label htmlFor="distance_range">
                    Rango de Distancia (km)
                  </label>
                  <input
                    type="number"
                    value={distanceRange}
                    onChange={(e) => setDistanceRange(e.target.value)}
                  />
                </div>
                <div className="config-form-group">
                  <label htmlFor="work_preference">
                    Preferencia de Trabajo
                  </label>
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
                  <label htmlFor="schedule_preference">
                    Preferencia Horaria
                  </label>
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
                          handleKnowledgeAreaChange(
                            area,
                            parseInt(e.target.value)
                          )
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
                      const newArea = prompt(
                        "Ingrese el área de conocimiento:"
                      );
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
            )}

            {/* Campos comunes */}
            <div className="config-form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input type="email" name="email" defaultValue={auth.email} />
            </div>
            <div className="config-form-group">
              <label htmlFor="password">Contraseña</label>
              <input type="password" name="password" />
            </div>
          </div>

          <div className="config-form-group">
            <label htmlFor="image" name="Seleccionar archivo">
              Avatar
            </label>
            <div className="config-general-info__container-avatar">
              {auth.image && auth.image !== "default.png" ? (
                <img
                  src={Global.url + "user/avatar/" + auth.image}
                  className="config-avatar-img"
                  alt="Usuario"
                />
              ) : (
                <img
                  src={avatar}
                  className="config-container-avatar__img"
                  alt="Foto de perfil"
                />
              )}
            </div>
            <input type="file" name="file0" id="file" />
          </div>
          <input
            type="submit"
            value="Actualizar"
            className="config-btn config-btn-success"
          />
        </form>
      </div>
    </>
  );
};

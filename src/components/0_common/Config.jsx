import React, { useState } from "react";
import { Global } from "../../helpers/Global.jsx";
import avatar from "../../assets/img/user.png";
import { SerializeForm } from "../../helpers/SerializeForm.jsx";
import { CompanyConfig } from "../1_company/CompanyConfig.jsx";
import { ProfessConfig } from "../2_professional/ProfessConfig.jsx";
import useAuth from "../../hooks/useAuth.jsx";

export const Config = () => {
  const { auth, setAuth } = useAuth();
  const [saved, setSaved] = useState("not_saved");
  
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
              < CompanyConfig />
            ) : (
              < ProfessConfig />
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
            className="config-btn config-"
          />
        </form>
      </div>
    </>
  );
};

import React, { useState } from "react";
import useAuth from "../../hooks/useAuth.jsx";
import { TagsInput } from "../0_common/TagsInput.jsx"; // Importamos el componente TagsInput

export const CompanyConfig = () => {
  const { auth, setAuth } = useAuth();
  const [sectors, setSectors] = useState(auth.sectors || []);

  return (
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
  )
}

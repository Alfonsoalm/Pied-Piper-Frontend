import React, { useState } from "react";
import { Global } from "../../helpers/Global.jsx"; // Asegúrate de que la URL esté bien configurada

export const OfferForm = ({ targetUser, companyId, onCancel }) => {
  // Estado local para los campos de la oferta
  const [offerData, setOfferData] = useState({
    title: "",
    description: "",
    location: "",
    salaryMin: 0,
    salaryMax: 0,
    workType: "onsite",
    contractType: "temporary",
    jobFunctions: "",
  });

  // Función para manejar los cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOfferData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función para enviar la oferta
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Preparar el payload de la oferta
    const offerPayload = {
      ...offerData,
      description: offerData.description.split("\n"), // Convertir descripción a array si es multilinea
      jobFunctions: offerData.jobFunctions.split(","), // Convertir funciones a array
      company: companyId,
      targetUser: targetUser._id,
    };

    try {
      // Enviar solicitud POST al backend
      const response = await fetch(`${Global.url}offer/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(offerPayload),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Oferta creada con éxito");
        onCancel(); // Cerrar el formulario de oferta
      } else {
        alert(`Error al crear la oferta: ${result.message}`);
      }
    } catch (error) {
      console.error("Error al enviar la oferta:", error);
      alert("Error al enviar la oferta");
    }
  };

  return (
    <div className="layout__aside">
      <h2>Crear Oferta</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título del puesto:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={offerData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción:</label>
          <textarea
            id="description"
            name="description"
            value={offerData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="location">Ubicación:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={offerData.location}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="salaryMin">Rango salarial mínimo:</label>
          <input
            type="number"
            id="salaryMin"
            name="salaryMin"
            value={offerData.salaryMin}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="salaryMax">Rango salarial máximo:</label>
          <input
            type="number"
            id="salaryMax"
            name="salaryMax"
            value={offerData.salaryMax}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="workType">Tipo de trabajo:</label>
          <select
            id="workType"
            name="workType"
            value={offerData.workType}
            onChange={handleInputChange}
          >
            <option value="onsite">Presencial</option>
            <option value="remote">Remoto</option>
            <option value="hybrid">Híbrido</option>
            <option value="custom">Personalizado</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="contractType">Tipo de contrato:</label>
          <select
            id="contractType"
            name="contractType"
            value={offerData.contractType}
            onChange={handleInputChange}
          >
            <option value="temporary">Temporal</option>
            <option value="permanent">Fijo</option>
            <option value="rotational">Rotativo</option>
            <option value="internship">Prácticas</option>
            <option value="other">Otro</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="jobFunctions">Funciones del trabajo:</label>
          <input
            type="text"
            id="jobFunctions"
            name="jobFunctions"
            value={offerData.jobFunctions}
            onChange={handleInputChange}
            placeholder="Separar con comas"
          />
        </div>

        <div className="form-buttons">
          <button type="submit">Enviar Oferta</button>
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

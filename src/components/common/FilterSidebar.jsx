// OfferForm.jsx
import React, { useState } from "react";
import { Global } from "../../helpers/Global.jsx";

export const OfferForm = ({ targetUser, companyId, onCancel }) => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOfferData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const offerPayload = {
      ...offerData,
      description: offerData.description.split("\n"),
      jobFunctions: offerData.jobFunctions.split(","),
      company: companyId,
      targetUser: targetUser._id,
    };

    try {
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
        onCancel();
      } else {
        alert(`Error al crear la oferta: ${result.message}`);
      }
    } catch (error) {
      console.error("Error al enviar la oferta:", error);
      alert("Error al enviar la oferta");
    }
  };

  return (
    <aside className="layout__aside"> {/* Aquí agregamos la clase para que coincida */}
      <h2>Crear Oferta</h2>
      <form onSubmit={handleSubmit}>
        {/* Formulario similar a lo mostrado anteriormente */}
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

        {/* Resto de los campos del formulario */}

        <div className="form-buttons">
          <button type="submit">Enviar Oferta</button>
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </aside>
  );
};

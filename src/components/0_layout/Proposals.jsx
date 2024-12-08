import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";

export const Proposals = () => {
  const { auth } = useAuth(); // Obtener el usuario autenticado
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(`${Global.url}offer/user/${auth._id}`);
        const data = await response.json();

        if (data.status === "success") {
          setOffers(data.offers);
        } else {
          console.error("Error al obtener las ofertas");
        }
      } catch (error) {
        console.error("Error de red:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [auth._id]);

  // Función para actualizar el estado de una oferta
  const updateOfferStatus = async (offerId, status) => {
    try {
      const response = await fetch(`${Global.url}offer/status/${offerId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (data.status === "success") {
        // Actualizar la lista de ofertas en el estado
        setOffers((prevOffers) =>
          prevOffers.map((offer) =>
            offer._id === offerId ? { ...offer, status } : offer
          )
        );
        alert("Estado de la oferta actualizado a: " + status);
      } else {
        console.error("Error al actualizar el estado:", data.message);
        alert("Error al actualizar el estado de la oferta: " + data.message);
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("Hubo un problema al actualizar la oferta.");
    }
  };

  if (loading) {
    return <div>Cargando ofertas...</div>;
  }

  if (offers.length === 0) {
    return <div>No tienes ofertas en este momento.</div>;
  }

  return (
    <div>
      <h1>Mis Ofertas</h1>
      <div className="offers-container">
        {offers.map((offer) => (
          <div key={offer._id} className="offer-card">
            <h2>{offer.title}</h2>
            <p className="offer-description">{offer.description.join(", ")}</p>

            {/* Tabla de condiciones laborales */}
            <table className="offer-conditions">
            <caption className="table-title">Condiciones Laborales</caption>
              <tbody>
                <tr>
                  <td><strong>Tipo de contrato:</strong></td>
                  <td>{offer.contractType || "No especificado"}</td>
                </tr>
                <tr>
                  <td><strong>Tipo de trabajo:</strong></td>
                  <td>{offer.workType || "No especificado"}</td>
                </tr>
                <tr>
                  <td><strong>Turno:</strong></td>
                  <td>
                  {offer.schedule && offer.schedule.min !== undefined && offer.schedule.max !== undefined
                    ? `${offer.schedule.min} - ${offer.schedule.max}`
                    : "No especificado"}
                  </td>
                </tr>
                <tr>
                  <td><strong>Ubicación:</strong></td>
                  <td>{offer.location || "No especificado"}</td>
                </tr>
                <tr>
                <td><strong>Rango salarial:</strong></td>
                <td>
                    {offer.salaryRange && typeof offer.salaryRange === "object"
                    ? `${offer.salaryRange.min || 0} - ${offer.salaryRange.max || 0} ${offer.salaryRange.currency || "$"}`
                    : "No especificado"}
                </td>
                </tr>
              </tbody>
            </table>

            {/* Aviso de tiempo límite */}
            <p className="offer-time-limit">
              <strong>Tiempo restante:</strong> {offer.timeLimit} días
            </p>

            {/* Botones */}
            <div className="offer-buttons">
              <button
                className="offer-btn accept-btn"
                onClick={() => updateOfferStatus(offer._id, "accepted")}
              >
                Aceptar
              </button>
              <button
                className="offer-btn reject-btn"
                onClick={() => updateOfferStatus(offer._id, "rejected")}
              >
                Rechazar
              </button>
              <button
                className="offer-btn counteroffer-btn"
                onClick={() =>
                  alert("Funcionalidad de negociar (contraoferta) en desarrollo")
                }
              >
                Negociar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

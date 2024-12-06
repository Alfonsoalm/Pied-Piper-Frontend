import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Global } from "../../helpers/Global.jsx";
import avatar from "../../assets/img/user.png";

export const CompanyProfile = () => {
  const [company, setCompany] = useState(null);
  const params = useParams();

  useEffect(() => {
    getDataCompany();
  }, [params]);

  const getDataCompany = async () => {
    try {
      const response = await fetch(`${Global.url}company/profile/${params.userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (response.ok && data.status === "success") {
        setCompany(data.user);
      } else {
        console.error("No se encontró el perfil de la empresa.");
        setCompany(null);
      }
    } catch (error) {
      console.error("Error al obtener el perfil de la empresa:", error);
      setCompany(null);
    }
  };

  if (!company) {
    return <p>No se encontró el perfil de la empresa.</p>;
  }

  return (
    <div className="profile-container">
      {/* SECCIÓN PRINCIPAL */}
      <div className="profile-header">
        <div className="background-banner"></div>
        <div className="avatar-container">
          {company.image && company.image !== "default.png" ? (
            <img
              src={Global.url + "user/avatar/" + company.image}
              className="profile-avatar"
              alt="Foto de perfil"
            />
          ) : (
            <img
              src={avatar}
              className="profile-avatar"
              alt="Foto de perfil"
            />
          )}
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{company.name || "N/A"}</h1>
          <p className="profile-sectors">
            {company.sectors?.join(", ") || "Sin sectores registrados"}
          </p>
          <p className="profile-location">{company.location || "Ubicación no especificada"}</p>
        </div>
      </div>

      {/* SECCIÓN DE DETALLES */}
      <div className="profile-details-section">
        <h2>Información de la Empresa</h2>
        <p><strong>Sitio Web:</strong>{" "}
          {company.website ? (
            <a href={company.website} target="_blank" rel="noopener noreferrer">
              {company.website}
            </a>
          ) : (
            "N/A"
          )}
        </p>
        <p><strong>Descripción:</strong> {company.description || "N/A"}</p>
      </div>
    </div>
  );
};

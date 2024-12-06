
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
    <div className="profile-info__company">
      <h2>Información de la Empresa</h2>
      <div className="general-info__container-avatar">
        {company.image && company.image !== "default.png" ? (
            <img
            src={Global.url + "user/avatar/" + company.image}
            className="container-avatar__img"
            alt="Foto de perfil"
            />
        ) : (
            <img
            src={avatar}
            className="container-avatar__img"
            alt="Foto de perfil"
            />
        )}
      </div>
      <p><strong>Sectores:</strong> {company.sectors?.join(", ") || "N/A"}</p>
      <p><strong>Ubicación:</strong> {company.location || "N/A"}</p>
      <p><strong>Sitio Web:</strong> {company.website || "N/A"}</p>
      <p><strong>Descripción:</strong> {company.description || "N/A"}</p>
    </div>
  );
};

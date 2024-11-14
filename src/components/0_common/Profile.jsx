import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx";

export const Profile = () => {
  const { auth } = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Determinar si el perfil es de una empresa o de un profesional
    const isCompany = auth.legal_id || JSON.parse(localStorage.getItem("user"))?.legal_id;

    // Redirigir según el tipo de usuario
    if (isCompany) {
      navigate(`/social/perfil/empresa/${params.userId}`);
    } else {
      navigate(`/social/perfil/profesional/${params.userId}`);
    }
  }, [auth, params, navigate]);

  // Renderizar un header opcional u otra lógica de espera mientras se redirige
  return (
    <div>
      {/* Aquí puedes añadir cualquier encabezado, loader u otros elementos comunes */}
      <p>Redirigiendo al perfil correspondiente...</p>
    </div>
  );
};

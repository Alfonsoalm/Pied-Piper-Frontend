import React, { useState } from "react";
import { Global } from "../../helpers/Global.jsx";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage(""); // Limpiar mensajes previos
    try {
      // Intentar recuperación para 'user'
      const userResponse = await fetch(Global.url + "user/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const userData = await userResponse.json();
  
      // Intentar recuperación para 'company'
      const companyResponse = await fetch(Global.url + "company/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const companyData = await companyResponse.json();
  
      // Manejar resultados de las peticiones
      if (userData.status === "success" || companyData.status === "success") {
        setMessage(
          "Se ha enviado un enlace de recuperación a su correo electrónico."
        );
      } else {
        setMessage("No se encontró una cuenta con ese correo electrónico.");
      }
    } catch (error) {
      console.error("Error enviando correo de recuperación:", error);
      setMessage("Hubo un error al procesar la solicitud. Inténtelo de nuevo.");
    }
  };

  return (
    <div className="forgot-password-content">
      <h2>Recuperar Contraseña</h2>
      {message && <p>{message}</p>}
      {!message && (
        <form onSubmit={handleForgotPassword}>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Enviar Enlace de Recuperación</button>
        </form>
      )}
    </div>
  );
};

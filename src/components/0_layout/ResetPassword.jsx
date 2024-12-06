import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Global } from "../../helpers/Global.jsx";

export const ResetPassword = () => {
  const { token } = useParams(); // Token enviado en el enlace de recuperación
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch(Global.url + "user/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === "success") {
        setMessage("Contraseña actualizada con éxito. Redirigiendo...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage("El enlace de recuperación no es válido o ha expirado.");
      }
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      setMessage("Hubo un error al procesar la solicitud. Inténtelo de nuevo.");
    }
  };

  return (
    <div className="reset-password-content">
      <h2>Establecer Nueva Contraseña</h2>
      {message && <p>{message}</p>}
      {!message && (
        <form onSubmit={handleResetPassword}>
          <div className="form-group">
            <label htmlFor="password">Nueva Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Actualizar Contraseña</button>
        </form>
      )}
    </div>
  );
};

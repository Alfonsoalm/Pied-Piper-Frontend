import React from "react";

const VerifiedSuccess = () => {
  return (
    <div className="verified-success">
      <h1>¡Correo verificado con éxito!</h1>
      <p>Tu cuenta ha sido verificada. Ahora puedes iniciar sesión.</p>
      <a href="/login" className="btn">Ir a Iniciar Sesión</a>
    </div>
  );
};

export default VerifiedSuccess;

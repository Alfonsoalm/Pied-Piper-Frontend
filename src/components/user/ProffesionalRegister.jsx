// ProffesionalRegister.jsx
import React, { useState } from "react";
import { useForm } from "../../hooks/useForm.jsx";
import { Global } from "../../helpers/Global.jsx";
import "../../assets/css/FormRegister.css"; // Importa el CSS para estilos

export const ProffesionalRegister = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");

  const saveUser = async (e) => {
    e.preventDefault(); 
    let newUser = form;
    const request = await fetch(Global.url + "user/register", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await request.json();
    setSaved(data.status === "success" ? "saved" : "error");
  }

  return (
    <div className="register-container">
      <div className="register-form">

        <h1>Registro para Profesional</h1>
        {saved === "saved" && <div className="alert alert-success">Usuario registrado correctamente!</div>}
        {saved === "error" && <div className="alert alert-error">Error al registrar usuario</div>}

        <form onSubmit={saveUser}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Apellidos</label>
            <input type="text" name="surname" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="nick">Nick</label>
            <input type="text" name="nick" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input type="email" name="email" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" onChange={changed} />
          </div>
          <button type="submit" className="btn-success">Registrate</button>
        </form>
        
      </div>
    </div>
  );
};

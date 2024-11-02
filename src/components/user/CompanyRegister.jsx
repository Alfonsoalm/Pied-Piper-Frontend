// CompanyRegister.jsx
import React, { useState } from "react";
import { useForm } from "../../hooks/useForm.jsx";
import { Global } from "../../helpers/Global.jsx";
import "../../assets/css/Register.css"; // Importa el CSS para estilos

export const CompanyRegister = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");

  const saveCompany = async (e) => {
    e.preventDefault();
    const newCompany = form;
    const request = await fetch(Global.url + "company/register", {
      method: "POST",
      body: JSON.stringify(newCompany),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await request.json();
    setSaved(data.status === "success" ? "saved" : "error");
  };

  return (
    <div className="register-container">
      <div className="register-form">

        <h1>Registro para Empresas</h1>
        {saved === "saved" && <div className="alert alert-success">Empresa registrada correctamente!</div>}
        {saved === "error" && <div className="alert alert-error">Error al registrar empresa</div>}

        <form onSubmit={saveCompany}>
          <div className="form-group">
            <label htmlFor="name">Nombre de la Empresa</label>
            <input type="text" name="name" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="legalId">Identificación Legal</label>
            <input type="text" name="legalId" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input type="email" name="email" onChange={changed} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" onChange={changed} />
          </div>
          <button type="submit" className="btn-success">Registrar Empresa</button>
        </form>
      </div>
    </div>
  );
};

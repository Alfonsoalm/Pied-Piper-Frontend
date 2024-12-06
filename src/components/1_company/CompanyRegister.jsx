import React, { useState } from "react";
import { useForm } from "../../hooks/useForm.jsx";
import { Global } from "../../helpers/Global.jsx";
import { TagsInput } from "../0_common/TagsInput.jsx";
import { sectors_list } from "../1_company/sectors.js"; // Ajusta la ruta según la ubicación de `sectors.js`

export const CompanyRegister = () => {
  const { form, changed } = useForm({});
  const [sectors, setSectors] = useState([]);
  const [saved, setSaved] = useState("not_sended");
  const [passwords, setPasswords] = useState({ password: '', repeatPassword: '' });
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const saveCompany = async (e) => {
    e.preventDefault();
    if (passwords.password !== passwords.repeatPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    }

    const newCompany = { ...form, sectors, password: passwords.password };
    const request = await fetch(Global.url + "company/register", {
      method: "POST",
      body: JSON.stringify(newCompany),
      headers: { "Content-Type": "application/json" },
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
          <div className="register-form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" onChange={changed} />
          </div>
          <div className="register-form-group">
            <label htmlFor="legal_id">Número de Identificación</label>
            <input type="text" name="legal_id" onChange={changed} />
          </div>
          <div className="register-form-group">
            <label htmlFor="location">Localización</label>
            <input type="text" name="location" onChange={changed} />
          </div>
          <div className="register-form-group">
            <label htmlFor="sectors">Sectores</label>
            <TagsInput
              tags={sectors}
              setTags={setSectors}
              placeholder="Seleccionar sectores"
              suggestions={sectors_list}
            />
          </div>
          <div className="register-form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input type="email" name="email" onChange={changed} />
          </div>
          <div className="register-form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" onChange={handlePasswordChange} />
          </div>
          <div className="register-form-group">
            <label htmlFor="repeatPassword">Repetir Contraseña</label>
            <input type="password" name="repeatPassword" onChange={handlePasswordChange} />
          </div>
          {passwordError && <div className="alert alert-error">{passwordError}</div>}
          <button type="submit" className="register-form-btn">Registrarse</button>
        </form>
      </div>
    </div>
  );
};
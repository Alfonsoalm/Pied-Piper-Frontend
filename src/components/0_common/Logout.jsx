import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth.jsx';

export const Logout = () => {

    const {setAuth, setCounters} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        //Vaciar el localStorage
        localStorage.clear();
        //Setear estado global a vacio
        setAuth({});
        setCounters({});
        //Redireccion al login
        navigate("/login");
    })

  return (
    <h1>Cerrando sesion...</h1>
  )
}

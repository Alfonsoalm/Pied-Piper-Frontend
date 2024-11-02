
import React, { createContext, useState, useEffect } from 'react';
import { Global } from '../helpers/Global.jsx';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});
    const [counters, setCounters] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        authUser();
    }, []);

    const authUser = async () => {
        try {
            // Obtener token y datos del usuario desde el localStorage
            const token = localStorage.getItem("token");
            const user = localStorage.getItem("user");

            // Verificar que ambos existan
            if (!token || !user) {
                setLoading(false);
                return;
            }
 
            const userObj = JSON.parse(user);
            const userId = userObj.id;

            // Solicitud para obtener el perfil del usuario
            const profileResponse = await fetch(Global.url + "user/profile/" + userId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });

            // Verificar que la solicitud fue exitosa
            if (!profileResponse.ok) {
                console.error("Error al obtener el perfil:", profileResponse.status);
                setLoading(false);
                return;
            }

            const profileData = await profileResponse.json();

            // Solicitud para obtener los contadores del usuario
            const countersResponse = await fetch(Global.url + "user/counters/" + userId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                }
            });

            if (!countersResponse.ok) {
                console.error("Error al obtener los contadores:", countersResponse.status);
                setLoading(false);
                return;
            }

            const countersData = await countersResponse.json();

            // Establecer estado de autenticación y contadores
            setAuth(profileData.user || {});
            setCounters(countersData || {});
        } catch (error) {
            console.error("Error en authUser:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                counters,
                setCounters,
                loading
            }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;


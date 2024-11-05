import React, { createContext, useState, useEffect } from 'react';
import { Global } from '../helpers/Global.jsx';

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [counters, setCounters] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        authUser();  // Llamar a la función de autenticación cuando el componente se monta
    }, []);

    const authUser = async () => {
        try {
            // Obtener token y usuario desde localStorage
            const token = localStorage.getItem("token");
            const user = localStorage.getItem("user");
    
            // Verificar si no existe el token o usuario en localStorage
            if (!token || !user) {
                console.log("No hay token o usuario en el localStorage");
                setLoading(false);
                return;
            }
    
            // Parsear el usuario desde el localStorage
            const userObj = JSON.parse(user);
            const userId = userObj.id;

            const isCompany = userObj.isCompany || false;  // Asegurarse de tener la propiedad isCompany
    
            // Definir las URLs dinámicas dependiendo de si es empresa o usuario
            let profileUrl = isCompany ? "company/profile/" : "user/profile/";
            let countersUrl = isCompany ? "company/counters/" : "user/counters/";
    
            // Solicitar perfil del usuario/empresa
            const profileResponse = await fetch(Global.url + profileUrl + userId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,  // Enviar el token en los headers
                },
            });
    
            // Verificar que la respuesta sea exitosa
            if (!profileResponse.ok) {
                console.error("Error al obtener el perfil:", profileResponse.status);
                setLoading(false);
                return;
            }
    
            // Obtener el texto de la respuesta
            const profileText = await profileResponse.text();
            console.log("Profile response text:", profileText);  // Log para verificar el texto
    
            // Intentar parsear el JSON del perfil
            let profileData;
            try {
                profileData = JSON.parse(profileText);  // Parsear la respuesta si es JSON válido
            } catch (error) {
                console.error("Error al parsear el perfil como JSON:", profileText);
                setLoading(false);
                return;
            }
    
            // Solicitar contadores (followers, following, etc.)
            const countersResponse = await fetch(Global.url + countersUrl + userId, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,  // Enviar el token en los headers
                },
            });
    
            // Verificar que la respuesta de los contadores sea exitosa
            if (!countersResponse.ok) {
                console.error("Error al obtener los contadores:", countersResponse.status);
                setLoading(false);
                return;
            }
    
            // Obtener el texto de la respuesta de contadores
            const countersText = await countersResponse.text();
            console.log("Counters response text:", countersText);  // Log para verificar el texto
    
            // Intentar parsear el JSON de los contadores
            let countersData;
            try {
                countersData = JSON.parse(countersText);  // Parsear la respuesta si es JSON válido
            } catch (error) {
                console.error("Error al parsear los contadores como JSON:", countersText);
                setLoading(false);
                return;
            }
    
            // Actualizar el estado de autenticación y contadores
            console.log("profileData.user:", profileData.user);
            setAuth(profileData.user || {});  // Actualizar el estado con los datos del perfil
            setCounters(countersData || {});  // Actualizar el estado con los datos de contadores
        } catch (error) {
            console.error("Error en authUser:", error);  // Manejar cualquier otro error
        } finally {
            setLoading(false);  // Asegurarse de que loading se detenga
        }
    };
    

    return (
        <AuthContext.Provider value={{ auth, setAuth, counters, setCounters, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Exportar el contexto para usarlo en otros componentes
export default AuthContext;

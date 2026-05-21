import { createContext, useContext, useState} from "react"
const AuthConext = createContext();

export function ProveedorDeAuth({ children }){
    const [ usuario, setUsuario ] = useState(() => {
        const guardado = localStorage.getItem('usuario');
        return guardado ? JSON.parse(guardado) : null;
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') || null;
    });

    const login = (datos) => {
        setUsuario(datos.usuario);
        setToken(datos.token);
        localStorage.setItem('usuario', JSON.stringify(datos.usuario));
        localStorage.setItem('token', datos.token)
    };
    const logout = () => {
        setUsuario(null);
        setToken(null);
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
    };

    return (
        <AuthConext.Provider value={{usuario, token, login, logout}}>
            {children}
        </AuthConext.Provider>
    );
}

export const useAuth = () => useContext(AuthConext);
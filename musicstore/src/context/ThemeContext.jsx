import { createContext, useContext, useState, useEffect } from "react";

const TemaContext = createContext();

export function ProovedorDeTema({ children }){
    const [darkMode, setDarkMode] = useState(() =>{
        return localStorage.getItem("theme") === "dark";
    })

    useEffect(() =>{
        document.body.classList.toggle("dark", darkMode);
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    const toggleTema = () => setDarkMode(prev => !prev)
    return(
        <TemaContext.Provider value = {{darkMode, toggleTema}}>
            {children}
        </TemaContext.Provider>
    )
}
export const useTema = () => useContext(TemaContext);
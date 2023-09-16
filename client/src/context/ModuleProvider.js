import { createContext, useState } from "react";

const ModuleContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [modules, setModules] = useState({});
    // semester1 semester2 currentSemester currentId
    return (
        <ModuleContext.Provider value={{ modules, setModules }}>
            {children}
        </ModuleContext.Provider>
    )
}

export default AuthContext;
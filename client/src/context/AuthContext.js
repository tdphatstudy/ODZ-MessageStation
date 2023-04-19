import { createContext, useState} from "react";



const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [AuthState, setAuthState] = useState(null);
    
    const setAuth = (data) => {
        setAuthState(data);
    }
    const value = {AuthState, setAuth}
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider};
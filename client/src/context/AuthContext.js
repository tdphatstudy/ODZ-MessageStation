import { createContext, useState} from "react";


let INIT_VALUE = null;
if (localStorage.getItem('user') === 'null' || localStorage.getItem('user') === null) {
    console.log('hello')
    INIT_VALUE = null;
  } else {
    console.log('hello1')
    console.log(JSON.parse(localStorage.getItem('user')))
    INIT_VALUE = JSON.parse(localStorage.getItem('user'));
}
const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [AuthState, setAuthState] = useState(INIT_VALUE);
    
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
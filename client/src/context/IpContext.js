import { createContext, useState} from "react";


let INIT_VALUE = 'localhost';

const IpContext = createContext();
const IpProvider = ({children}) => {
    const [IP, setIP] = useState(INIT_VALUE);
    const value = {IP, setIP}
    return (
        <IpContext.Provider value={value}>
            {children}
        </IpContext.Provider>
    )
}

export {IpContext, IpProvider};
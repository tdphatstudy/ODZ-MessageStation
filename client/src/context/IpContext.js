import { createContext, useState} from "react";


let INIT_VALUE = '192.168.1.8';

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
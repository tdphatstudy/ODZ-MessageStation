import "../../assets/css/page/profile/profile.css"
import NavarBar from "../../component/navar-bar/NavarBar.jsx";
import QuickMenu from "../../component/quick-menu/QuickMenu.jsx";
import HomePanel from "../../component/display-panel/home-panel/HomePanel.jsx";
import PersonalPanel from "../../component/display-panel/personal-panel/PersonalPanel";
import ContactPanel from "../../component/display-panel/contact-panel/ContactPanel";
import { useState } from "react";
import { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Toast from "../../component/toast/Toast";


const Profile = () => {
    const [display, setDisplay] = useState('home');
    const handleSetShownPanel = (namePanel)  => {
        setDisplay(namePanel)
    }
    const [message, setMessage] = useState({
        success: null,
        message: null 
     });
    return (
        <div className="wrapper-profile">
            <NavarBar />
            <div className="body-profile">
                <QuickMenu callback={handleSetShownPanel} setMessage={setMessage} />
                {display === 'home' && <HomePanel />}
                {display === 'personal' && <PersonalPanel setMessage={setMessage} />}
                {display === 'contact' && <ContactPanel />}
                
            </div>
        {message.success!=null && <Toast title={message.success} content={message.message} callback={setMessage}/>}
            
        </div>
    )
}
export default Profile;
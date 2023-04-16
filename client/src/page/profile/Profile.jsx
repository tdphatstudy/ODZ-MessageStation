import "../../assets/css/page/profile/profile.css"
import NavarBar from "../../component/navar-bar/NavarBar.jsx";
import QuickMenu from "../../component/quick-menu/QuickMenu.jsx";
import HomePanel from "../../component/display-panel/home-panel/HomePanel.jsx";
import PersonalPanel from "../../component/display-panel/personal-panel/PersonalPanel";
import ContactPanel from "../../component/display-panel/contact-panel/ContactPanel";
import { useState } from "react";


const Profile = () => {
    const [display, setDisplay] = useState('home');
    const handleSetShownPanel = (namePanel)  => {
        setDisplay(namePanel)
    }
    return (
        <div className="wrapper-profile">
            <NavarBar />
            <div className="body-profile">
                <QuickMenu callback={handleSetShownPanel} />
                {display === 'home' && <HomePanel />}
                {display === 'personal' && <PersonalPanel />}
                {display === 'contact' && <ContactPanel />}
                
            </div>
            
        </div>
    )
}
export default Profile;
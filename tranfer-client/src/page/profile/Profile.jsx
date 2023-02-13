import "../../assets/css/page/profile/profile.css"
import NavarBar from "../../component/navar-bar/NavarBar.jsx";
import QuickMenu from "../../component/quick-menu/QuickMenu.jsx";
import DisplayPanel from "../../component/display-panel/DisplayPanel";


const Profile = () => {
    return (
        <div className="wrapper-profile">
            <NavarBar />
            <div className="body-profile">
                <QuickMenu />
                <DisplayPanel />
            </div>
            
        </div>
    )
}
export default Profile;
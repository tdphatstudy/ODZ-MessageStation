import "../../assets/css/page/profile/profile.css"
import NavarBar from "../../component/navar-bar/NavarBar.jsx";
import QuickMenu from "../../component/quick-menu/QuickMenu.jsx";
import HomePanel from "../../component/display-panel/home-panel/HomePanel.jsx";


const Profile = () => {
    return (
        <div className="wrapper-profile">
            <NavarBar />
            <div className="body-profile">
                <QuickMenu />
                <HomePanel />
            </div>
            
        </div>
    )
}
export default Profile;
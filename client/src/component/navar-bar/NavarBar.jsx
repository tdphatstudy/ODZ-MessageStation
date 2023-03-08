import "../../assets/css/component/navar-bar/navarbar.css";
var ChangeModeIcon = require("../../assets/icon/change_24px_light.png");
var UserTestData = require("../../text-data/user.png");


const NavarBar = () => {
    return (
        
        <div>
            <div className="wrapper-navar-bar">
            <div className="logo-navar-bar" >ODZ MessageStation</div>
            <input input="search" placeholder="Search..." className="search-bar" />
            <div className="menu-wrapper-navar-bar">
                <div className="change-mode"><img src={ChangeModeIcon} className="change-mode-icon"/></div>
                <div className="profile-menu"></div>
                <div className="search-icon-navar-bar"></div>
                <div className="menu-icon-navar-bar" data-tip="Profile Menu" data-for="navar-bar-tooltip" ></div>
            </div>
        </div>

        </div>
    );
}

export default NavarBar;
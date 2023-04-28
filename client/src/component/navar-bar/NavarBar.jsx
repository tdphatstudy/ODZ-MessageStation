import { useContext, useRef, useEffect } from "react";
import "../../assets/css/component/navar-bar/navarbar.css";
import {IpContext } from '../../context/IpContext';
import { AuthContext } from "../../context/AuthContext";
var ChangeModeIcon = require("../../assets/icon/change_24px_light.png");



const NavarBar = () => {
    const authState = useContext(AuthContext);
    const ipContext = useContext(IpContext)
    const avatarNavarBar = useRef(null)
    useEffect(() => {
        avatarNavarBar.current.style.backgroundImage = `url(http://${ipContext.IP}:3001/${authState.AuthState.username}/${authState.AuthState.avatar})`;
    }, [])
    return (
        <div>
            <div className="wrapper-navar-bar">
            <div className="logo-navar-bar" >ODZ MessageStation</div>
            <input input="search" placeholder="Search..." className="search-bar" />
            <div className="menu-wrapper-navar-bar">
                <div className="change-mode"><img src={ChangeModeIcon} className="change-mode-icon"/></div>
                <div className="profile-menu" ref={avatarNavarBar}></div>
                <div className="search-icon-navar-bar"></div>
                <div className="menu-icon-navar-bar" data-tip="Profile Menu" data-for="navar-bar-tooltip" ></div>
            </div>
        </div>

        </div>
    );
}

export default NavarBar;
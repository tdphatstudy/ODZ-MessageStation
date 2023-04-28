import "../../assets/css/component/quick-menu/quickmenu.css";
import { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import {IpContext } from '../../context/IpContext.js';


const QuickMenu = ({callback, setMessage}) => {
    const authState = useContext(AuthContext);
    const ipContext = useContext(IpContext);
    const avatarQuickMenu = useRef(null);
    useEffect(() => {
        avatarQuickMenu.current.style.backgroundImage = `url(http://${ipContext.IP}:3001/${authState.AuthState.username}/${authState.AuthState.avatar})`;
    }, [])
    return (
        <div className="quick-menu-wrapper-profile">
            <div className="avatar-quick-menu-wrapper">
                <div className="avatar-quick-menu" ref={avatarQuickMenu}></div>
                <div className="name-quick-menu">{authState.AuthState.fullname}</div>
                <div className="user-id-quick-menu">@{authState.AuthState.username}</div>
            </div>
            <div className="status-quick-menu-wrapper-profile">
                <div className="title-status-quick-menu-profile">Trạng thái</div>
                <div className="status-quick-menu-profile">{authState.AuthState.online_status}</div>
            </div>
            <div className="menu-quick-menu-profile" >
                <div className="option-quick-menu-profile" onClick={(e) => {callback('home')} }>
                    <div className="home-option-icon-quick-menu-profile"></div>
                    Trang chủ
                </div>
                <div className="option-quick-menu-profile" onClick={(e) => {callback('personal')} }>
                    <div className="personal-option-icon-quick-menu-profile"></div>
                    Thông tin cá nhân
                </div>
                <div className="option-quick-menu-profile" onClick={(e) => {callback('contact')} }>
                    <div className="contact-option-icon-quick-menu-profile"></div>
                        Liên hệ
                </div>
                <div className="option-quick-menu-profile" onClick={(e) => {setMessage({success: 'Fail!', message: 'Tính năng mới chưa được ra mắt. Chúng tôi sẽ có gắn hoàn thành sớm nhất có thể.'})}}>
                    <div className="relationship-option-icon-quick-menu-profile"></div>
                    Bạn bè và nhóm
                </div>
                <div className="option-quick-menu-profile" onClick={(e) => {setMessage({success: 'Fail!', message: 'Tính năng mới chưa được ra mắt. Chúng tôi sẽ có gắn hoàn thành sớm nhất có thể.'})}}>
                    <div className="dark-mode-option-icon-quick-menu-profile"></div>
                        Dark mode: OFF
                </div>
                <div className="option-quick-menu-profile" onClick={(e) => {setMessage({success: 'Fail!', message: 'Tính năng mới chưa được ra mắt. Chúng tôi sẽ có gắn hoàn thành sớm nhất có thể.'})}}>
                    <div className="setting-option-icon-quick-menu-profile"></div>
                    Cài đặt hệ thống
                </div>
            </div>
        </div>
    );
}
export default QuickMenu;
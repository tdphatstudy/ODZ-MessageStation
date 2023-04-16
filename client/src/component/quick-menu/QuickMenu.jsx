import "../../assets/css/component/quick-menu/quickmenu.css";
const QuickMenu = ({callback}) => {
    return (
        <div className="quick-menu-wrapper-profile">
            <div className="avatar-quick-menu-wrapper">
                <div className="avatar-quick-menu"></div>
                <div className="name-quick-menu">Trần Đại Phát</div>
                <div className="user-id-quick-menu">@tdphat</div>
            </div>
            <div className="status-quick-menu-wrapper-profile">
                <div className="title-status-quick-menu-profile">Trạng thái</div>
                <div className="status-quick-menu-profile">Trực tuyến</div>
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
                <div className="option-quick-menu-profile">
                    <div className="relationship-option-icon-quick-menu-profile"></div>
                    Bạn bè và nhóm
                </div>
                <div className="option-quick-menu-profile">
                    <div className="dark-mode-option-icon-quick-menu-profile"></div>
                        Dark mode: OFF
                </div>
                <div className="option-quick-menu-profile">
                    <div className="setting-option-icon-quick-menu-profile"></div>
                    Cài đặt hệ thống
                </div>
            </div>
        </div>
    );
}
export default QuickMenu;
import "../../../assets/css/component/display-panel/personal-panel/personalpanel.css";
import ProfileNode from "../../profile-node/ProfileNode";

const PersonalPanel = () => {
    return (
        <div className="personal-panel-wrapper">
            <div className="personal-panel-avatar-wrapper">
                <div className="personal-panel-avatar-image"></div>
                <div className="personal-panel-avatar-upload">Upload</div>
                <div className="personal-panel-avatar-theme">Theme</div>
                <div className="personal-panel-avatar-online-search">Tìm kiếm</div>
            </div>
            <ProfileNode />
            <ProfileNode />
            <ProfileNode />
            <ProfileNode />
            <ProfileNode />
            
            
        </div>
    );
}
export default PersonalPanel;
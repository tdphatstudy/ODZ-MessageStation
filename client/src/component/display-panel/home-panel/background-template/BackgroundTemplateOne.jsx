import "../../../../assets/css/component/display-panel/home-panel/backgroundtemplate1.css";
import { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import DateHelper from "../../../../helper/DateHelper";

const BackgroundTemplateOne = () => {
    const authState = useContext(AuthContext);
    const avatarHomePanel = useRef(null);
    useEffect(() => {
        avatarHomePanel.current.style.backgroundImage = `url(http://localhost:3001/${authState.AuthState.username}/${authState.AuthState.avatar})`;
    }, [])
    return (
        <div className="background-template-1-wrapper">
            <div className="image-background-template-1" ref={avatarHomePanel}></div>
            <div className="info-background-template-1">
                <div className="hello-background-template-1">HELLO EVERYBODY, I AM</div>
                <div className="name-background-template-1">{authState.AuthState.fullname}</div>
                <div className="role-background-template-1">{authState.AuthState.job}</div>
                <div className="birth-date-background-template-1-wrapper">
                    <label className="birth-date-background-template-1-icon"></label>
                    <div className="birth-date-background-template-1">{DateHelper.formatDate(authState.AuthState.birthdate.toString())}</div>
                </div>
                <div className="phone-background-template-1-wrapper">
                    <label className="phone-background-template-1-icon"></label>
                    <div className="phone-background-template-1">{authState.AuthState.phone || 'Chưa cập nhật'}</div>
                </div>
                <div className="mail-background-template-1-wrapper">
                    <label className="mail-background-template-1-icon"></label>
                    <div className="mail-background-template-1">{authState.AuthState.gmail}</div>
                </div>
                <div className="address-background-template-1-wrapper">
                    <label className="address-background-template-1-icon"></label>
                    <div className="address-background-template-1">{authState.AuthState.address}</div>
                </div>
            </div>
        </div>
    );
}
export default BackgroundTemplateOne;
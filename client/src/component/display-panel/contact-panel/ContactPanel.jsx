import "../../../assets/css/component/display-panel/contact-panel/contactpanel.css";
import { useContext, useRef, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

const ContactPanel = () =>  {
    const authState = useContext(AuthContext);
    return (
        <div className="contact-panel-wrapper">
            <div className="contact-panel-title">Contact</div>
            <div className="contact-panel-phone-wrapper">
                <div className="contact-panel-phone-head-wrapper">
                    <div className="contact-panel-phone-icon"></div>
                    <div className="contact-panel-phone-title">Điện thoại</div>
                </div>
                <div className="contact-panel-phone-body-wrapper">
                    <div className="contact-panel-phone-value">{authState.AuthState.phone || 'Chưa Cập Nhật'}</div>
                    <div className="contact-panel-edit"></div>
                </div>
            </div>
            <div className="contact-panel-gmail-wrapper">
            <div className="contact-panel-gmail-head-wrapper">
                    <div className="contact-panel-gmail-icon"></div>
                    <div className="contact-panel-gmail-title">Gmail</div>
                </div>
                <div className="contact-panel-gmail-body-wrapper">
                    <div className="contact-panel-gmail-value">{authState.AuthState.gmail || 'Chưa Cập Nhật'}</div>
                    <div className="contact-panel-edit"></div>
                </div>
            </div>
            <div className="contact-panel-outlook-wrapper">
                <div className="contact-panel-outlook-head-wrapper">
                    <div className="contact-panel-outlook-icon"></div>
                    <div className="contact-panel-outlook-title">Outlook</div>
                </div>
                <div className="contact-panel-outlook-body-wrapper">
                    <div className="contact-panel-outlook-value">{authState.AuthState.outlook || 'Chưa Cập Nhật'}</div>
                    <div className="contact-panel-edit"></div>
                </div>
            </div>
            <div className="contact-panel-facebook-wrapper">
                <div className="contact-panel-facebook-head-wrapper">
                    <div className="contact-panel-facebook-icon"></div>
                    <div className="contact-panel-facebook-title">Facebook</div>
                </div>
                <div className="contact-panel-facebook-body-wrapper">
                    <div className="contact-panel-facebook-value">{authState.AuthState.fb || 'Chưa Cập Nhật'}</div>
                    <div className="contact-panel-edit"></div>
                </div>
            </div>
            <div className="contact-panel-twitter-wrapper">
                <div className="contact-panel-twitter-head-wrapper">
                    <div className="contact-panel-twitter-icon"></div>
                    <div className="contact-panel-twitter-title">Twitter</div>
                </div>
                <div className="contact-panel-twitter-body-wrapper">
                    <div className="contact-panel-twitter-value">{authState.AuthState.twitter || 'Chưa Cập Nhật'}</div>
                    <div className="contact-panel-edit"></div>
                </div>
            </div>
            <div className="contact-panel-linkedin-wrapper">
                <div className="contact-panel-linkedin-head-wrapper">
                    <div className="contact-panel-linkedin-icon"></div>
                    <div className="contact-panel-linkedin-title">Linkedin</div>
                </div>
                <div className="contact-panel-linkedin-body-wrapper">
                    <div className="contact-panel-linkedin-value">{authState.AuthState.linkedin || 'Chưa Cập Nhật'}</div>
                    <div className="contact-panel-edit"></div>
                </div>
            </div>
            <div className="contact-panel-zalo-wrapper">
                <div className="contact-panel-zalo-head-wrapper">
                    <div className="contact-panel-zalo-icon"></div>
                    <div className="contact-panel-zalo-title">Zalo</div>
                </div>
                <div className="contact-panel-zalo-body-wrapper">
                    <div className="contact-panel-zalo-value">{authState.AuthState.zalo || 'Chưa Cập Nhật'}</div>
                    <div className="contact-panel-edit"></div>
                </div>
            </div>
            <div className="contact-panel-github-wrapper">
                <div className="contact-panel-github-head-wrapper">
                    <div className="contact-panel-github-icon"></div>
                    <div className="contact-panel-github-title">Github</div>
                </div>
                <div className="contact-panel-github-body-wrapper">
                    <div className="contact-panel-github-value">{authState.AuthState.github || 'Chưa Cập Nhật'}</div>
                    <div className="contact-panel-edit"></div>
                </div>
            </div>
            
            
        </div>
    );
}
export default ContactPanel;
import "../../../assets/css/component/display-panel/home-panel/homepanel.css";
import BackgroundTemplateOne from "./background-template/BackgroundTemplateOne";
import TimelineNode from "../../timeline-node/TimelineNode";
import { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../../context/AuthContext";

const HomePanel = () => {
    const authState = useContext(AuthContext);
    return (
        <div className="home-panel-profile">
            <BackgroundTemplateOne />
            <div className="info-relationship-menu-bar-profile">
                <div className="info-following-wrapper-menu-bar-profile">
                    <div className="icon-following-wrapper-menu-bar-profile"></div>
                    <div className="value-following-wrapper-menu-bar-profile">0</div>
                </div>
                <div className="info-friend-wrapper-menu-bar-profile">
                    <div className="icon-friend-wrapper-menu-bar-profile"></div>
                    <div className="value-friend-wrapper-menu-bar-profile">0</div>
                </div>
                <div className="info-like-wrapper-menu-bar-profile">
                    <div className="icon-like-wrapper-menu-bar-profile"></div>
                    <div className="value-like-wrapper-menu-bar-profile">0</div>
                </div>
                <div className="info-dislike-wrapper-menu-bar-profile">
                    <div className="icon-dislike-wrapper-menu-bar-profile"></div>
                    <div className="value-dislike-wrapper-menu-bar-profile">0</div>
                </div>
                
            </div>
            <TimelineNode />
            
            
        </div>
    );
}
export default HomePanel;
import "../../assets/css/component/timeline-node/timelinenode.css";
import { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
const TimelineNode = () => {
    const authState = useContext(AuthContext);
    const avatarTimeLineNode = useRef(null);
    useEffect(() => {
        avatarTimeLineNode.current.style.backgroundImage = `url(http://localhost:3001/${authState.AuthState.username}/${authState.AuthState.avatar})`;
    }, [])

    return (
        <div className="wrapper-timeline-node">
            <div className="info-user-wrapper-timeline-node">
                <div className="avatar-user-timeline-node" ref={avatarTimeLineNode}></div>
                <div className="name-user-timeline-node">{authState.AuthState.fullname}</div>
            </div>
            <div className="content-wrapper-timeline-node">
                Đây là tính năng  `TimeLine`. Sắp được ra mắt... 
            </div>
            <div className="interact-bar-wrapper-timeline-node">
            <div className="info-like-wrapper-interact-bar-timeline-node">
                    <div className="icon-like-wrapper-interact-bar-timeline-node"></div>
                    <div className="value-like-wrapper-interact-bar-timeline-node">0</div>
                </div>
                <div className="info-dislike-wrapper-interact-bar-timeline-node">
                    <div className="icon-dislike-wrapper-interact-bar-timeline-node"></div>
                    <div className="value-dislike-wrapper-interact-bar-timeline-node">0</div>
                </div>
                <div className="info-menu-wrapper-interact-bar-timeline-node">
                    <div className="icon-menu-wrapper-interact-bar-timeline-node"></div>
                </div>
            </div>
        </div>
    );

}
export default TimelineNode;
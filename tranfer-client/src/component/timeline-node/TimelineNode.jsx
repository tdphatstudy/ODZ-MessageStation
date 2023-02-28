import "../../assets/css/component/timeline-node/timelinenode.css";

const TimelineNode = () => {

    return (
        <div className="wrapper-timeline-node">
            <div className="info-user-wrapper-timeline-node">
                <div className="avatar-user-timeline-node"></div>
                <div className="name-user-timeline-node">Trần Đại Phát</div>
            </div>
            <div className="content-wrapper-timeline-node">
                This Is Cotent
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
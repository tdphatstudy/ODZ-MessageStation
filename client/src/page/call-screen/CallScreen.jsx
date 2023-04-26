import "../../assets/css/page/call-screen/call-screen.css"
import CallerItem from "../../component/call-screen-component/CallerItem";
const CallScreen = () => {
    return (
        <div className="call-screen-wrapper">
            <div className="call-screen-title-bar">
                <div className="call-screen-title-user-call">Trần Đại Phát</div>
                <div className="call-screen-title-time-call">12: 30</div>
            </div>
            <div className="call-screen-contain-area">
                <CallerItem />
                <CallerItem />
                <CallerItem />
                <CallerItem />
                <CallerItem />
                <CallerItem />
                <CallerItem />
                <CallerItem />
                
            </div>
            <div className="own-call-item">
                <div className="own-call-item-avatar"></div>
                <div className="own-call-item-name">Bạn</div>
            </div>
            <div className="call-screen-controll-bar">
                <div className="call-screen-camera-controll-button"></div>
                <div className="call-screen-micro-controll-button"></div>
                <div className="call-screen-stop-call-controll-button"></div>
                <div className="call-screen-speaker-controll-button"></div>
                <div className="call-screen-record-call"></div>
            </div>
        </div>
    );
}
export default CallScreen;
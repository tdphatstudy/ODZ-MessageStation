import "../../assets/css/component/message-panel/messagescreen.css";
import MessageItem from "./MessageItem";

const MessageScreen = () => {
    return (
        <div className="message-screen-wrapper">
            <div className="message-screen-title-bar">
                <div className="message-screen-title-bar-friend-item-info">
                    <div className="message-screen-title-bar-avatar"></div>
                    <div className="message-screen-title-bar-infor-wrapper">
                        <div className="message-screen-title-bar-name">Trần Đại Phát</div>
                        <div className="message-screen-title-bar-status">Trực tuyến</div>
                    </div>
                </div>
                <div className="message-screen-title-bar-function-button">
                    <div className="message-screen-title-bar-call-func"></div>
                    <div className="message-screen-title-bar-video-call-func"></div>
                    <div className="message-screen-title-bar-info-func"></div>
                </div>
            </div>
            <div className="message-screen-display">
                <MessageItem pronoun="me" name="Trần Đại Phát" content="Hello! Các bạn" time="12:30 AM" />
                <MessageItem pronoun="other" name="Trần Đại Phát" content="Hello! Các bạn tôii
                kadsiafjidashfjsjdfjdsbfjbdsjfbdsjfbjsdbfjsbfjbsjdfbdsjbfjsdbfjsdbf" time="12:30 AM" />
                <MessageItem pronoun="me" name="Trần Đại Phát" content="Hello! Các bạn" time="12:30 AM" />
                <MessageItem pronoun="other" name="Trần Đại Phát" content="Hello! Các bạn tôii
                kadsiafjidashfjsjdfjdsbfjbdsjfbdsjfbjsdbfjsbfjbsjdfbdsjbfjsdbfjsdbf" time="12:30 AM" />
                <MessageItem pronoun="me" name="Trần Đại Phát" content="Hello! Các bạn" time="12:30 AM" />
                <MessageItem pronoun="other" name="Trần Đại Phát" content="Hello! Các bạn tôii
                kadsiafjidashfjsjdfjdsbfjbdsjfbdsjfbjsdbfjsbfjbsjdfbdsjbfjsdbfjsdbf" time="12:30 AM" />
                <MessageItem pronoun="me" name="Trần Đại Phát" content="Hello! Các bạn" time="12:30 AM" />
                <MessageItem pronoun="other" name="Trần Đại Phát" content="Hello! Các bạn tôii
                kadsiafjidashfjsjdfjdsbfjbdsjfbdsjfbjsdbfjsbfjbsjdfbdsjbfjsdbfjsdbf" time="12:30 AM" />
                <MessageItem pronoun="ssd" name="Trần Đại Phát" content="Hello! Các bạn tôii
                kadsiafjidashfjsjdfjdsbfjbdsjfbdsjfbjsdbfjsbfjbsjdfbdsjbfjsdbfjsdbf" time="12:30 AM" />
            </div>
            <div className="message-screen-input-bar">
                <div className="message-screen-voice-input"></div>
                <div className="message-screen-file-input"></div>
                <div className="message-screen-emoji-input"></div>
                <div className="message-screen-gif-input"></div>
                <input type="text" placeholder="Nhập đoạn text..." className="message-screen-text-input"/>

            </div>
        </div>
    )
}
export default MessageScreen;
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
                <MessageItem pronoun="other" name="Trần Đại Phát" content="123456789012345678901234567890123456789012345678901234567890" time="12:30 AM" />
                <MessageItem pronoun="me" name="Trần Đại Phát" content="Hello! Các bạn" time="12:30 AM" />
                <MessageItem pronoun="other" name="Trần Đại Phát" content="Hello! Các bạn tôii
                kadsiafjidashfjsjdfjdsbfjbdsjfbdsjfbjsdbfjsbfjbsjdfbdsjbfjsdbfjsdbf" time="12:30 AM" />
                <MessageItem pronoun="me" name="Trần Đại Phát" content="Hello! Các bạn" time="12:30 AM" />
                <MessageItem pronoun="other" name="Trần Đại Phát" content="Hello! Các bạn tôii
                kadsiafjidashfjsjdfjdsbfjbdsjfbdsjfbjsdbfjsbfjbsjdfbdsjbfjsdbfjsdbf" time="12:30 AM" />
                <MessageItem pronoun="me" name="Trần Đại Phát" content="Hello! Các bạn" time="12:30 AM" />
                <MessageItem pronoun="othsr" name="Trần Đại Phát" content="Hello! Các bạn tôii
                kadsia fjida shfjsjdf jdsbfjbd sjfbdsjf bjsd bfjsbfjb sjdfbd sjbfjsd bfjsd bf" time="12:30 AM" />
                <MessageItem pronoun="other" name="Trần Đại Phát" content="Hello! Các bạn tôii
                helo1 helo2 helo3 helo4 helo5 helo6 helo7 helo8 helo9 helo10 helo11 helo12 helo13 helo14 helo15 helo16 helo17 helo18 helo19 helo20 helo helo helo helo helo helo helo helo helo helohelo helo helo
                helo helo helo helo helo helo helo helo helo helo helo helo helo helo helohelo helo helo helo helo helo helo helo helo" time="12:31 AM" />
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
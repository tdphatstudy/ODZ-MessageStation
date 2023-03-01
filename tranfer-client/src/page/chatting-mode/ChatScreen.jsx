import "../../assets/css/page/chatting-mode/chatscreen.css";
import NavarBar from "../../component/navar-bar/NavarBar";
import MessagePanel from "../../component/messagepanel/MessagePanel";
import MessageControl from "../../component/messagepanel/MessageControl";
import MessageScreen from "../../component/messagepanel/MessageScreen";


const ChatScreen = () => {
    return (
        <div className="chat-screen-wrapper">
            <NavarBar />
            <div className="chat-screen-body-wrapper">
                <MessageControl />
                <MessageScreen />
            </div>
        </div>
    );
}

export default ChatScreen;
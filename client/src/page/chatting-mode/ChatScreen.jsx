import "../../assets/css/page/chatting-mode/chatscreen.css";
import NavarBar from "../../component/navar-bar/NavarBar";
import MessagePanel from "../../component/messagepanel/MessagePanel";
import MessageControl from "../../component/messagepanel/MessageControl";
import MessageScreen from "../../component/messagepanel/MessageScreen";
import Toast from "../../component/toast/Toast";
import { useState } from "react";


const ChatScreen = () => {
    const [message, setMessage] = useState({
        success: null,
        message: null 
     });

    return (
        <div className="chat-screen-wrapper">
            <NavarBar />
            <div className="chat-screen-body-wrapper">
                <MessagePanel setMessage={setMessage} />
            </div>
            {message.success!=null && <Toast title={message.success} content={message.message} callback={setMessage}/>}
        </div>
    );
}

export default ChatScreen;
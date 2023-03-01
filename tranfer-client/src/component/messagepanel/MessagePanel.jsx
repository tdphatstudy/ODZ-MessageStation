import "../../assets/css/component/message-panel/messagepanel.css"
import MessageControl from "./MessageControl";
import MessageScreen from "./MessageScreen";

const MessagePanel = () => {
    return (
        <div className="message-panel-wrapper">
            <MessageControl />
            <MessageScreen />
        </div>
    );
}

export default MessagePanel;
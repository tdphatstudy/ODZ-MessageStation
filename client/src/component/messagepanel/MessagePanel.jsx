import "../../assets/css/component/message-panel/messagepanel.css"
import MessageControl from "./MessageControl";
import MessageScreen from "./MessageScreen";


const MessagePanel = ({setMessage}) => {
    return (
        <div className="message-panel-wrapper">
            <MessageControl setMessage={setMessage} />
            <MessageScreen setMessage={setMessage}/>
        </div>
    );
}

export default MessagePanel;
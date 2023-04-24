import "../../assets/css/component/message-panel/messagepanel.css"
import MessageControl from "./MessageControl";
import MessageScreen from "./MessageScreen";
import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


const MessagePanel = ({setMessage}) => {
    const [selectGroup, setSelectGroup] = useState(null);
    
    return (
        <div className="message-panel-wrapper">
            <MessageControl setMessage={setMessage} setSelectGroup={setSelectGroup} />
            <MessageScreen setMessage={setMessage} selectGroup={selectGroup}/>
        </div>
    );
}

export default MessagePanel;
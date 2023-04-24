import "../../assets/css/component/message-panel/messagescreen.css";
import MessageItem from "./MessageItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext"; 

const MessageScreen = ({selectGroup, setMessage}) => {
    const [messageList, setMessageList] = useState([]);
    const [page, setPage] = useState(0);
    const authState = useContext(AuthContext);
    const avatarChatGroup = useRef(null);

    useEffect(()=> {
        if (selectGroup !== null)
        {
            avatarChatGroup.current.style.backgroundImage = `url(http://localhost:3001/${selectGroup.friend.username}/${selectGroup.friend.avatar})`;
        }
    },[selectGroup])

    useEffect(()=>{
        const loadMessage = async() => {
            try {
                const res =  await axios.get(`message/group/${selectGroup._id}/${page}`);
                if (res.data.success === true) {
                    const messages = res.data.historyMessage;
                    setMessageList(messages.map((value) => {
                        const pronoun = 'me';
                        if (authState.AuthState._id !== value.senderId._id) {
                            pronoun = 'other';
                        }
                        return {pronoun: pronoun, message: value}
                    }));

                }
            } catch(error) {
                setMessage({success: 'Fail!', message: error?.response?.data?.message})
            }

        }
    },[page])

    return (
        <div className="message-screen-wrapper">
            {selectGroup === null &&
                <div className="background-message-screen">
                    <div className="logo-background-message-screen">ODZ MessageStation</div>
                    <div className="image-background-message-screen"></div>
                    <div className="title-background-message-screen">Welcome to MessageStation</div>
                    <div className="slogan-background-message-screen">Kết nối mọi người - mọi lúc, mọi nơi với ứng dụng chat của chúng tôi</div>
                </div>
            }
            {selectGroup !== null && 
            <>
                <div className="message-screen-title-bar">
                    <div className="message-screen-title-bar-friend-item-info">
                        <div className="message-screen-title-bar-avatar" ref={avatarChatGroup}></div>
                        <div className="message-screen-title-bar-infor-wrapper">
                            <div className="message-screen-title-bar-name">{selectGroup.name}</div>
                            <div className="message-screen-title-bar-status">{selectGroup.friend.online_status}</div>
                        </div>
                    </div>
                    <div className="message-screen-title-bar-function-button">
                        <div className="message-screen-title-bar-call-func"></div>
                        <div className="message-screen-title-bar-video-call-func"></div>
                        <div className="message-screen-title-bar-info-func"></div>
                    </div>
                </div>
                <div className="message-screen-display">
                    {messageList !== null && messageList.map((value)=>  {
                        <MessageItem pronoun={value.pronoun} 
                            name={value.message.senderId.fullname} content={value.message.text}
                            time={value.message.createAt} />})
                    }
                    
                </div>
                <div className="message-screen-input-bar">
                    <div className="message-screen-voice-input"></div>
                    <div className="message-screen-file-input"></div>
                    <div className="message-screen-emoji-input"></div>
                    <div className="message-screen-gif-input"></div>
                    <input type="text" placeholder="Nhập đoạn text..." className="message-screen-text-input"/>

                </div>
            </>
            }
        </div>
    )
}
export default MessageScreen;
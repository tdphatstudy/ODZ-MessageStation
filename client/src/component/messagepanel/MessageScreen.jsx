import "../../assets/css/component/message-panel/messagescreen.css";
import MessageItem from "./MessageItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext"; 
import {IpContext } from '../../context/IpContext';
import socket from '../../socket.js';

const MessageScreen = ({selectGroup, setMessage}) => {
    const [messageList, setMessageList] = useState([]);
    const [page, setPage] = useState(0);
    const authState = useContext(AuthContext);
    const ipContext = useContext(IpContext)
    const avatarChatGroup = useRef(null);
    const [mess, setMess] = useState('');

    useEffect(()=> {
        if (selectGroup !== null)
        {
            avatarChatGroup.current.style.backgroundImage = `url(http://${ipContext.IP}:3001/${selectGroup.friend.username}/${selectGroup.friend.avatar})`;
        }
    },[selectGroup])

    useEffect(()=>{
        const loadMessage = async() => {
            try {
                const res =  await axios.get(`message/group/${selectGroup._id}/${page}`);
                if (res.data.success === true) {
                    const messages = res.data.historyMessage;

                        setMessageList(messages.map((value) => {
                            let pronoun = 'me';
                            if (authState.AuthState._id !== value.senderId._id) {
                                pronoun = 'other';
                            }
                            return {pronoun: pronoun, message: value}
                        }));
                    }

            } catch(error) {
                console.log(error)
                setMessage({success: 'Fail!', message: error?.response?.data?.message})
            }
        }
        if (selectGroup !== null) {
            loadMessage();
            socket.on('receive message', (data) => {
                const receiveMessage = {pronoun: 'other', message: data};
                setMessageList([receiveMessage, ...messageList]);
            })
        }
    },[page, selectGroup])
    const handleEnter = async(event) => {
        if (event.keyCode === 13) { // 13 is Enter key code
          try {
            const data = {senderId: authState.AuthState._id, revGroupId: selectGroup._id, text: mess, attachments: []};
            setMess('');
            const res = await axios.post('/message/create', data);
            if (res.data.success === true) {
                const itemMessage = {pronoun: 'me', message: res.data.create_message};
                setMessageList([itemMessage, ...messageList]);
                socket.emit('send message', res.data.create_message);
            }
            
          } catch (error) {
            console.log(error)
            setMessage({success: 'Fail!', message: 'Lỗi khi gửi tin nhắn.'})
          }
          
        }
      }
    

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
                    {messageList.length > 0 && messageList.map((value)=>  {
                        return <MessageItem pronoun={value.pronoun} 
                            name={value.message.senderId.fullname} content={value.message.text}
                            time={value.message.createdAt}  key={value.message._id + '' + new Date().getTime() }/>})
                    }
                    
                </div>
                <div className="message-screen-input-bar">
                    <div className="message-screen-voice-input"></div>
                    <div className="message-screen-file-input"></div>
                    <div className="message-screen-emoji-input"></div>
                    <div className="message-screen-gif-input"></div>
                    <input type="text" placeholder="Nhập đoạn text..." value={mess} onChange={(e)=> setMess(e.target.value)} onKeyDown={handleEnter} className="message-screen-text-input"/>

                </div>
            </>
            }
        </div>
    )
}
export default MessageScreen;
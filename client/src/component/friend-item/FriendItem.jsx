import "../../assets/css/component/friend-item/frienditem.css";
import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {IpContext } from '../../context/IpContext';


const FriendItem = ({item, setSelectGroup}) => {
    const navigate = useNavigate();
    const authState = useContext(AuthContext);
    const ipContext = useContext(IpContext);
    const avatarFriendList = useRef(null);
    useEffect(()=>{
        avatarFriendList.current.style.backgroundImage = `url(http://${ipContext.IP}:3001/${item.friend.username}/${item.avatar})`;
    },[])
    return (
        <div className="friend-item-wrapper" onClick={()=>{setSelectGroup(item)}}>
            <div className="friend-item-avatar" ref={avatarFriendList}></div>
            <div className="friend-item-content">
                <div className="friend-item-name">{item?.name}</div>
                <p className="friend-item-last-message">{item.lastMessage === null ? "Nhóm chat mới! Chưa có tin nhắn." : authState.AuthState._id !== item.lastMessage.senderId ? `${item.friend.fullname}: ${item.lastMessage.text}` : `Bạn: ${item.lastMessage.text}`}</p>
            </div>
        </div>
    );
}

export default FriendItem;
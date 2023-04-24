import "../../assets/css/component/message-panel/messagecontrol.css";
import FriendItem from "../friend-item/FriendItem";
import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LoadingThemeOne from "../../page/loading/LoadingThemeOne";

const MessageControl = ({setSelectGroup,setMessage}) => {
    const navigate = useNavigate();
    const authState = useContext(AuthContext);
    const [typeList, setTypeList] = useState('friend');
    const FriendBtn = useRef(null);
    const GroupBtn = useRef(null);
    const [GroupChatList, setGroupChatList] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        const loadView = async() => {
            setIsLoading(true);
            try {
                if (typeList === 'friend') {
                    const res =  await axios.get(`/groupchat/relationshipGroups/${authState.AuthState._id}`);
                    if (res.data.success === true) {
                        const relationshipGroups = res.data.groups;
                        setGroupChatList(relationshipGroups.map((value)=> {
                            const {name, avatar, members, ...other} = value;
                            const friend = members.find((member) => {return member._id != authState.AuthState._id});
                            return {name: friend.fullname, avatar: friend.avatar, friend: friend, ...other};
                        }))                 
                    }
                } else if (typeList === 'group') {
                    const res =  await axios.get(`/groupchat/publicGroups/${authState.AuthState._id}`);
                    if (res.data.success === true) {
                        const publicGroups = res.data.groups;
                        setGroupChatList(publicGroups.map((value)=> {
                            const {name, avatar, members, ...other} = value;
                            const friend = members.find((member) => {return member._id != authState.AuthState._id});
                            return {name: friend.fullname, avatar: friend.avatar, friend: friend, ...other};
                        }))                 
                    }

                }

            } catch(error) {
                console.log(error);
                setMessage({success:'Fail!', message:  'Lỗi hệ thống! Vui lòng thử lại trong giây lát.'})
            }finally {
                setIsLoading(false); 
              }
        }
        loadView()
    }, [typeList]);
    const changeListView =  (list) => {
        if (list != typeList) {
            setTypeList(list);
            if (list === 'friend') {
                FriendBtn.current.classList.add('select')
                GroupBtn.current.classList.remove('select')
                

            } else if (list === 'group') {
                FriendBtn.current.classList.remove('select')
                GroupBtn.current.classList.add('select')
            }
        }

    }
    return (
        <div className="message-control-wrapper">
            <div className="message-control-menu-wrapper">
                <div className="message-control-chat-box"></div>
                <div className="message-control-relationship"></div>
                <div className="message-control-device-manager"></div>
            </div>
            <div className="message-control-relationship-panel">
                <div className="message-control-relationship-panel-header">            
                    <input type="text" className="message-control-relationship-panel-search-bar" placeholder="Tìm kiếm cuộc trò chuyện... "/>
                    <div className="message-control-relationship-panel-tags">
                        <div className="message-control-relationship-panel-option  select" ref={FriendBtn} onClick={()=> {changeListView('friend')}}>Bạn bè</div>
                        <div className="message-control-relationship-panel-option" ref={GroupBtn} onClick={()=> {changeListView('group')}}>Nhóm</div>
                    </div>
                </div>
                <div className="message-control-chat-box-view">
                    {GroupChatList === null && <LoadingThemeOne />}
                    {GroupChatList !== null && GroupChatList.map((value)=> {return <FriendItem item={value} key={value._id} setSelectGroup={setSelectGroup} />})}
                </div>
            </div>
        </div>
    );
}
export default MessageControl;
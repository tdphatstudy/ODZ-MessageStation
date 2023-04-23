import "../../assets/css/component/message-panel/messagecontrol.css";
import FriendItem from "../friend-item/FriendItem";
import { useEffect, useState, useRef, useContext } from "react";
import Toast from '../../component/toast/Toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const MessageControl = ({setMessage}) => {
    const navigate = useNavigate();
    const authState = useContext(AuthContext);
    const [typeList, setTypeList] = useState('friend');
    const FriendBtn = useRef(null);
    const GroupBtn = useRef(null);
    const [FriendList, setFriendList] = useState(null);
    const [GroupList, setGroupList] = useState(null);
    useEffect(()=>{
        const loadView = async() => {
            try {
                if (typeList === 'friend') {
                    const res =  await axios.get(`/relationship/friend/user/${authState.AuthState._id}`);
                } else if (typeList === 'group') {
                    const res =  await axios.get(`/relationship/friend//${authState.AuthState._id}`);

                }

            } catch(error) {
                console.log(error);
                setMessage({success:'Fail!', message:  'Lỗi hệ thống! Vui lòng thử lại trong giây lát.'})
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
                    <FriendItem />  
                    <FriendItem />
                    <FriendItem />  
                    <FriendItem />
                    <FriendItem />  
                    <FriendItem />
                    <FriendItem />  
                    <FriendItem />
                    <FriendItem />  
                    <FriendItem />
                    <FriendItem />  
                    <FriendItem />
                    <FriendItem />  
                    <FriendItem />
                </div>
            </div>
        </div>
    );
}
export default MessageControl;
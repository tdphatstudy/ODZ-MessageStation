import "../../assets/css/component/message-panel/messagecontrol.css";
import FriendItem from "../friend-item/FriendItem";

const MessageControl = () => {
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
                        <div className="message-control-relationship-panel-option  select">Bạn bè</div>
                        <div className="message-control-relationship-panel-option">Nhóm</div>
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
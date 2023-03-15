import "../../assets/css/component/friend-item/frienditem.css";

const FriendItem = () => {
    return (
        <div className="friend-item-wrapper">
            <div className="friend-item-avatar"></div>
            <div className="friend-item-content">
                <div className="friend-item-name">Trần Đại Phát</div>
                <p className="friend-item-last-message">Bạn: Hello các bạn vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv.</p>
            </div>
        </div>
    );
}

export default FriendItem;
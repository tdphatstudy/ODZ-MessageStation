import "../../assets/css/component/profile-node/profilenode.css";

const ProfileNode = ({name, value}) => {
    return (
        <div className="profile-node-wrapper">
            <div className="profile-node-title">{name}</div>
            <div className="profile-node-value">{value}</div>
            <div className="profile-node-edit"></div>
        </div>
    
    );
}

export default ProfileNode;
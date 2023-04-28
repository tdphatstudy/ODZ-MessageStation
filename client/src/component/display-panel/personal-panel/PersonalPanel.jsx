import "../../../assets/css/component/display-panel/personal-panel/personalpanel.css";
import ProfileNode from "../../profile-node/ProfileNode";
import { useContext, useRef, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import {IpContext } from '../../../context/IpContext';
import axios from "axios";


const PersonalPanel = ({setMessage}) => {
    const authState = useContext(AuthContext);
    const ipContext = useContext(IpContext);
    const avatarPersonalPanel = useRef(null);
    const fileInput = useRef(null);
    const [avatar, setAvatar] = useState(null);
    const [personalInfo, setPersonalInfo] = useState(null);

    const handleUploadAvatar =  async() => {
        try {
            const formData = new  FormData();
            formData.append('username', authState.AuthState.username);
            formData.append('file', avatar);

            const res = await axios.post('/resources/upload/file', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (res.data.success === true) {
                const uploadAvatarReq = {username: authState.AuthState.username, avatar: res.data.fileName};
                const updateRes = await axios.put('/user/updateAvatar', uploadAvatarReq);
                setMessage({success: 'Success!', message: 'Cập nhật ảnh thành công.'});
                authState.setAuth({...authState.AuthState, avatar: res.data.fileName});
            }
        }  catch(error) {
            setMessage({success: 'Fail!', message: error?.response.data.message || 'Lỗi hệ thống! Vui lòng thử lại sao ít phút.'});
        }
    }
    

    useEffect(() => {
        let personalObj = {...authState.AuthState};
        delete personalObj.gmail;
        delete personalObj.zalo;
        delete personalObj.fb;
        delete personalObj.outlook;
        delete personalObj.twitter;
        delete personalObj.linkedin;
        delete personalObj.github;
        delete personalObj.phone;
        delete personalObj.online_status;
        delete personalObj.account_status;
        delete personalObj.role;
        delete personalObj.__v;
        delete personalObj.avatar;
        setPersonalInfo(Object.entries(personalObj));
        // handle avatar
        avatarPersonalPanel.current.style.backgroundImage = `url(http://${ipContext.IP}:3001/${authState.AuthState.username}/${authState.AuthState.avatar})`;
        const handleFileInputChange = async (event) => {
        const file = event.target.files[0];
        const type = file.type.split('/')[1];
        const max_size_support = 1000000; // 1mb
        const supportFile =['jpeg', 'png']
        const reader = new FileReader();
        if (supportFile.includes(type)) {
            if (file.size <= max_size_support) {
                setAvatar(file);
                setMessage({success: null, message: null});
                reader.onload = (event) => {
                    const fileContent = event.target.result;
                    avatarPersonalPanel.current.style.backgroundImage = `url(${fileContent})`;
                };
                reader.readAsDataURL(file);       
            } else {
                avatarPersonalPanel.current.style.backgroundImage = `url(http://localhost:3001/${authState.AuthState.username}/${authState.AuthState.avatar})`;
                setAvatar(null);
                setMessage({success: 'Fail!', message: 'Hiện tại chúng tôi chỉ hỗ trợ ảnh dưới 1 MB để thiết lập avatar.'});
            }
        } else {
            avatarPersonalPanel.current.style.backgroundImage = `url(http://localhost:3001/${authState.AuthState.username}/${authState.AuthState.avatar})`;
            setAvatar(null);
            setMessage({success: 'Fail!', message: 'Hiện tại chúng tôi chỉ hỗ trợ PNG, JPG và JPEG để thiết lập avatar.'});
        }
        
        };
        fileInput.current.addEventListener("change", handleFileInputChange);
        return () => {
            fileInput?.current?.removeEventListener("change", handleFileInputChange);
        };  
        
      }, []);
      useEffect(()=>{
        if (avatar != null) {
            handleUploadAvatar();
        } 
      },[avatar]);
    return (
        <div className="personal-panel-wrapper">
            <div className="personal-panel-avatar-wrapper" >
                <div className="personal-panel-avatar-image" ref={avatarPersonalPanel}></div>
                <input type="file" name="avatar_upload" id="avatar_upload" className="avatar_upload_login_page" ref={fileInput}/>
                <label className="personal-panel-avatar-upload" htmlFor='avatar_upload'>Upload</label>
                <div className="personal-panel-avatar-theme">Theme</div>
                <div className="personal-panel-avatar-online-search">Tìm kiếm</div>
            </div>
            
        {personalInfo && personalInfo.map((value)=> <ProfileNode name={value[0]} value={value[1] } key={value} />)}
            
        </div>
    );
}
export default PersonalPanel;
import '../../assets/css/page/login/forget-password.css'
import { useState } from 'react';
import axios from 'axios';
import Toast from '../../component/toast/Toast';

const ForgetPassword = () => {
    const [data, setData] = useState({
        username: undefined,
        gmail: undefined
    })
    const [message, setMessage] = useState({
        success: null,
        message: null
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put('/auth/forgetPassword', data);
            setMessage({success: 'Success!', message: res.data.message});
        } catch (error) {
            console.log(error);
            setMessage({success: 'Fail!', message: error.response.data.message});
        }
    }
    const handleSetData = (newMessage) => {
        setMessage(newMessage);
      };

    return (
        <div className="forget-password-page-wrapper">
            <div className="forget-password-page-frame">
                <div className="title-forget-password-page">ODZ MessageStation</div>
                <input type="gmail" placeholder="Nhập Gmail của bạn" className="input-forget-password-page" value={data.gmail} onChange={(e) => setData({...data, gmail: e.target.value})}/>
                <input type="text" placeholder="Nhập Username của bạn" className="input-forget-password-page" value={data.username} onChange={(e) => setData({...data, username: e.target.value})}/>
                <input type="submit" value="Quên mật khẩu" className="button-forget-password-page" onClick={handleSubmit} />
                <div className="func-forget-passord-page">Quay lại trang đăng nhập? <a href="/login">Đăng nhập</a></div>
                <div className="author-forget-password-page">Product of Tran Dai Phat</div>
            </div>
            {message.success != null && <Toast  title={message.success} content={message.message} callback={handleSetData}/>}
        </div>
       
    );
} 

export default ForgetPassword
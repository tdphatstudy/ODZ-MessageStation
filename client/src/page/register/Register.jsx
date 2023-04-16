import "../../assets/css/page/register/register.css";
import { useState } from "react";
import axios from 'axios'

const Register = () => {
    const [data, setData] = useState({
        fullname: undefined,
        username: undefined,
        password: undefined,
        repassword: undefined,
        gmail: undefined
    });
    const [message, setMessage] =useState({
        success: null,
        message: null
    });
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3001/api/auth/register', data);
            setMessage({success: 'Success!', message: res.data.message})
        } catch (error) {
            setMessage({success: 'Fail!', message: error.response.data.message});
        }
    }
    return (
        <div className="wrapper-register-page">
            <div className="frame-register-page">
                <div class="title-register-page">ODZ MessageStation</div>
                <input type="text" placeholder="Họ & Tên" className="input-register-page" value={data.fullname} onChange={e => setData({...data, fullname: e.target.value})}/>
                <input type="text" placeholder="Tên tài khoản" className="input-register-page" value={data.username} onChange={e => setData({...data, username: e.target.value})}/>
                <input type="password" placeholder="Mật Khẩu" className="input-register-page" value={data.password} onChange={e => setData({...data, password: e.target.value})}/>
                <input type="password" placeholder="Xác Minh Mật Khẩu" className="input-register-page" value={data.repassword} onChange={e => setData({...data, repassword: e.target.value})}/>
                <input type="email" placeholder="Gmail" className="input-register-page" value={data.gmail} onChange={e => setData({...data, gmail: e.target.value})}/>
                <input type="submit" value="Đăng Ký" className="button-register-page" onClick={handleSubmit}/>
                <div className="func-register-page">Bạn đã có tài khoản? <a href="/login">Đăng Nhập</a></div>
                <div className="author-register-page">Product of Tran Dai Phat</div>
            </div>
            
                {(message.success === "Fail!") && 
                <div className="toast-fail-wrapper-register-page">
                    <div className="icon-toast-register-page"></div>
                    <div className="content-toast-register-page">
                        <div className="title-toast-register-page">{message.success}</div>
                        <div className="message-toast-register-page">{message.message}</div>
                    </div>
                    <div className="close-toast-register-page" onClick={(e) => setMessage({success: null, message: null})}></div>
                </div>}
                {(message.success === "Success!") && 
                <div className="toast-success-wrapper-register-page">
                    <div className="icon-toast-register-page"></div>
                    <div className="content-toast-register-page">
                        <div className="title-toast-register-page">{message.success}</div>
                        <div className="message-toast-register-page">{message.message}</div>
                    </div>
                    <div className="close-toast-register-page" onClick={(e) => setMessage({success: null, message: null})}></div>
                </div>}
        </div>
    );
}

export default Register;
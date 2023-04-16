import { useState } from "react";
import "../../assets/css/page/login/login.css";
import Toast from '../../component/toast/Toast';
import axios from "axios";

const Login = () => {
    const [data, setData] = useState({
        username: undefined,
        password: undefined
    });
    const [avatar, setAvatar] = useState(null);
    const [message, setMessage] = useState({
       success: null,
       message: null 
    });
    const [step, setStep] = useState(2);
    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/login', data);
        } catch (error) {
            setMessage({success: 'Fail!', message: error.response.data.message});
        }
    }
    const handleSetAvatar = (e) => {
        setAvatar(e.target.files);
    }
    return (
        <div className="wrapper-login-page">
            {step == 0 && 
            <div className="frame-login-page">
                <div class="title-login-page">ODZ MessageStation</div>
                <input type="text" placeholder="Username" className="input-login-page" value={data.username} onChange={e => setData({...data, username: e.target.value})}/>
                <input type="password" placeholder="Password" className="input-login-page" value={data.password} onChange={e => setData({...data, password: e.target.value})}/>
                <input type="submit" value="Đăng Nhập" className="button-login-page" onClick={(e) => setStep(step+ 2) }/>
                <div className="func-login-page">Đăng nhập với QR Code <a href="/comming">QR Code</a></div>
                <div className="func-login-page">Bạn chưa có tài khoản? <a href="/register">Đăng ký</a></div>
                <div className="func-login-page">Bạn quên mật khẩu? <a href="/forget-password">Quên mật khẩu</a></div>
                <div className="author-login-page">Product of Tran Dai Phat</div>
            </div>
            }
            {step == 1 && 
            <div className="frame-login-page">
                <div class="title-login-page">ODZ MessageStation</div>
                <div className="progress-num-login-page">Bước 1: Xác nhận Gmail.</div>
                <input type="text" placeholder="Nhập mã code " className="input-login-page" />
                <input type="submit" value="Bước kế" className="button-login-page" disabled onClick={(e) => {setStep(step + 1)}} />
                <div className="author-login-page">Product of Tran Dai Phat</div>
            </div>
            }
            {step == 2 && 
            <div className="frame-login-page">
                <div class="title-login-page">ODZ MessageStation</div>
                <div className="progress-num-login-page">Bước 2: Thiết lập ảnh đại diện</div>
                <div className="avatar-preview-login-page"></div>
                
                <input type="file" name="avatar_upload" id="avatar_upload" className="avatar_upload_login_page" onChange={handleSetAvatar} onIn/>
                <label for="avatar_upload" className="avatar_upload_label_login_page">
                    <span></span>
                    <div>Upload</div>
                </label> 
                <input type="submit" value="Bước kế" className="button-login-page" disabled onClick={(e) => setStep(step + 1)} />
                <div className="author-login-page">Product of Tran Dai Phat</div>
            </div>
            }
            
            {message.success!=null && <Toast />}
        </div>
    );
}

export default Login;
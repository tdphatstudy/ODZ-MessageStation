import { useEffect, useState, useRef } from "react";
import "../../assets/css/page/login/login.css";
import Toast from '../../component/toast/Toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const default_avatar = require('../../assets/image/default_avatar.jpg');

const Login = ({isLogin}) => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: undefined,
        password: undefined
    });
    const [confirmGmail, setConfirmGmail] = useState(undefined);
    const [avatar, setAvatar] = useState(null);
    const [message, setMessage] = useState({
       success: null,
       message: null 
    });
    const [step, setStep] = useState(0);
    const [disabledBtn, setDisabledBtn] = useState(true);
    const [infoPersonal, setInfoPersonal] = useState({
        sex: undefined,
        birthdate: undefined,
        job: undefined,
        address: undefined
    });
    const [contact, setContact] = useState({
        zalo: undefined,
        fb: undefined,
        outlook: undefined,
        twitter: undefined,
        linkedin: undefined,
        github: undefined,
        phone: undefined
    });
    const fileInput = useRef(null);
    const previewAvatar = useRef(null);

    // Method
    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const isFullFill = Object.values(data).every(value => value !== undefined && value?.length != 0);
            if (isFullFill){
                const res = await axios.post('/auth/login', data);
                if (res.data.message === 'Đăng nhập thành công!') {
                    navigate('/profile');
                } else {
                    setStep(step + 1);
                }
            } else {
                setMessage({success: 'Fail!', message: 'Vui lòng nhập đầy đủ các thông tin ở các trường.'});
            }
            
        } catch (error) {
            setMessage({success: 'Fail!', message: error.response.data.message});
        }
    }
    const handleComfirmGmail = () =>{

    }
    const checkInfoPersonal = () => {
        const isDefined = Object.values(infoPersonal).every(value => value !== undefined && value != '')
        if (isDefined) {
            setDisabledBtn(false);
        } else {
            setDisabledBtn(true);
        }
    }

    useEffect(() => {
        if (step === 0 && isLogin === 'ACTIVITY') {
            setStep(1)
        }
        if (step === 2 ){
            const handleFileInputChange = (event) => {
                const file = event.target.files[0];
                const type = file.type.split('/')[1];
                const max_size_support = 1000000; // 1mb
                const supportFile =['jpeg', 'png']
                const reader = new FileReader();
                if (supportFile.includes(type)) {
                    if (file.size <= max_size_support) {
                        setAvatar(file);
                        setMessage({success: null, message: null});
                        setDisabledBtn(false);
                        reader.onload = (event) => {
                            const fileContent = event.target.result;
                            previewAvatar.current.style.backgroundImage = `url(${fileContent})`;
                        };
                        reader.readAsDataURL(file);         
                    } else {
                        previewAvatar.current.style.backgroundImage = `url(${default_avatar})`;
                        setAvatar(null);
                        setDisabledBtn(true);
                        setMessage({success: 'Fail!', message: 'Hiện tại chúng tôi chỉ hỗ trợ ảnh dưới 1 MB để thiết lập avatar.'});
                    }
                } else {
                    previewAvatar.current.style.backgroundImage = `url(${default_avatar})`;
                    setAvatar(null);
                    setDisabledBtn(true);
                    setMessage({success: 'Fail!', message: 'Hiện tại chúng tôi chỉ hỗ trợ PNG, JPG và JPEG để thiết lập avatar.'});
                }
                
            };
            fileInput.current.addEventListener("change", handleFileInputChange);
            return () => {
              fileInput.current.removeEventListener("change", handleFileInputChange);
            };
        }
      }, [step]);
      
    return (
        <div className="wrapper-login-page">
            {step === 0 && 
            <div className="frame-login-page">
                <div className="title-login-page">ODZ MessageStation</div>
                <input type="text" placeholder="Username" className="input-login-page" value={data.username} onChange={e => setData({...data, username: e.target.value})}/>
                <input type="password" placeholder="Password" className="input-login-page" value={data.password} onChange={e => setData({...data, password: e.target.value})}/>
                <input type="submit" value="Đăng Nhập" className="button-login-page" onClick={(e) => handleLogin(e) }/>
                <div className="func-login-page">Đăng nhập với QR Code <a href="/comming">QR Code</a></div>
                <div className="func-login-page">Bạn chưa có tài khoản? <a href="/register">Đăng ký</a></div>
                <div className="func-login-page">Bạn quên mật khẩu? <a href="/forget-password">Quên mật khẩu</a></div>
                <div className="author-login-page">Product of Tran Dai Phat</div>
            </div>
            }
            {step === 1 && 
            <div className="frame-login-page">
                <div className="title-login-page">ODZ MessageStation</div>
                <div className="progress-num-login-page">Bước 1: Xác nhận Gmail.</div>
                <input type="text" placeholder="Nhập mã code " className="input-login-page" onChange={(e) => setConfirmGmail(e.target.value)} value={confirmGmail} />
                <input type="submit" value="Bước kế" className="button-login-page" disabled onClick={(e) => {setStep(step + 1)}} />
                <div className="author-login-page">Product of Tran Dai Phat</div>
            </div>
            }
            {step === 2 && 
            <div className="frame-login-page">
                <div className="title-login-page">ODZ MessageStation</div>
                <div className="progress-num-login-page">Bước 2: Thiết lập ảnh đại diện</div>
                <div className="avatar-preview-login-page" ref={previewAvatar}></div>
                <input type="file" name="avatar_upload" id="avatar_upload" className="avatar_upload_login_page" ref={fileInput}/>
                <label for="avatar_upload" className="avatar_upload_label_login_page">
                    <span></span>
                    <div>Upload</div>
                </label> 
                <input type="submit" value="Bước kế" className="button-login-page" disabled={disabledBtn} onClick={(e) => {setStep(step + 1); setDisabledBtn(true);}} />
                <div className="author-login-page">Product of Tran Dai Phat</div>
            </div>
            }
            {step === 3 && 
            <div className="frame-login-page">
                <div className="title-login-page">ODZ MessageStation</div>
                <div className="progress-num-login-page">Bước 3: Thiết lập thông tin cá nhân</div>
                <select className="input-login-page" value={infoPersonal.sex || "Label"} name='sex-dropdown' onChange={(e) => {setInfoPersonal({...infoPersonal, sex: e.target.value}); checkInfoPersonal();}}>
                    <option disabled value="Label">Giới Tính</option>
                    <option value="Male">Nam</option>
                    <option value="Female">Nữ</option>
                    <option value="other">Khác</option>
                </select>
                <input type='date' className="input-login-page" placeholder="Ngày Sinh" value={!(isNaN(infoPersonal.birthdate?.getTime()))? infoPersonal.birthdate.toISOString().substr(0, 10): ''}  onChange={(e) => {setInfoPersonal({...infoPersonal, birthdate: new Date(e.target.value)}); checkInfoPersonal();}} />
                <input type='text' className="input-login-page" placeholder="Công Việc Của Bạn (Ví dụ: Học Sinh, Lập Trình Viên,...)" value={infoPersonal.job || ''} onChange={(e) => {setInfoPersonal({...infoPersonal, job: e.target.value}); checkInfoPersonal();}} />
                <input type='text' className="input-login-page" placeholder="Địa Chỉ"  value={infoPersonal.address} onChange={(e) => {setInfoPersonal({...infoPersonal, address: e.target.value}); checkInfoPersonal();}} />
                <input type="submit" value="Bước kế" className="button-login-page" disabled={disabledBtn} onClick={(e) => setStep(step + 1)} />
                <div className="author-login-page">Product of Tran Dai Phat</div> 
            </div>
            }
            {step === 4 && 
            <div className="frame-login-page">
                <div className="title-login-page">ODZ MessageStation</div>
                <div className="progress-num-login-page">Bước 4: Thiết lập thông tin liên lạc</div>
                <input type='text' className="input-login-page" placeholder="Zalo (nếu có)" value={contact.zalo} onChange={(e) => setContact({...contact, zalo: e.target.value})} />
                <input type='text' className="input-login-page" placeholder="Facebook (nếu có)" value={contact.fb} onChange={(e) => setContact({...contact, fb: e.target.value})} />
                <input type='text' className="input-login-page" placeholder="Outlook (nếu có)" value={contact.outlook} onChange={(e) => setContact({...contact, outlook: e.target.value})} />
                <input type='text' className="input-login-page" placeholder="Twitter (nếu có)"  value={contact.twitter} onChange={(e) => setContact({...contact, twitter: e.target.value})}/>
                <input type='text' className="input-login-page" placeholder="Linkedin (nếu có)" value={contact.linkedin} onChange={(e) => setContact({...contact, linkedin: e.target.value})}/>
                <input type='text' className="input-login-page" placeholder="Github (nếu có)" value={contact.github} onChange={(e) => setContact({...contact, github: e.target.value})}/>
                <input type='text' className="input-login-page" placeholder="Số Điện Thoại (nếu có)"value={contact.phone} onChange={(e) => setContact({...contact, phone: e.target.value})} />
                <input type="submit" value="Hoàn Tất" className="button-login-page"  />
                <div className="author-login-page">Product of Tran Dai Phat</div> 
            </div>
            }
            {message.success!=null && <Toast title={message.success} content={message.message} callback={setMessage}/>}
        </div>
    );
}

export default Login;
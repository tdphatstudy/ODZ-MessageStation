import "../../assets/css/page/register/register.css";

const Register = () => {
    return (
        <div className="wrapper-register-page">
            <div className="frame-register-page">
                <div class="title-register-page">OPS Tranfer</div>
                <input type="text" placeholder="Họ & Tên" className="input-register-page"/>
                <input type="text" placeholder="Tên tài khoản" className="input-register-page"/>
                <input type="password" placeholder="Mật Khẩu" className="input-register-page"/>
                <input type="password" placeholder="Xác Minh Mật Khẩu" className="input-register-page"/>
                <input type="email" placeholder="Email" className="input-register-page"/>
                <input type="submit" value="Đăng Ký" className="button-register-page" />
                <div className="func-register-page">Bạn đã có tài khoản? <a href="#">Đăng Nhập</a></div>
                <div className="author-register-page">Product of Tran Dai Phat</div>
                
            </div>
        </div>
    );
}

export default Register;
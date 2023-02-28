import "../../assets/css/page/login/login.css";

const Login = () => {
    return (
        <div className="wrapper-login-page">
            <div className="frame-login-page">
                <div class="title-login-page">OPS Tranfer</div>
                <input type="text" placeholder="Username" className="input-login-page"/>
                <input type="password" placeholder="Password" className="input-login-page"/>
                <input type="submit" value="Đăng Nhập" className="button-login-page" />
                <div className="func-login-page">Đăng nhập với QR Code <a href="#">QR Code</a></div>
                <div className="func-login-page">Bạn chưa có tài khoản? <a href="#">Đăng ký</a></div>
                <div className="func-login-page">Bạn quên mật khẩu? <a href="#">Quên mật khẩu</a></div>
                <div className="author-login-page">Product of Tran Dai Phat</div>
                
            </div>
        </div>
    );
}

export default Login;
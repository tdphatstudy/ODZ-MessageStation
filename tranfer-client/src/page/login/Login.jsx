import "../../assets/css/page/login/login.css";

const Login = () => {
    return (
        <div className="wrapper">
            <div className="frame">
                <div class="title">OPS Tranfer</div>
                <input type="text" placeholder="Username" className="input"/>
                <input type="password" placeholder="Password" className="input"/>
                <input type="submit" value="Đăng Nhập" className="button" />
                <div className="func">Đăng nhập với QR Code <a href="#">QR Code</a></div>
                <div className="func">Bạn chưa có tài khoản? <a href="#">Đăng ký</a></div>
                <div className="func">Bạn quên mật khẩu? <a href="#">Quên mật khẩu</a></div>
                <div className="author">Product of Tran Dai Phat</div>
                
            </div>
        </div>
    );
}

export default Login;
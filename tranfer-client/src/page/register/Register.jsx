import "./register.css";

const Register = () => {
    return (
        <div className="wrapper">
            <div className="frame">
                <div class="title">OPS Tranfer</div>
                <input type="text" placeholder="Họ & Tên" className="input"/>
                <input type="text" placeholder="Tên tài khoản" className="input"/>
                <input type="password" placeholder="Mật Khẩu" className="input"/>
                <input type="password" placeholder="Xác Minh Mật Khẩu" className="input"/>
                <input type="email" placeholder="Email" className="input"/>
                <input type="submit" value="Đăng Ký" className="button" />
                <div className="func">Bạn đã có tài khoản? <a href="#">Đăng Nhập</a></div>
                <div className="author">Product of Tran Dai Phat</div>
                
            </div>
        </div>
    );
}

export default Register;
require('dotenv').config(); 


const DataTemplate = {
    resgister: (data) => {
        return ({
            title: `${process.env.APP_NAME.toUpperCase()}! XÁC NHẬN GMAIL.`,
            content: `<h1 style="color: red">THÔNG BÁO XÁC NHẬN GMAIL</h1><br>
                      <div>Kính gửi, ${data.fullname}!</div><br>     
                      <div>Chúng tôi là <b>${process.env.APP_NAME.toUpperCase()}</b>, chúng tôi vừa nhân được yêu cầu đăng ký của bạn <br>
                      của bạn vào lúc ${new Date()}</div><br>
                      <div>Email này nhằm xác nhận bạn có phải là người thực hiện đăng ký thực tài khoản trên nền tảng của chúng tôi hay không.</div><br>
                      <div>Nếu bạn thực sự là người đã đăng ký tài khoản hãy nhập mã xác thực trong lần đầu tiên đăng nhập để xác thực tài khoản.</div>
                      <div>Đây là mã code của bạn:  <b>${data.auth_code}</b></div>
                      <div>Nếu có người đã dùng danh tính của bạn để thực hiện đăng ký bạn có thể liên hệ với chúng tôi.</div>
                      <div>Mọi thắc mắc và vấn đề có thể liên hệ với chúng tôi tại developer.opendevzone@gmail.com</div><br>
                      <hr>
                      <i>Trân thành cảm ơn đã sử dụng dịch vụ của chúng tôi. </i>
                      <i>Copyleft from Tran Dai Phat</i>       
            `
        });
    },
    forgetPasword: (data) => {
        return ({
            title: `${process.env.APP_NAME.toUpperCase()}! KHÔI PHỤC MẬT KHẨU.`,
            content: `<h1 style="color: red">THÔNG BÁO XÁC NHẬN LẤY LẠI MẬT KHẨU</h1><br>
                      <div>Kính gửi, ${data.fullname}!</div><br>     
                      <div>Chúng tôi là <b>${process.env.APP_NAME.toUpperCase()}</b>, chúng tôi vừa nhân được yêu reset mật khẩu  <br>
                      của bạn vào lúc ${new Date()}</div><br>
                      <div>Email này nhằm xác nhận bạn có phải là người thực hiện reset mật khẩu hay không.</div><br>
                      <div>Nếu bạn thực sự là người đã thực hiện thì bạn có thể đăng nhập mật khẩu mới mà chúng tôi cung cấp và </div><br>
                      <div>vui lòng thay đổi mật khẩu ngay để đảm bảo sự an toàn cho tài khoản của bạn.</div>
                      <div>Đây là mật khẩu mới của bạn:  <b>${data.new_pass}</b></div>
                      <div>Nếu có người đã dùng danh tính của bạn để thực hiện, bạn nên thực hiện các biện pháp bảo mật như: Thay đổi mật khẩu, không đăng nhập vào các thiết bị lạ</div>
                      <div>Mọi thắc mắc và vấn đề có thể liên hệ với chúng tôi tại developer.opendevzone@gmail.com</div><br>
                      <hr>
                      <i>Trân thành cảm ơn đã sử dụng dịch vụ của chúng tôi. </i>
                      <i>Copyleft from Tran Dai Phat</i>       
            `
        });
    },
    lockNotice: (data) => {
        return ({
            title: `${process.env.APP_NAME.toUpperCase()}! THÔNG BÁO KHÓA TÀI KHOẢN.`,
            content: `<h1 style="color: red">THÔNG BÁO KHÓA TÀI KHOẢN</h1><br>
                      <div>Kính gửi, ${data.fullname}!</div><br>     
                      <div>Chúng tôi là <b>${process.env.APP_NAME.toUpperCase()}</b>, chúng tôi vừa thực hiện khóa tài khoản của bạn vào lúc ${new Date()}
                      <div>Email này nhằm thông báo cho bạn về việc tài khoản của bạn đã bị khóa.</div><br>
                      <div>Nguyên nhân có thể bạn đã vi phạm các nguyên tắc của chúng tôi hoặc có thể đây là sự nhầm lẫn bởi nhân viên đến từ chúng tôi.</div><br>
                      <div>Vui lòng liên hệ với chúng tôi tại developer.opendevzone@gmail.com để có thể biết thêm thông tin. Nếu có nhầm lẫn chúng tôi sẽ khôi phục lại tài khoản của bạn.</div><br>
                      <hr>
                      <i>Trân thành cảm ơn đã sử dụng dịch vụ của chúng tôi. </i>
                      <i>Copyleft from Tran Dai Phat</i>       
            `
        });
    },
    unlockNotice: (data) => {
        return ({
            title: `${process.env.APP_NAME.toUpperCase()}! THÔNG BÁO MỞ KHÓA TÀI KHOẢN.`,
            content: `<h1 style="color: red">THÔNG BÁO MỞ KHÓA TÀI KHOẢN</h1><br>
                      <div>Kính gửi, ${data.fullname}!</div><br>     
                      <div>Chúng tôi là <b>${process.env.APP_NAME.toUpperCase()}</b>, chúng tôi vừa thực hiện mở khóa tài khoản của bạn vào lúc ${new Date()}
                      <div>Email này nhằm thông báo cho bạn về việc tài khoản của bạn đã được mở khóa.</div><br>
                      <div>Mọi thắc mắc và vấn đề có thể liên hệ với chúng tôi tại developer.opendevzone@gmail.com</div><br>
                      <hr>
                      <i>Trân thành cảm ơn đã sử dụng dịch vụ của chúng tôi. </i>
                      <i>Copyleft from Tran Dai Phat</i>     
            `
        });
    }
    

}

const EmailTemplate = (type, data) => {
    switch (type) {
        case 'register':
            return DataTemplate.resgister(data);
            break;
        case 'forget_password':
            return DataTemplate.forgetPasword(data);
            break;
        case 'lock':
            return DataTemplate.lockNotice(data);
            break;
        case 'unlock':
            return DataTemplate.unlockNotice(data);
            break;
    }
} 
module.exports = EmailTemplate;
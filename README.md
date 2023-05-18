# ODZ MessageStation 
## Mô tả
Hệ thống website dùng để nhắn tin và gọi điện video call, ngoài ra người dùng cũng sẽ có một trang profile để hiển thị các thông tin liên quan. Đây là phần mềm trong tập dự án mã nguồn mở ODZ (Opensource Dev Zone)
![image-removebg-preview](https://github.com/tdphatstudy/ODZ-MessageStation/assets/124871402/54ffa6f7-f7e5-4330-8813-a7dd2780afab)
## Hệ điều hành hỗ trợ.
| Hệ Điều Hành | Windows    | Linux   | MacOS|
| :---:   | :---: | :---: | :---: |
| Hỗ trợ | ✔️  | ✔️   |  ✔️ |
## Nền tảng phát triển
Việc phát triển hoặc build với các phiên bản khác có thể gây ra lỗi.
Chúng tôi phát triển phần mềm dựa trên các thư viện, ngôn ngữ với phiên bản sau đây:
  - NODEJS : v18.13.0.
  - EXPRESS: 4.18.2.
  - REACTJS: 18.2.0.
  - ARGON2: 0.30.3.
  - NODEMAILER: 6.9.1.
  - SOCKET.IO: 4.6.1.
  - MONGOOS: 7.0.1.
  - JSONWEBTOKEN: 9.0.0.
## Các tính năng
  - [x] Đăng nhập
  - [ ] Đăng  nhập QR
  - [x] Đăng ký
  - [x] Quên mật khẩu
  - [x] Gửi mail xác nhận OTP.
  - [x] Đăng nhập lần đầu (Xác nhận mail, upload avtar, thêm thông tin cá nhân)
  - [x] Hiện thị trang Profile (Trang chủ, trang liện hệ, trang thông tin các nhân, đổi avatar).
  - [ ] Thêm thư viện chứa các theme ảnh avatar có sẳn và template để custom bố cục trang profile.
  - [ ] Cập nhật trạng thái online
  - [ ] Cho phép chỉnh sửa thông tin các nhân
  - [ ] Cài đặt hệ thống
  - [ ] Quản lý thiết bị đăng nhập
  - [ ] Quản lý bạn bè và nhóm (thêm sửa xóa)
  - [x] Chat text realtime
  - [ ] Chat file, url.
  - [ ] Gọi điện
  - [ ] Gọi video call
  - [ ] Các tính năng bảo mật (Fresh token, đăng xuất từ xa)
  - [ ] Reponesive cho điện thoại
 [?] Tạo project cho mobile 
 ## Cài đăt
 ### Bằng zip
  - Bước 1: Nhấn **Code** -->  **Download ZIP**
 ![image](https://github.com/tdphatstudy/ODZ_WifiManager/assets/124871402/afd1b8d6-4b20-452a-8dc7-10629f703ac9)
 - Bước 2: Giải nén ZIP. Hướng dẫn: https://support.microsoft.com/en-us/windows/zip-and-unzip-files-f6dde0a7-0fec-8294-e1d3-703ed85e7ebc
  - Bước 3: Mở project mới giải nén.
 ![image](https://github.com/tdphatstudy/ODZ_WifiManager/assets/124871402/ca685998-c0af-476b-9edd-742ec02a59cc)

  - Bước 4: Cài đặt các dependency.
  `npm install`
  - Bước 5: Chạy dự án.
  `npm start`

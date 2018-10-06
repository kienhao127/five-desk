Project được chia làm 2 nhánh: trang chủ và dashboard.

Trang chủ gồm những trang trước khi đăng nhập:
- Home
- Đăng nhập
- Đăng ký
- ...

Dashboard gồm những trang sau khi đăng nhập:
- Mail Ticket
- Live chat
- Báo cáo
- ...

Hiện tại chưa tìm được cách route từ "Trang chủ" vào "Dashboard", cho nên bạn nào muốn code phần nào thì tạm thời vào routes/index.js chỉnh sửa:

Phần dashboard:
const indexRoutes = [{path: "/", component: Dashboard}];
Phần trang chủ:
const indexRoutes = [{path: "/", component: Home}];

sau đó sửa lại đường link, VD:
Phần Dashboard:
- dashboard: http://localhost:3000/dashboard
Phần trang chủ:
- home: http://localhost:3000/home
- login: http://localhost:3000/login
- register: http://localhost:3000/register

Cài đặt:
Sau khi clone về máy, cd đến folder chứa project chạy lệnh npm install ở cmd (Window) hoặc Terminal (Mac) để cài đặt thư viện.
Danh sách thư viện đã sử dụng ở file package.json (phần dependencies)
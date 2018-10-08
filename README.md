Project được chia làm 2 nhánh: Home và Agent (đặt tên theo ZenDesk), tương đương với 2 folder trong folder layouts.

Home gồm những trang trước khi đăng nhập:
- Home
- Login
- Register
- ...

Agent gồm những trang sau khi đăng nhập:
- Mail Ticket
- Live chat
- Reproting
- ...

Mọi người chỉ nên chỉnh sửa ở folder Views, nơi sẽ chứa những trang content của layouts.

Có Header riêng dành cho Home và Anget.

Cài đặt:
Sau khi clone về máy, cd đến folder chứa project chạy lệnh npm install ở cmd (Window) hoặc Terminal (Mac) để cài đặt thư viện.
Danh sách thư viện đã sử dụng ở file package.json (phần dependencies)
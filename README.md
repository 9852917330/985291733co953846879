# Millionaire v57 — Khắc phục lỗi đồng bộ Google Sheet `NO_COLUMN: H`

## Nguyên nhân

Bản v56 cố đọc `select A,B,C,D,E,F,G,H`. Khi tab Google Sheet chỉ cung cấp cột A–F, Google Visualization API từ chối với `Invalid query: NO_COLUMN: H`. Không liên quan dữ liệu giao dịch hay giá coin.

## Sửa đổi

- Dùng `select *` để đọc số cột thật thay vì giả định có cột G/H. Hỗ trợ bảng sáu cột và bảng tám cột có giá khớp lệnh.
- Tự phát hiện tiêu đề và cột, giữ mapping A–F khi không có cột giá.
- Lấy dữ liệu bằng JSONP với nhiều phương án dự phòng; chỉ chấp nhận bảng có giao dịch hợp lệ. Có timeout và tự dọn callback/script.
- Lỗi mạng/không đủ dữ liệu vẫn giữ và hiển thị bản sao lịch sử gần nhất; không ghi đè khi Sheet trả dữ liệu cũ.
- Cơ chế kiểm tra Sheet 30 giây/lần, lịch sử tick coin, định giá mốc, biểu đồ và nhãn lãi/lỗ giữ từ v56.
- Đổi cache PWA v57, cập nhật manifest URL, giữ nguyên manifest ID để không tạo app thứ hai.

## Triển khai

Giải nén, upload **toàn bộ các file bên trong ZIP** vào thư mục gốc của repo GitHub Pages. Bắt buộc thay cả `index.html`, `millionaire.html`, `sw.js`, `manifest.webmanifest`. Tải lại PWA sau khi GitHub Pages triển khai.

## Giới hạn

Kiểm thử bằng response Google Sheets giả lập để mô phỏng 6 và 8 cột, dữ liệu mới và lỗi query. Kết nối trực tiếp đến Google Sheet thật không khả dụng trong môi trường build này, nên cần kiểm chứng sau khi triển khai.

# Millionaire v56 — Thống nhất lãi/lỗ thực tế và mốc lịch sử

## Lỗi đã sửa

1. **Không trộn ba chỉ số khác nhau**: phần trăm của vị thế thật tính từ lần mua gần nhất; phần trăm mô phỏng 100 USDT tính từ mốc so sánh; phần trăm tăng số lượng coin tính theo số lượng tương đương tại mốc. Trong bảng, coin đang giữ có nhãn **THỰC TẾ TỪ MUA**, lấy cùng hàm và cùng tick giá với ô tổng quan.
2. **Mốc gần nhất theo Sheet gốc**: khi coin bán của lần mới bị bỏ tick, giao dịch vẫn bị ẩn khỏi lịch sử theo lựa chọn người dùng, nhưng coin mua hiện tại vẫn lấy mốc giao dịch thật để định giá. Tên coin bán bị ẩn ở ô chọn mốc. Tránh trường hợp Sheet đã đến lần 47 nhưng dropdown vẫn ở lần 45.
3. **Sửa race condition ở fetch giá**: mỗi lượt tính nến mốc khóa vào cùng một UTC timestamp và requestId. Đáp án cũ không thể ghi vào giá mốc mới. Cả Binance, OKX, Bybit đều phải trả nến đúng phút; giá lệch phút bị từ chối.
4. **Kiểm tra cache giá mốc**: bỏ giá đã lưu nếu không có timestamp khớp đúng phút. Giữ nguyên cache và dữ liệu lịch sử Sheet khác.
5. **Sửa đọc số Google Sheet**: ưu tiên giá trị số gốc `v` thay cho chuỗi hiển thị đã làm tròn `f`; khôi phục `f` khi `v=0` lỗi; sửa lỗi đọc `0,123` thành `123`. Hỗ trợ đọc cột G/H nếu Sheet có giá khớp lệnh.
6. **Làm rõ nhãn so sánh**: `Mô phỏng $100`, `% từ mốc`, `SL vs mốc`, nhãn lãi/lỗ thực tế ở coin đang giữ. Không đổi cơ chế so sánh tất cả coin dựa trên 100 USDT/mốc.
7. **Số coin động**: cập nhật bộ đếm tài sản khi người dùng tick ẩn/hiện coin; giữ danh sách 76 coin và toàn bộ lịch sử gốc.
8. **PWA cache**: đổi service worker cache name sang v56, URL khởi động lên v56; giữ nguyên manifest `id` để không tạo ứng dụng thứ hai.

## Kiểm thử thực hiện

- `node --check` cho các khối JavaScript.
- Test trên Chromium headless (HTML và API mô phỏng): Sheet 45 -> 47, 4350 SUI, giá SUI 0.897 và mốc 0.900: cả ô tổng quan và nhãn SUI đều -0.33%; dropdown chuyển sang lần 47 kể cả khi EIGEN bỏ tick.
- Test race condition: cố tình cho nến cũ lần 45 trả trễ hơn nến mới; kết quả mô phỏng SUI vẫn -0.33%, không bị mốc 45 ghi đè.
- Kiểm tra ZIP và `index.html`/`millionaire.html` giống nhau.

## Giới hạn

Tỷ lệ lãi/lỗ thực tế cần giá khớp lệnh ghi trực tiếp trong Sheet nếu muốn chính xác đến từng lệnh. Khi Sheet không có giá mua, dùng giá mở nến 1 phút đúng mốc Việt Nam; đây là giá **tham chiếu**, không khẳng định là giá khớp lệnh.
Dữ liệu Sheet thực tế và phản hồi API giá thực tế không được kiểm chứng trong môi trường này. Test dùng dữ liệu giả lập, không đưa vào ZIP.

## Triển khai

Giải nén, đưa các file **bên trong thư mục `985291733co953846879-main`** vào thư mục gốc repo GitHub Pages (ghi đè). Cập nhật cùng lúc `index.html`, `millionaire.html`, `sw.js`, `manifest.webmanifest`; mở lại PWA hoặc tải lại trang để thay cache cũ.

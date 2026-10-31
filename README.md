# Millionaire — v54: đồng bộ mua bán độc lập (30 giây)

## Những lỗi đã sửa

- **Đọc Sheet riêng khỏi việc tính giá lịch sử**: đồng bộ mỗi 30 giây; nút cập nhật không bị khóa chỉ vì bảng biểu đang tải giá/nến.
- Khi Sheet có dòng mới, cập nhật ngay lịch sử gốc, bảng giao dịch, dropdown lựa chọn lần mua, coin đang giữ, NAV (nếu có giá live). Biểu đồ và tín hiệu được tính ở bước sau.
- Tự kiểm tra lại Sheet khi quay lại tab/app hoặc khi mạng được khôi phục.
- Dòng trạng thái dưới thanh điều hướng hiện rõ: lần giao dịch cuối cùng đã đọc, tuyến bán → mua, thời gian, giờ kiểm tra Sheet hoặc lỗi kết nối. Không báo là mới nếu thực tế chỉ đang dùng bản lưu.
- Nếu Sheet trả dữ liệu cũ hơn bản sao đã lưu, không ghi đè dữ liệu mới hơn.
- **NAV phụ thuộc coin đang giữ (coin mua)**, không mất khi coin bán ở lần trước bị bỏ tick. Lịch sử giao dịch vẫn tuân thủ yêu cầu: chỉ hiện khi cả coin bán và coin mua được tick.
- Không thay đổi thông tin giao dịch gốc trên Google Sheet, không xóa lịch sử đã lưu.
- Nâng cache service worker sang v54 và đổi URL start của PWA để trình duyệt lấy nội dung bản mới. Giữ nguyên `manifest.id` để không tạo ứng dụng PWA thứ hai.

## Đã thử trong trình duyệt (dữ liệu mô phỏng)

- Sheet đọc lần 45: ONDO → MNT, sau đó phát sinh lần 46: MNT → SOL: bộ đếm, bảng lịch sử và coin đang giữ cập nhật tức thì dù API giá lịch sử không hoạt động.
- Bỏ tick MNT: lịch sử liên quan MNT ẩn nhưng coin đang giữ SOL vẫn hiển thị đúng.
- JavaScript đều qua kiểm tra cú pháp.

## Giới hạn xác minh

Dữ liệu Google Sheet thật không truy cập được từ môi trường kiểm thử. Nếu web vẫn hiện giao dịch cũ, nhìn dòng trạng thái ngay dưới menu: web sẽ thông báo rõ lần Sheet trả về và có đang sử dụng dữ liệu lưu do kết nối lỗi hay không.

## Cập nhật GitHub Pages

Giải nén và **chép toàn bộ nội dung trong thư mục con** `985291733co953846879-main` vào thư mục gốc của repo đang host, ghi đè các file cùng tên. Đảm bảo đồng thời cập nhật `index.html`, `millionaire.html`, `sw.js` và `manifest.webmanifest` để thay thế PWA cache cũ.

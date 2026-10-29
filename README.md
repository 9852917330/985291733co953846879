# Millionaire Crypto Dashboard — bản 15 coin có MNT

## Thay đổi

- Thêm MNT (Mantle) vào rổ theo dõi, so sánh, tín hiệu và xoay danh mục: tổng cộng 15 coin.
- Giữ các cấu hình giá, CoinGecko, Bybit, Binance, OKX, phân nhóm và điểm chất lượng của MNT đã có trong mã nguồn.
- Khôi phục phạm vi lịch sử: giao dịch có mã coin cũ vẫn được đọc từ Google Sheet, kể cả không còn thuộc 15 coin theo dõi.
- Trên trang **Lịch sử mua bán**, giữ cả các lần cũ thiếu thời gian và giá (giá không có dữ liệu được để trống, không tự bịa).
- Khi đồng bộ Sheet thành công, lưu một bản sao lịch sử vào localStorage của trang. Lần cập nhật lỗi kết nối sẽ giữ lịch sử hiện có hoặc tải lại bản sao đã lưu, thay vì xóa bảng.
- Nếu Sheet phản hồi ít giao dịch hơn bản sao đã lưu, hệ thống bảo vệ dữ liệu đã lưu và báo lỗi đồng bộ thay vì ghi đè mất lịch sử.
- Ưu tiên kết nối Sheet ngay khi mở web, không phải đợi tất cả API thị trường khởi tạo.
- Cập nhật cache Service Worker/PWA để phiên bản mới thay thế bản cũ.

## Lưu ý quan trọng

Google Sheet là nguồn lịch sử gốc; ZIP **không chứa nội dung giao dịch riêng tư** trong Sheet. Bản sao trình duyệt chỉ được tạo **sau ít nhất một lần đọc Sheet thành công**, trên đúng trình duyệt/nguồn website đó. Việc xóa dữ liệu trang web, đổi thiết bị hoặc đổi domain có thể làm mất bản sao localStorage; không làm mất dữ liệu trên Google Sheet.

File `index.html` và `millionaire.html` có cùng nội dung ứng dụng; có thể deploy nguyên cả thư mục lên hosting tĩnh.
